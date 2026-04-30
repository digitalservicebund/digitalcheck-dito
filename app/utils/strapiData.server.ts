import NodeCache from "node-cache";
import crypto from "node:crypto";

export type {
  AbsatzWithParagraph,
  BaseAbsatz,
  BasePrinzip,
  Beispielvorhaben,
  Digitalcheck,
  EinschaetzungReferat,
  GesetzStatus,
  Paragraph,
  PrinzipAnwendung,
  PrinzipAspekt,
  PrinzipErfuellung,
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
  PrinzipWithBeispielvorhaben,
  Rechtsgebiet,
  Ressort,
  Visualisierung,
} from "./strapiData.types";

const url =
  process.env.STRAPI_URL ??
  "https://secure-dinosaurs-1a634d1a3d.strapiapp.com/graphql";

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
  Absaetze: Absatz(pagination: { start: 0, limit: 20 }) {
    documentId
    Text
    Nummer
    PrinzipErfuellungen {
      id
      Erklaerung
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
  Aufwand
  Ressort
  Bild {
    documentId
    url
    previewUrl
    alternativeText
  }
  Beispielvorhaben {
    URLBezeichnung
    VeroeffentlichungsDatum
    Rechtsgebiet
    Titel
    Ressort
  }
}`;

export const GET_PRINZIPS_QUERY = `
${prinzipCoreFields}
query GetPrinzips {
  prinzips {
    ...PrinzipCoreFields
  }
}`;

export const GET_PRINZIPS_WITH_ASPECTS_QUERY = `
query GetPrinzipsWithAspects {
  prinzips(sort: "order") {
    documentId
    order
    Nummer
    URLBezeichnung
    Name
    Beschreibung
    Hilfetext
    Aspekte {
      Titel
      Kurzbezeichnung
      Beschreibung
      Text
    }
  }
}`;

export const GET_PRINZIPS_WITH_EXAMPLES_QUERY = `
query GetPrinzips {
  prinzips(sort: "order") {
    documentId
    Name
    Beschreibung
    Kurzbeschreibung
    Hilfetext
    Erklaerungshilfe
    order
    Nummer
    URLBezeichnung
    Beispiel {
      documentId
      Nummer
      Text
      Paragraph {
        Nummer
        Gesetz
        Titel
        Beispielvorhaben {
          URLBezeichnung
          Titel
        }
      }
      PrinzipErfuellungen {
        id
        Erklaerung
        Prinzip {
          Nummer
          Name
        }
      }
    }
    Aspekte {
      Titel
      Kurzbezeichnung
      Beschreibung
      Text
      Leitfragen
      Formulierungsbeispiel
      Beispiel {
        documentId
        Nummer
        Text
        Paragraph {
          Nummer
          Gesetz
          Titel
          Beispielvorhaben {
            URLBezeichnung
            Titel
          }
        }
      }
    }
  }
}
`;

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

const isDevelopment = process.env.NODE_ENV === "development";
const options = isDevelopment
  ? { stdTTL: 10 }
  : { stdTTL: 300, checkperiod: 30 };
const cache = new NodeCache(options);

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
