import { assistent, assistent_erarbeitung } from "@/config/routes";
import { describe, expect, it } from "vitest";
import { buildAccordeonEntries } from "./accordion";

describe("buildAccordeonEntries", () => {
  it("labels the Assistent's steps with eyebrows, but not their subpages", () => {
    const [root] = buildAccordeonEntries(assistent, assistent_erarbeitung.path);

    expect(root?.eyebrow).toBeUndefined();
    expect(
      root?.children.map(({ label, eyebrow }) => ({ label, eyebrow })),
    ).toEqual([
      { label: "Vorprüfung", eyebrow: "Schritt 1" },
      { label: "Erarbeitung", eyebrow: "Schritt 2" },
      { label: "Dokumentation", eyebrow: "Schritt 3" },
    ]);
    expect(root?.children[1]?.children.every(({ eyebrow }) => !eyebrow)).toBe(
      true,
    );
  });
});
