import type { Prinzip } from "@/content.config";
import {
  DATA_SCHEMA_VERSION,
  type DocumentationData,
  type InteroperabilityAssessmentData,
  type Principle,
} from "@/pages/dokumentation/_react/documentationDataSchema";
import { digitalDocumentation } from "@/resources/content/dokumentation";
import {
  ebeneFieldNames,
  isAnforderungFilled,
  prinzipFieldNames,
  toPrinzipOrder,
  type Ebene,
} from "@/wizard/dokumentationSchema";
import type { wizardStores } from "@/wizard/stores";
import type { StoreValue } from "nanostores";

// The Word export (createDoc) still reads the data of the old Dokumentation, so
// the answers of the new wizard are converted to it.

type DokumentationData = StoreValue<typeof wizardStores.dokumentation.$data>;

const [yesLabel, noLabel, notRelevantLabel] =
  digitalDocumentation.principlePages.radioOptions;

// The levels of interoperability by their key in the old data
const ebenen = {
  legal: "rechtlich",
  organizational: "organisatorisch",
  semantic: "semantisch",
  technical: "technisch",
} as const satisfies Record<keyof InteroperabilityAssessmentData, Ebene>;

const ratings = {
  yes: "positive",
  no: "risky",
  "not-relevant": "not-applicable",
} as const;

const toPrinciple = (
  data: DokumentationData,
  prinzip: Prinzip,
): Principle | undefined => {
  const names = prinzipFieldNames(toPrinzipOrder(prinzip.order));
  const antwort = data[names.antwort];
  if (!antwort) return undefined;
  const base = {
    id: prinzip.documentId,
    reasoning: data[names.erklaerung] ?? "",
  };
  return antwort === "yes"
    ? { ...base, answer: yesLabel, aspects: data[names.schwerpunkte] ?? [] }
    : { ...base, answer: antwort === "no" ? noLabel : notRelevantLabel };
};

/** Converts the answers of the Dokumentation for the Word export */
export const toDocumentationData = (
  data: DokumentationData,
  prinzips: Prinzip[],
): DocumentationData => {
  const bezug = data["eu-interoperabilitaet-bezug"];
  const status = data["veroeffentlichung-status"];
  return {
    version: DATA_SCHEMA_VERSION,
    policyTitle: {
      title: data["regelungsvorhaben-titel"] ?? "",
      organization: data["regelungsvorhaben-organisation"] ?? "",
    },
    participation: {
      formats: data["beteiligungsformate-erklaerung"] ?? "",
      results: data["beteiligungsformate-erkenntnisse"] ?? "",
    },
    principles: prinzips
      .map((prinzip) => toPrinciple(data, prinzip))
      .filter((principle) => principle !== undefined),
    euInteroperabilityOutcome: {
      outcomeId: bezug && (bezug === "yes" ? "REQUIRED" : "NOT_REQUIRED"),
    },
    // The EU steps only apply with EU-Bezug (see dokumentationFlow), so
    // answers kept from an earlier "yes" are left out
    ...(bezug === "yes" && {
      bindingRequirements: {
        functions: [],
        requirements: (data["verbindliche-anforderungen"] ?? [])
          .filter(isAnforderungFilled)
          .map((anforderung) => ({
            description: anforderung.titel,
            legalReference: anforderung.rechtsgrundlage,
            services: anforderung.dienste,
            serviceAreas: anforderung.bereiche,
            // Free text instead of the old options, listed as is
            stakeholderGroups: anforderung.betroffene.trim()
              ? [anforderung.betroffene]
              : [],
          })),
      },
      interoperabilityAssessment: Object.fromEntries(
        Object.entries(ebenen).map(([key, ebene]) => {
          const names = ebeneFieldNames(ebene);
          const bewertung = data[names.bewertung];
          return [
            key,
            {
              rating: bewertung && ratings[bewertung],
              detail: data[names.erklaerung],
            },
          ];
        }),
      ),
      interoperabilityMeta: {
        publicationStatus: status ?? "",
        // The date is only asked for "planned" and the link for "published",
        // like in the Zusammenfassung
        publicationDate:
          status === "planned" ? data["veroeffentlichung-datum"] : undefined,
        publicationLink:
          status === "published" ? data["veroeffentlichung-link"] : undefined,
      },
    }),
  };
};
