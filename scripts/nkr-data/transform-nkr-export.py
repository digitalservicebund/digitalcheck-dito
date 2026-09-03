# %% [markdown]
# # Transform NKR Excel export into NocoDB CSV

# %% [markdown]
# This Notebook helps with importing data by Normenkontrollrat to our own database, running NocoDB.
#
# Install the dependencies by running `uv sync` in this directory.
#
# When running the cells, check whether the column names are correct, as they have sometimes changed between different exports.

# %%
import pandas as pd
import numpy as np

# Change this path as required
input_path = "input/2026-08-24.xls"
df = pd.read_excel(input_path)
df

# %%
# NKRNr	Regelungsart	Ressort	Titel	EingangVP	EingangED	Erledigungsdatum	VP1_ITLösung	VP2_Verpflichtungen	VP3_Datenaustausch	VP4_Interaktion	VP5_Automatisierung	ED1_Kommunikation	ED2_Daten	ED3_Datenschutz	ED4_Klarheit	ED5_Automatisierung	EDDarstellung
out = pd.DataFrame()
out["NKRNr"] = df["A_NKR-Nr"]
out["Regelungsart"] = df["Regelungsart"]
out["Ressort"] = df["Ressort"]
out["Titel"] = df["A_Titel"]
out["EingangVP"] = df["I_EingangVP"]
out["EingangED"] = df["I_EingangED"]
out["Erledigungsdatum"] = df["B_Erledigungsdatum"]

out

# %%
# copy TRUE/FALSE fields
vp_map = {
    "VP1_ITLösung": "I_VPITLösung",
    "VP2_Verpflichtungen": "I_VPVerpflichtungen",
    "VP3_Datenaustausch": "I_VPDatenaustausch",
    "VP4_Interaktion": "I_VPInteraktion",
    "VP5_Automatisierung": "I_VPAutomatisierung",
    # visualization
    "ED_Darstellung": "I_EDDarstellung",
}

for out_col, source_col in vp_map.items():
    assert set(df[source_col].unique()).issubset({True, False})
    out[out_col] = df[source_col]

out

# %%
df.columns

# %%
# explore matching columns
[col for col in df.columns.to_list() if "tech" in col.lower()]

# %%
df.replace({"ja": "Ja", "nein": "Nein"}, inplace=True)

# copy Ja/Nein/Teilweise/Nicht relevant fields
expected_values = {"Ja", "Nein", "Teilweise", "Nicht relevant"}

ed_map = {
    "ED1_Kommunikation": "I_EDKommunikationMA",
    "ED2_Daten": "I_EDDatenMA",
    "ED3_Datenschutz": "I_EDDatenschutzMA",
    "ED4_Klarheit": "I_EDKlarheitMA",
    "ED5_Automatisierung": "I_EDAutomatisierungMA",
    # v2 principles
    "EDv2_1_Angebote": "I_EDAngeboteMA",
    "EDv2_2_Wiederverwendung": "I_EDWiederverwendungMA",
    "EDv2_3_Technologien": "I_EDTechnologienMA",
    "EDv2_4_Automatisierung": "I_EDAutomatisierungNeuMA",
    "EDv2_5_Datenschutz": "I_EDDatenschutzNeuMA",
}


for out_col, source_col in ed_map.items():
    if source_col not in df.columns:
        print(f"Column '{source_col}' not in source dataframe, skipping")
        continue
    values = set(df[source_col].dropna().unique())
    unexpected = values.difference(expected_values)
    assert not unexpected, f"Unexpected items {unexpected} column {source_col}"
    out[out_col] = df[source_col]
out

# %%
df["I_EDDatenschutzMA"].fillna(np.nan).count()

# %%
out = out.drop_duplicates()

# %%
date_cols = ["EingangVP", "EingangED", "Erledigungsdatum"]

for col in date_cols:
    out[col] = out[col].dt.strftime("%Y-%m-%d")

# %%
# Alternative A: Save to CSV and load into NocoDB manually
from pathlib import Path

output_path = str(Path(input_path).with_suffix(".csv"))
out.to_csv(output_path, index=False)

# %%
# Alternative B: Upload to NocoDB via API

# read NocoDB token from 1Password
import subprocess

nocodb_token = subprocess.run(
    ["op", "read", "op://Employee/NOCODB token/credential"],
    capture_output=True,
    text=True,
    check=True,
).stdout.strip()

# %%
import requests
import os
from dotenv import load_dotenv

load_dotenv()


# check what records are already in the table
records = []

is_last_page = False
offset = 0
while not is_last_page:
    url = f"{os.getenv('NOCODB_URL')}/api/v2/tables/mhsmsi0pu31n3xw/records?offset={offset}&limit=100"
    print(url)
    res = requests.get(url, headers={"xc-token": nocodb_token})
    j = res.json()
    pageinfo = j["pageInfo"]
    offset += pageinfo["pageSize"]
    is_last_page = pageinfo["isLastPage"]
    records.extend(j["list"])
print(len(records))

nkr_nrs = {record["NKRNr"] for record in records}
len(nkr_nrs)


# %%
df_nrs = df["A_NKR-Nr"].to_list()

[record for record in records if record["NKRNr"] not in df_nrs]

# %%
# check whether any Digitalchecks are already in NocoDB

# replace nan with None
payload_full = out.replace({np.nan: None}).to_dict(orient="records")
payload = [item for item in payload_full if item["NKRNr"] not in nkr_nrs]
print(f"Will update {len(payload_full) - len(payload)} records that are already in NocoDB")
print(f"Will upload {len(payload)} records to NocoDB")

# %%
# UPLOAD: upload to NocoDB

url = f"{os.getenv('NOCODB_URL')}/api/v2/tables/mhsmsi0pu31n3xw/records"

nkr_nrs = set(record["NKRNr"] for record in records)
for item in payload_full:
    print(item["NKRNr"], end=": ")
    if item["NKRNr"] in nkr_nrs:
        print("Record already exists in NocoDB, updating ...")
        # continue
        candidates = [record for record in records if record["NKRNr"] == item["NKRNr"]]
        candidates_sorted = sorted(
            candidates, key=lambda record: record["UpdatedAt"], reverse=False
        )
        copy = dict(candidates_sorted[-1])
        copy.update(item)
        res = requests.patch(url, headers={"xc-token": nocodb_token}, json=copy)
        res.raise_for_status()
        print(res.status_code)
    else:
        print("Uploading new record ...")
        res = requests.post(url, headers={"xc-token": nocodb_token}, json=item)
        res.raise_for_status()
        print(res.status_code)

# %%
# UPLOAD VALIDATION: has everything been uploaded correctly?

for df_item in payload_full:
    record = next(
        (record for record in records if record["NKRNr"] == df_item["NKRNr"]), None
    )
    assert record is not None, f"No record found for NKRNr {df_item['NKRNr']}"
    for key in df_item.keys():
        df_value = df_item[key]
        record_value = record.get(key)
        if pd.isna(df_value):
            df_value = None
        if pd.isna(record_value):
            record_value = None
        assert str(df_value) == str(record_value), (
            f"Value mismatch for NKRNr {df_item['NKRNr']} key {key}: {df_value} != {record_value}"
        )

# %%


# %%
# CHECK FOR DUPLICATES

from collections import defaultdict

by_nkr = defaultdict(list)
for record in records:
    by_nkr[record["NKRNr"]].append(record)

# find duplicates
duplicates = [records for records in by_nkr.values() if len(records) > 1]
len(duplicates)

# %%
for group in duplicates:
    print(f"--- Group NKRNr: {group[0]['NKRNr']} ---")

    # Get all keys present in the first record
    # (Assumes records in a group have the same keys)
    keys = group[0].keys()

    for key in keys:
        if key == "CreatedAt" or key == "UpdatedAt" or key == "Id":
            continue
        # Create a set of all unique values for this key in the current group
        unique_values = {str(record.get(key)) for record in group}

        # If there is more than one unique value, the field differs
        if len(unique_values) > 1:
            print(f"Field '{key}' differs: {unique_values}")

# %%
# DELETE DUPLICATES: keep the most recently updated record and delete the rest

to_delete = []
for group in duplicates:
    last_changed = max(group, key=lambda record: record["UpdatedAt"])
    print(
        f"Keeping record with Id {last_changed['Id']} and NKRNr {last_changed['NKRNr']} last changed at {last_changed['UpdatedAt']}"
    )
    print(
        f"Would delete records with Ids {[record['Id'] for record in group if record['Id'] != last_changed['Id']]}"
    )
    to_delete.extend([record for record in group if record["Id"] != last_changed["Id"]])
to_delete

# %%
for item in to_delete:
    res = requests.delete(
        url, headers={"xc-token": nocodb_token}, json={"Id": item["Id"]}
    )
    res.raise_for_status()
    print(res.status_code)

# %%
# CHECK FOR DUPLICATE FIELDS: which fields differ between duplicates?

duplicate_fields = []
for group in duplicates:
    nkr = group[0]["NKRNr"]
    record_ids = [record.get("Id") for record in group]
    all_keys = set().union(*(record.keys() for record in group))

    for key in sorted(all_keys):
        if key in {"CreatedAt", "UpdatedAt", "Id"}:
            continue

        values = [record.get(key) for record in group]

        if len(unique_values) > 1:
            duplicate_fields.append(
                {
                    "NKRNr": nkr,
                    "Field": key,
                    "Group size": len(group),
                    "Record Ids": record_ids,
                    "Values": values,
                }
            )

duplicate_fields_df = pd.DataFrame(duplicate_fields)
duplicate_fields_df

# %%
duplicate_cases = duplicate_fields_df.replace({np.nan: None}).to_dict(orient="records")
duplicate_cases

# %%
# MANUAL DELETE: delete records created on a specific date

import requests
import os
from dotenv import load_dotenv

load_dotenv()

url = f"{os.getenv('NOCODB_URL')}/api/v2/tables/mhsmsi0pu31n3xw/records"


last_created = [item for item in records if item["CreatedAt"].startswith("2026-04-14")]

for item in last_created:
    print(item["NKRNr"], end=": ")
    res = requests.delete(
        url, headers={"xc-token": nocodb_token}, json={"Id": item["Id"]}
    )
    res.raise_for_status()
    print(res.status_code)

# %%
assert len(set(out.columns.to_list()).difference(records[0].keys())) == 0, (
    f"Columns in out not in records: {set(out.columns.to_list()).difference(records[0].keys())}"
)

# %%
assert set(records[0].keys()).difference(out.columns.to_list()) == {
    "CreatedAt",
    "Id",
    "UpdatedAt",
}
