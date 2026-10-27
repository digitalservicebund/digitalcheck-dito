import { describe, expect, it } from "vitest";
import { getVorpruefungResult } from "./vorpruefungResult";

const allNo = {
  "it-system": "no",
  "verpflichtungen-fuer-beteiligte": "no",
  datenaustausch: "no",
  kommunikation: "no",
  automatisierung: "no",
  "eu-bezug": "no",
} as const;

describe("getVorpruefungResult", () => {
  it("is negative when all answers are no", () => {
    expect(getVorpruefungResult(allNo)).toBe("negative");
  });

  it("has a Digitalbezug with one yes", () => {
    expect(getVorpruefungResult({ ...allNo, kommunikation: "yes" })).toBe(
      "digital",
    );
  });

  it("adds the Interoperabilität with a yes for the EU-Bezug", () => {
    expect(
      getVorpruefungResult({
        ...allNo,
        datenaustausch: "yes",
        "eu-bezug": "yes",
      }),
    ).toBe("digitalAndInteroperability");
  });

  it("counts an unsure EU-Bezug as no Interoperabilität", () => {
    expect(
      getVorpruefungResult({
        ...allNo,
        "it-system": "yes",
        "eu-bezug": "unsure",
      }),
    ).toBe("digital");
  });

  it("is unsure with only unsure and no answers", () => {
    expect(getVorpruefungResult({ ...allNo, automatisierung: "unsure" })).toBe(
      "unsure",
    );
    expect(getVorpruefungResult({ ...allNo, "eu-bezug": "unsure" })).toBe(
      "unsure",
    );
  });

  it("is a contradiction with an EU-Bezug but no Datenaustausch", () => {
    expect(
      getVorpruefungResult({
        ...allNo,
        "it-system": "yes",
        "eu-bezug": "yes",
      }),
    ).toBe("contradiction");
  });
});
