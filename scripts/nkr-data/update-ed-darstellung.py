# %% [markdown]
# # Update ED_Darstellung in NocoDB from Visualisierungen export

# %% [markdown]
# Reads the raw NKR export (columns `A_NKR-Nr`, `I_EDDarstellung`) and
# updates the `ED_Darstellung` field of the matching NocoDB record for each
# `NKRNr`. No other fields are touched.

# %%
import pandas as pd

# Change this path as required
input_path = "input/2025-Sept-Nov.xlsx"
df = pd.read_excel(input_path)

assert df["I_EDDarstellung"].dtype == bool

updates = {row["A_NKR-Nr"]: row["I_EDDarstellung"] for _, row in df.iterrows()}
len(updates)

# %%
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

url = f"{os.getenv('NOCODB_URL')}/api/v2/tables/mhsmsi0pu31n3xw/records"

# fetch all records to map NKRNr -> Id
records = []
is_last_page = False
offset = 0
while not is_last_page:
    res = requests.get(
        f"{url}?offset={offset}&limit=100", headers={"xc-token": nocodb_token}
    )
    res.raise_for_status()
    j = res.json()
    pageinfo = j["pageInfo"]
    offset += pageinfo["pageSize"]
    is_last_page = pageinfo["isLastPage"]
    records.extend(j["list"])

id_by_nkr_nr = {record["NKRNr"]: record["Id"] for record in records}
len(id_by_nkr_nr)

# %%
missing = [nkr_nr for nkr_nr in updates if nkr_nr not in id_by_nkr_nr]
print(f"{len(missing)} NKR-Nr not found in NocoDB, skipping: {missing}")

# %%
# UPDATE: patch ED_Darstellung only, for records that exist in NocoDB
for nkr_nr, ed_darstellung in updates.items():
    record_id = id_by_nkr_nr.get(nkr_nr)
    if record_id is None:
        continue
    print(nkr_nr, ed_darstellung, end=": ")
    res = requests.patch(
        url,
        headers={"xc-token": nocodb_token},
        json={"Id": record_id, "ED_Darstellung": bool(ed_darstellung)},
    )
    res.raise_for_status()
    print(res.status_code)

# %%
