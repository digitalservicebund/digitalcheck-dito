import crypto from "crypto";
import NodeCache from "node-cache";
import { type Node } from "~/utils/paragraphUtils";

const url =
  process.env.STRAPI_URL ??
  "https://secure-dinosaurs-1a634d1a3d.strapiapp.com/graphql";

export type EinschaetzungReferat =
  | "Ja"
  | "Nein"
  | "Teilweise"
  | "Nicht relevant";

export type Ressort =
  | "AA"
  | "BMAS"
  | "BMBF"
  | "BMDV"
  | "BMEL"
  | "BMF"
  | "BMFSFJ"
  | "BMG"
  | "BMI"
  | "BMJ"
  | "BMUV"
  | "BMVg"
  | "BMWK"
  | "BMWSB"
  | "BMZ";

export type Rechtsgebiet = "TBD";

export type GesetzStatus =
  | "Verkuendetes_Gesetz_aktuelle_Fassung"
  | "Regelungsentwurf"
  | "Text_im_Parlament";

export type PrinzipErfuellung = {
  id: number;
  Prinzip?: Prinzip;
  WarumGut: Node[];
};

export type Absatz = {
  id: number;
  Text: Node[];
  PrinzipErfuellungen: PrinzipErfuellung[];
};

export type Paragraph = {
  documentId: string;
  Nummer: string;
  Gesetz: string;
  Titel?: string;
  Artikel?: string;
  Digitalcheck?: Digitalcheck;
  Absaetze: Absatz[];
};

export type Prinzip = {
  documentId: string;
  Name: string;
  Beschreibung: Node[];
  Nummer: 1 | 2 | 3 | 4 | 5;
  GuteUmsetzungen: Digitalcheck[];
  URLBezeichnung: string;
  Kurzbezeichnung: string;
  order: number;
};

export type Visualisierung = {
  documentId: string;
  Titel: string;
  Visualisierungsart?: string;
  Visualisierungstool?: string;
  Beschreibung: Node[];
  Bild: {
    documentId: string;
    url: string;
    alternativeText: string;
  };
  Digitalcheck: Digitalcheck;
};

export type Digitalcheck = {
  documentId: string;
  Titel: string;
  NKRStellungnahmeDCText?: Node[];
  EinschaetzungKommunikation: EinschaetzungReferat;
  EinschaetzungWiederverwendung: EinschaetzungReferat;
  EinschaetzungDatenschutz: EinschaetzungReferat;
  EinschaetzungKlareRegelungen: EinschaetzungReferat;
  EinschaetzungAutomatisierung: EinschaetzungReferat;
  Regelungsvorhaben?: Regelungsvorhaben;
  Paragraphen: Paragraph[];
  Visualisierungen: Visualisierung[];
};

export type Regelungsvorhaben = {
  documentId: string;
  Titel: string;
  Ressort: Ressort;
  NKRStellungnahmeLink?: string;
  DIPVorgang: number;
  NKRNummer: number;
  URLBezeichnung: string;
  Rechtsgebiet?: Rechtsgebiet;
  VeroeffentlichungsDatum?: string;
  Digitalchecks: Digitalcheck[];
  LinkRegelungstext: string;
  GesetzStatus?: GesetzStatus;
};

export const prinzipCoreFields = `
fragment PrinzipCoreFields on Prinzip {
  documentId
  Nummer
  Name
  Beschreibung
  URLBezeichnung
  Kurzbezeichnung
  order
}`;

export const paragraphFields = `
fragment ParagraphFields on Paragraph {
  documentId
  Nummer
  Titel
  Gesetz
  Artikel
  Absaetze(pagination: { start: 0, limit: 20 }) {
    id
    Text
    PrinzipErfuellungen {
      id
      WarumGut
      Prinzip {
        ...PrinzipCoreFields
      }
    }
  }
}`;

export const visualisationFields = `
fragment VisualisationFields on Visualisierung {
  documentId
  Titel
  Beschreibung
  Visualisierungsart
  Visualisierungstool
  Bild {
    documentId
    url
    previewUrl
    alternativeText
  }
  Digitalcheck {
    Regelungsvorhaben {
      URLBezeichnung
      VeroeffentlichungsDatum
      Rechtsgebiet
      Titel
      Ressort
    }
  }
}`;

export const GET_PRINZIPS_QUERY = `
${prinzipCoreFields}
query GetPrinzips {
  prinzips {
    ...PrinzipCoreFields
  }
}`;

type GraphQLResponse<DataType> = {
  data: DataType;
  errors?: {
    message: string;
    path: string[];
    extensions: {
      code: string;
      error: {
        name: string;
        message: string;
        details: Record<string, unknown>;
      };
    }[];
  }[];
};

type errorResponse = {
  error: string;
};

function generateCacheKey(query: string, variables?: object): string {
  const variablesString = variables
    ? JSON.stringify(
        variables,
        Object.keys(variables).sort((a, b) => a.localeCompare(b)),
      )
    : "";
  const hash = crypto
    .createHash("md5")
    .update(query + variablesString)
    .digest("hex");
  return `cache:${hash}`;
}

const cache = new NodeCache({ stdTTL: 600, checkperiod: 100 });

export async function fetchStrapiData<DataType>(
  query: string,
  variables?: object,
): Promise<DataType | errorResponse> {
  const cacheKey = generateCacheKey(query, variables);
  const cachedData = cache.get<DataType>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(
      "Failed to fetch:",
      response.status,
      response.statusText,
      errorDetails,
    );
    return {
      error: `Failed to fetch: ${response.status} ${response.statusText}`,
    };
  }

  const responseData = (await response.json()) as GraphQLResponse<DataType>;

  if (responseData.errors) {
    console.error("GraphQL errors:", responseData.errors);
    return {
      error: responseData.errors[0].message,
    };
  }
  cache.set(cacheKey, responseData.data);

  return responseData.data;
}
