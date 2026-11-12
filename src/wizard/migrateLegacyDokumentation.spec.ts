import { beforeEach, describe, expect, it } from "vitest";
import { createWizardStore } from "./createWizardStore";
import { dokumentationFlow } from "./dokumentationFlow";
import { dokumentationFields } from "./dokumentationSchema";
import {
  legacyPrinzipOrders,
  legacyStorageKey,
  migrateLegacyDokumentation,
} from "./migrateLegacyDokumentation";
import { wizardStorageKeys } from "./session";

const NEW_KEY = wizardStorageKeys.dokumentation;

const prinzipIds = Object.fromEntries(
  Object.entries(legacyPrinzipOrders).map(([id, order]) => [order, id]),
);

// A complete Dokumentation as stored by the old wizard
const legacyData = {
  version: "2",
  initialized: true,
  policyTitle: { title: "Gesetz", organization: "BMDS" },
  participation: { formats: "Workshops", results: "Erkenntnisse" },
  principles: [
    {
      id: prinzipIds[1],
      answer: "Ja, gänzlich oder teilweise",
      aspects: ["digitale-kommunikation", "barrierefreiheit"],
      reasoning: "Erklärung 1",
    },
    { id: prinzipIds[2], answer: "Nein", reasoning: "Erklärung 2" },
    { id: prinzipIds[5], answer: "Nicht relevant", reasoning: "Erklärung 5" },
  ],
  euInteroperabilityOutcome: { outcomeId: "REQUIRED" },
  bindingRequirements: {
    functions: ["dropped"],
    requirements: [
      {
        description: "Anforderung",
        legalReference: "§ 1",
        services: "Dienst",
        serviceAreas: ["health", "education"],
        stakeholderGroups: ["localPublicSectorBody", "privateBusinesses"],
      },
    ],
  },
  interoperabilityAssessment: {
    legal: { rating: "positive", detail: "Rechtlich" },
    organizational: { rating: "risky", detail: "Organisatorisch" },
    semantic: { rating: "not-applicable", detail: "" },
    technical: { rating: "positive", detail: "Technisch" },
  },
  interoperabilityMeta: {
    publicationStatus: "planned",
    publicationDate: "März 2027",
    publicationLink: "",
  },
};

const storeLegacy = (data: unknown) =>
  localStorage.setItem(legacyStorageKey, JSON.stringify(data));

const readMigrated = () => {
  const encoded = localStorage.getItem(NEW_KEY);
  return encoded === null ? null : (JSON.parse(encoded) as unknown);
};

const migrate = (data: unknown) => {
  storeLegacy(data);
  migrateLegacyDokumentation();
  return readMigrated();
};

describe("migrateLegacyDokumentation", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("migrates all answers of the old Dokumentation and removes it", () => {
    const expected = {
      "regelungsvorhaben-titel": "Gesetz",
      "regelungsvorhaben-organisation": "BMDS",
      "beteiligungsformate-erklaerung": "Workshops",
      "beteiligungsformate-erkenntnisse": "Erkenntnisse",
      "prinzip1-antwort": "yes",
      "prinzip1-schwerpunkte": ["digitale-kommunikation", "barrierefreiheit"],
      "prinzip1-erklaerung": "Erklärung 1",
      "prinzip2-antwort": "no",
      "prinzip2-erklaerung": "Erklärung 2",
      "prinzip5-antwort": "not-relevant",
      "prinzip5-erklaerung": "Erklärung 5",
      "eu-interoperabilitaet-bezug": "yes",
      "verbindliche-anforderungen": [
        {
          titel: "Anforderung",
          rechtsgrundlage: "§ 1",
          dienste: "Dienst",
          bereiche: ["health", "education"],
          betroffene:
            "Öffentliche Stelle (Kommunen / lokal), Private Unternehmen",
        },
      ],
      "rechtlich-bewertung": "yes",
      "rechtlich-erklaerung": "Rechtlich",
      "organisatorisch-bewertung": "no",
      "organisatorisch-erklaerung": "Organisatorisch",
      "semantisch-bewertung": "not-relevant",
      "technisch-bewertung": "yes",
      "technisch-erklaerung": "Technisch",
      "veroeffentlichung-status": "planned",
      "veroeffentlichung-datum": "März 2027",
    };

    expect(migrate(legacyData)).toEqual(expected);
    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
    // Every migrated field is valid, so the store keeps all of them
    expect(
      createWizardStore(
        NEW_KEY,
        dokumentationFlow,
        dokumentationFields,
      ).$data.get(),
    ).toEqual(expected);
  });

  it("leaves out empty answers", () => {
    expect(
      migrate({
        version: "2",
        policyTitle: { title: "", organization: "  " },
        participation: { formats: "", results: "Erkenntnisse" },
        principles: [
          // Saved without Schwerpunkte and Erklärung
          {
            id: prinzipIds[3],
            answer: "Ja, gänzlich oder teilweise",
            aspects: [],
            reasoning: "",
          },
        ],
        euInteroperabilityOutcome: {},
        bindingRequirements: {
          requirements: [
            {
              description: "",
              legalReference: "",
              services: "",
              serviceAreas: [],
              stakeholderGroups: [],
            },
          ],
        },
        interoperabilityAssessment: {
          legal: { rating: "", detail: "" },
        },
        interoperabilityMeta: {
          publicationStatus: "",
          publicationDate: "",
        },
      }),
    ).toEqual({
      "beteiligungsformate-erkenntnisse": "Erkenntnisse",
      "prinzip3-antwort": "yes",
    });
  });

  it("drops values without a counterpart", () => {
    expect(
      migrate({
        version: "2",
        principles: [
          { id: "unknown", answer: "Nein", reasoning: "Erklärung" },
          // Schwerpunkte only belong to "yes"
          {
            id: prinzipIds[4],
            answer: "Nein",
            aspects: ["leftover"],
            reasoning: "Erklärung 4",
          },
        ],
        bindingRequirements: {
          requirements: [
            {
              description: "Anforderung",
              serviceAreas: ["health", "unknown"],
              stakeholderGroups: ["unknown", "europeanUnionAgency"],
            },
          ],
        },
        interoperabilityAssessment: {
          legal: { rating: "neutral", detail: "Rechtlich" },
        },
      }),
    ).toEqual({
      "prinzip4-antwort": "no",
      "prinzip4-erklaerung": "Erklärung 4",
      "verbindliche-anforderungen": [
        {
          titel: "Anforderung",
          rechtsgrundlage: "",
          dienste: "",
          bereiche: ["health"],
          betroffene: "EU-Agentur",
        },
      ],
      "rechtlich-erklaerung": "Rechtlich",
    });
  });

  it("migrates NOT_REQUIRED and the link of a published Referentenentwurf", () => {
    expect(
      migrate({
        version: "2",
        euInteroperabilityOutcome: { outcomeId: "NOT_REQUIRED" },
        interoperabilityMeta: {
          publicationStatus: "published",
          publicationDate: "März 2027",
          publicationLink: "https://example.com",
        },
      }),
    ).toEqual({
      "eu-interoperabilitaet-bezug": "no",
      "veroeffentlichung-status": "published",
      "veroeffentlichung-link": "https://example.com",
    });
  });

  it("keeps existing data of the new Dokumentation", () => {
    const existing = { "regelungsvorhaben-titel": "Neu" };
    localStorage.setItem(NEW_KEY, JSON.stringify(existing));

    expect(migrate(legacyData)).toEqual(existing);
    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
  });

  it("only removes old data of another version", () => {
    expect(migrate({ ...legacyData, version: "1" })).toBeNull();
    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
  });

  it("only removes unparsable old data", () => {
    localStorage.setItem(legacyStorageKey, "{not json");
    migrateLegacyDokumentation();

    expect(readMigrated()).toBeNull();
    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
  });

  it("doesn't write empty data", () => {
    expect(migrate({ version: "2", initialized: false })).toBeNull();
    expect(localStorage.getItem(legacyStorageKey)).toBeNull();
  });

  it("does nothing without old data or storage", () => {
    migrateLegacyDokumentation();
    expect(readMigrated()).toBeNull();

    expect(() => migrateLegacyDokumentation(undefined)).not.toThrow();
  });
});

describe("legacyPrinzipOrders", () => {
  it("matches the Prinzipien in the content collection", () => {
    const files = import.meta.glob<string>("/src/content/prinzipien/*.md", {
      query: "?raw",
      import: "default",
      eager: true,
    });
    // The frontmatter isn't strict JSON, so only the needed values are read
    const prinzipOrders = Object.values(files).map((file) => [
      /"documentId": "([^"]+)"/.exec(file)![1],
      Number(/"order": (\d+)/.exec(file)![1]),
    ]);

    expect(prinzipOrders).toHaveLength(5);
    expect(Object.fromEntries(prinzipOrders)).toEqual(legacyPrinzipOrders);
  });
});
