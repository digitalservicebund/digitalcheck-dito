import { dokumentationPrinzipienRoutes } from "@/config/prinzipienRoutes";
import {
  assistent_dokumentation_abschliessen,
  assistent_dokumentation_euInteroperabilitaet,
  assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen,
  assistent_dokumentation_euInteroperabilitaet_veroeffentlichung,
  assistent_dokumentation_regelungsvorhaben,
  assistent_dokumentation_zusammenfassung,
} from "@/config/routes";
import { describe, expect, it } from "vitest";
import { dokumentationFlow, getSectionProgress } from "./dokumentationFlow";
import { getWizardSession } from "./session";

describe("getSectionProgress", () => {
  it("counts the Prinzipien steps separately", () => {
    expect(
      getSectionProgress(assistent_dokumentation_regelungsvorhaben.path),
    ).toEqual({ label: "Prinzipien", current: 1, total: 7 });
    expect(
      getSectionProgress(`${dokumentationPrinzipienRoutes[4].path}/`),
    ).toEqual({ label: "Prinzipien", current: 7, total: 7 });
  });

  it("counts the EU-Interoperabilität steps separately", () => {
    expect(
      getSectionProgress(
        assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen.path,
      ),
    ).toEqual({ label: "EU-Interoperabilität", current: 1, total: 6 });
    expect(
      getSectionProgress(
        assistent_dokumentation_euInteroperabilitaet_veroeffentlichung.path,
      ),
    ).toEqual({ label: "EU-Interoperabilität", current: 6, total: 6 });
  });

  it("has no progress for pages outside the sections", () => {
    expect(
      getSectionProgress(assistent_dokumentation_euInteroperabilitaet.path),
    ).toBeUndefined();
    expect(
      getSectionProgress(assistent_dokumentation_zusammenfassung.path),
    ).toBeUndefined();
  });
});

describe("Abschließen", () => {
  const isReachable = (data: Record<string, unknown>) =>
    getWizardSession(
      "dokumentation",
      dokumentationFlow.initialPath,
      data,
    ).isReachable(assistent_dokumentation_abschliessen.path);

  const prinzipien = Object.fromEntries(
    [1, 2, 3, 4, 5].flatMap((order) => [
      [`prinzip${order}-antwort`, "no"],
      [`prinzip${order}-erklaerung`, "Keine digitale Umsetzung"],
    ]),
  );

  const withoutEu = {
    "regelungsvorhaben-titel": "Beispielvorhaben",
    "regelungsvorhaben-organisation": "BMDS",
    "beteiligungsformate-erklaerung": "Workshops",
    "beteiligungsformate-erkenntnisse": "Bedarf an Online-Anträgen",
    ...prinzipien,
    "eu-interoperabilitaet-bezug": "no",
  };

  const euAnswers = {
    "verbindliche-anforderungen": [
      {
        titel: "Single Digital Gateway",
        rechtsgrundlage: "",
        dienste: "",
        bereiche: [],
        betroffene: "",
      },
    ],
    ...Object.fromEntries(
      ["rechtlich", "organisatorisch", "semantisch", "technisch"].map(
        (ebene) => [`${ebene}-bewertung`, "not-relevant"],
      ),
    ),
    "veroeffentlichung-status": "published",
  };

  it("is reachable once all pages are answered", () => {
    expect(isReachable(withoutEu)).toBe(true);
    expect(
      isReachable({
        ...withoutEu,
        "eu-interoperabilitaet-bezug": "yes",
        ...euAnswers,
      }),
    ).toBe(true);
  });

  it("isn't reachable with a missing answer", () => {
    expect(isReachable({})).toBe(false);
    expect(
      isReachable({ ...withoutEu, "prinzip3-erklaerung": undefined }),
    ).toBe(false);
  });

  it("requires the EU steps only with EU-Bezug", () => {
    expect(
      isReachable({ ...withoutEu, "eu-interoperabilitaet-bezug": "yes" }),
    ).toBe(false);
  });
});
