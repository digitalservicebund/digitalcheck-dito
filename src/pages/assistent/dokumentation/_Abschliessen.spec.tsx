import { wizardStores } from "@/wizard/stores";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Abschliessen from "./_Abschliessen";

const store = wizardStores.dokumentation;

const stepHeadings = () =>
  screen
    .getAllByRole("heading", { level: 2 })
    .slice(0, -1) // the last one is the alert
    .map((heading) => heading.textContent);

describe("Abschliessen", () => {
  beforeEach(() => {
    store.reset();
  });

  it("adds the NKR and the Nationale Kontaktstelle for the Bund with EU-Bezug", () => {
    store.save({ pruefbereich: "Bund", "eu-interoperabilitaet-bezug": "yes" });
    render(<Abschliessen />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an den NKR senden",
      "An die Nationale Kontaktstelle senden",
    ]);
    expect(screen.getByText("Schritt 3")).toBeVisible();
    expect(
      screen.getByText(/Digitalcheck und die Interoperabilitäts-Bewertung/),
    ).toBeVisible();
  });

  it("only adds the NKR for the Bund without EU-Bezug", () => {
    store.save({ pruefbereich: "Bund", "eu-interoperabilitaet-bezug": "no" });
    render(<Abschliessen />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an den NKR senden",
    ]);
    expect(screen.getByText(/an den NKR weiter/)).toBeVisible();
    expect(
      screen.getByText("Damit ist der Digitalcheck für Sie beendet."),
    ).toBeVisible();
  });

  it("assumes the Bund without a stored Prüfbereich", () => {
    render(<Abschliessen />);

    expect(stepHeadings()).toContain("Fertige Dokumentation an den NKR senden");
  });

  it("skips the NKR for a Land with EU-Bezug", () => {
    store.save({
      pruefbereich: "Hessen",
      "eu-interoperabilitaet-bezug": "yes",
    });
    render(<Abschliessen />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "An die Nationale Kontaktstelle senden",
    ]);
    expect(screen.queryByText(/an den NKR/)).not.toBeInTheDocument();
  });

  it("doesn't number the only step for a Land without EU-Bezug", () => {
    store.save({ pruefbereich: "Hessen" });
    render(<Abschliessen />);

    expect(stepHeadings()).toEqual(["Dokumentation herunterladen"]);
    expect(screen.queryByText("Schritt 1")).not.toBeInTheDocument();
  });
});
