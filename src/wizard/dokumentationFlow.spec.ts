import { dokumentationPrinzipienRoutes } from "@/config/prinzipienRoutes";
import {
  assistent_dokumentation_euInteroperabilitaet,
  assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen,
  assistent_dokumentation_euInteroperabilitaet_veroeffentlichung,
  assistent_dokumentation_regelungsvorhaben,
  assistent_dokumentation_zusammenfassung,
} from "@/config/routes";
import { describe, expect, it } from "vitest";
import { getSectionProgress } from "./dokumentationFlow";

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
