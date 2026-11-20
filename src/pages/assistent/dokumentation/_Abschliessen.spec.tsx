import { $pruefbereich, wizardStores } from "@/wizard/stores";
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
    $pruefbereich.set(undefined);
  });

  it("adds the NKR and the Nationale Kontaktstelle for the Bund with EU-Bezug", () => {
    $pruefbereich.set("Bund");
    store.save({ "eu-interoperabilitaet-bezug": "yes" });
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an den NKR senden",
      "An die Nationale Kontaktstelle senden",
    ]);
    expect(screen.getByText("Schritt 3")).toBeVisible();
    expect(
      screen.getByText(/Digitalcheck und die Interoperabilitätsbewertung/),
    ).toBeVisible();
  });

  it("only adds the NKR for the Bund without EU-Bezug", () => {
    $pruefbereich.set("Bund");
    store.save({ "eu-interoperabilitaet-bezug": "no" });
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an den NKR senden",
    ]);
    expect(screen.getByText(/an den NKR weiter/)).toBeVisible();
    expect(
      screen.getByText(
        "Damit haben Sie den Digitalcheck erfolgreich abgeschlossen.",
      ),
    ).toBeVisible();
  });

  it("assumes the Bund without a stored Prüfbereich", () => {
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toContain("Fertige Dokumentation an den NKR senden");
  });

  it("adds the ZbR and the Nationale Kontaktstelle for Brandenburg with EU-Bezug", () => {
    $pruefbereich.set("Brandenburg");
    store.save({ "eu-interoperabilitaet-bezug": "yes" });
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an die ZbR senden",
      "An die Nationale Kontaktstelle senden",
    ]);
    expect(
      screen.getByRole("link", { name: "zbr@mdjd.brandenburg.de" }),
    ).toHaveAttribute("href", "mailto:zbr@mdjd.brandenburg.de");
    expect(screen.getByText(/^Die ZbR prüft Ihren Entwurf/)).toBeVisible();
    expect(screen.queryByText(/NKR/)).not.toBeInTheDocument();
  });

  it("only adds the ZbR for Brandenburg without EU-Bezug", () => {
    $pruefbereich.set("Brandenburg");
    store.save({ "eu-interoperabilitaet-bezug": "no" });
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "Fertige Dokumentation an die ZbR senden",
    ]);
    expect(screen.getByText(/um sie zu verakten/)).toBeVisible();
  });

  it("skips the NKR for a Land with EU-Bezug", () => {
    $pruefbereich.set("Hessen");
    store.save({ "eu-interoperabilitaet-bezug": "yes" });
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual([
      "Dokumentation herunterladen",
      "An die Nationale Kontaktstelle senden",
    ]);
    expect(screen.queryByText(/an den NKR/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Digitalcheck und die Interoperabilitätsbewertung/),
    ).toBeVisible();
  });

  it("doesn't number the only step for a Land without EU-Bezug", () => {
    $pruefbereich.set("Hessen");
    render(<Abschliessen prinzipien={[]} />);

    expect(stepHeadings()).toEqual(["Dokumentation herunterladen"]);
    expect(screen.queryByText("Schritt 1")).not.toBeInTheDocument();
  });
});
