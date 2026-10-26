import type { Prinzip } from "@/content.config";
import { describe, expect, it } from "vitest";
import { toDocumentationData } from "./fromDokumentationWizard";

// Only what the conversion reads
const prinzips = [1, 2, 3].map(
  (order) => ({ documentId: `p${order}`, order }) as Prinzip,
);

const euAnswers: Parameters<typeof toDocumentationData>[0] = {
  "verbindliche-anforderungen": [
    {
      titel: "Single Digital Gateway",
      rechtsgrundlage: "VO (EU) 2018/1724",
      dienste: "",
      bereiche: ["health"],
      betroffene: "Kommunen",
    },
    {
      titel: "",
      rechtsgrundlage: "",
      dienste: "",
      bereiche: [],
      betroffene: "",
    },
  ],
  "rechtlich-bewertung": "yes",
  "rechtlich-erklaerung": "Schafft eine Rechtsgrundlage",
  "technisch-bewertung": "not-relevant",
  "veroeffentlichung-status": "published",
  "veroeffentlichung-datum": "März 2026",
};

describe("toDocumentationData", () => {
  it("converts the answers of the Prinzipien", () => {
    const data = toDocumentationData(
      {
        "regelungsvorhaben-titel": "Beispielvorhaben",
        "beteiligungsformate-erkenntnisse": "Bedarf an Online-Anträgen",
        "prinzip1-antwort": "yes",
        "prinzip1-schwerpunkte": ["digitale-kommunikation"],
        "prinzip1-erklaerung": "Verhindert einen Medienbruch",
        "prinzip2-antwort": "not-relevant",
        "prinzip2-erklaerung": "Kein Verwaltungsverfahren",
      },
      prinzips,
    );

    expect(data.policyTitle).toEqual({
      title: "Beispielvorhaben",
      organization: "",
    });
    expect(data.participation?.results).toBe("Bedarf an Online-Anträgen");
    // Prinzip 3 isn't answered, so the Word file shows the options
    expect(data.principles).toEqual([
      {
        id: "p1",
        answer: "Ja, gänzlich oder teilweise",
        aspects: ["digitale-kommunikation"],
        reasoning: "Verhindert einen Medienbruch",
      },
      {
        id: "p2",
        answer: "Nicht relevant",
        reasoning: "Kein Verwaltungsverfahren",
      },
    ]);
  });

  it("converts the EU answers with EU-Bezug", () => {
    const data = toDocumentationData(
      { "eu-interoperabilitaet-bezug": "yes", ...euAnswers },
      prinzips,
    );

    expect(data.euInteroperabilityOutcome?.outcomeId).toBe("REQUIRED");
    // Empty boxes are left out
    expect(data.bindingRequirements?.requirements).toEqual([
      {
        description: "Single Digital Gateway",
        legalReference: "VO (EU) 2018/1724",
        services: "",
        serviceAreas: ["health"],
        stakeholderGroups: ["Kommunen"],
      },
    ]);
    expect(data.interoperabilityAssessment?.legal).toEqual({
      rating: "positive",
      detail: "Schafft eine Rechtsgrundlage",
    });
    expect(data.interoperabilityAssessment?.technical?.rating).toBe(
      "not-applicable",
    );
    // The date is only asked for "planned"
    expect(data.interoperabilityMeta).toEqual({
      publicationStatus: "published",
      publicationDate: undefined,
    });
  });

  it("leaves out EU answers without EU-Bezug", () => {
    const data = toDocumentationData(
      { "eu-interoperabilitaet-bezug": "no", ...euAnswers },
      prinzips,
    );

    expect(data.euInteroperabilityOutcome?.outcomeId).toBe("NOT_REQUIRED");
    expect(data.bindingRequirements).toBeUndefined();
    expect(data.interoperabilityAssessment).toBeUndefined();
    expect(data.interoperabilityMeta).toBeUndefined();
  });
});
