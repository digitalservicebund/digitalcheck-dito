import { $pruefbereich, wizardStores } from "@/wizard/stores";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Ergebnis from "./_Ergebnis";

const store = wizardStores.vorpruefung;

const allNo = {
  "it-system": "no",
  "verpflichtungen-fuer-beteiligte": "no",
  datenaustausch: "no",
  kommunikation: "no",
  automatisierung: "no",
  "eu-bezug": "no",
} as const;
const withInteroperability = {
  ...allNo,
  datenaustausch: "yes",
  "eu-bezug": "yes",
} as const;

const emailLink = () =>
  screen.getByRole("link", { name: "E-Mail-Programm öffnen" });

describe("Ergebnis", () => {
  beforeEach(() => {
    store.reset();
    $pruefbereich.set(undefined);
  });

  it("sends the result to the NKR with a copy for Interoperabilität", () => {
    $pruefbereich.set("Bund");
    store.save({ ...withInteroperability });
    render(<Ergebnis />);

    expect(
      screen.getByText("einen Bezug zur EU-Interoperabilität"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Ergebnis per E-Mail an den NKR senden",
      }),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:poststelle@nkr\.bund\.de\?cc=interoperabel%40digitalcheck\.gov\.de&/,
    );
  });

  it("sends the result to the NKR without a copy for the Bund without Interoperabilität", () => {
    store.save({ ...allNo, "it-system": "yes" });
    render(<Ergebnis />);

    expect(
      screen.getByText("keinen eindeutigen Bezug zur EU-Interoperabilität"),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).not.toContain("cc=");
    expect(screen.queryByText(/Kopie/)).not.toBeInTheDocument();
  });

  it("sends the result to the ZbR with a copy for Interoperabilität", () => {
    $pruefbereich.set("Brandenburg");
    store.save({ ...withInteroperability });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", {
        name: "Ergebnis per E-Mail an die ZbR senden",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/^Die Zentralstelle für bessere Rechtsetzung berät/),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:zbr@mdjd\.brandenburg\.de\?cc=interoperabel%40digitalcheck\.gov\.de&/,
    );
    expect(
      screen.queryByText(/an das Digitalcheck-Team/),
    ).not.toBeInTheDocument();
  });

  it("sends the result to the ZbR without a copy for Brandenburg without Interoperabilität", () => {
    $pruefbereich.set("Brandenburg");
    store.save({ ...allNo });
    render(<Ergebnis />);

    expect(screen.getByText("Schritt 2")).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:zbr@mdjd\.brandenburg\.de\?(?!.*cc=)/,
    );
  });

  it("sends the result to the Digitalcheck team for a Land with Interoperabilität", () => {
    $pruefbereich.set("Hessen");
    store.save({ ...withInteroperability });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", {
        name: "Ergebnis per E-Mail an das Digitalcheck-Team senden",
      }),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:interoperabel@digitalcheck\.gov\.de\?/,
    );
  });

  it("only offers the download for a Land without Interoperabilität", () => {
    $pruefbereich.set("Hessen");
    store.save({ ...allNo });
    render(<Ergebnis />);

    expect(screen.getByText("keinen Digitalbezug")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Ergebnis herunterladen",
      }),
    ).toBeVisible();
    expect(screen.queryByText("Schritt 1")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "E-Mail-Programm öffnen" }),
    ).not.toBeInTheDocument();
    // Without texts of its own, the Land gets the default ones
    expect(
      screen.getByText("Was bedeutet das für Ihr Vorhaben?"),
    ).toBeVisible();
    expect(screen.getByText(/um es zu verakten\.$/)).toBeVisible();
  });

  it("shows the texts of Nordrhein-Westfalen without the heading for the meaning", () => {
    $pruefbereich.set("Nordrhein-Westfalen");
    store.save({ ...allNo, "it-system": "yes" });
    render(<Ergebnis />);

    expect(
      screen.getByText(/^Bitte berücksichtigen Sie in den weiteren Schritten/),
    ).toBeVisible();
    expect(screen.getByText("keine").tagName).toBe("B");
    expect(
      screen.queryByText("Was bedeutet das für Ihr Vorhaben?"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "Laden Sie Ihr Vorprüfungsergebnis herunter und fügen Sie es bei Bedarf Ihren Unterlagen bei.",
      ),
    ).toBeVisible();
  });

  it("adds the title to the e-mail", () => {
    store.save(withInteroperability);
    render(<Ergebnis />);

    fireEvent.change(screen.getByLabelText("Arbeitstitel des Vorhabens"), {
      target: { value: "Mein Gesetz" },
    });

    expect(decodeURIComponent(emailLink().getAttribute("href")!)).toContain(
      "Digitalcheck Vorprüfung: „Mein Gesetz“",
    );
  });

  it("requires the title before opening the e-mail", () => {
    store.save(withInteroperability);
    render(<Ergebnis />);
    const input = screen.getByLabelText("Arbeitstitel des Vorhabens");

    expect(fireEvent.click(emailLink())).toBe(false);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveFocus();
    expect(
      screen.getByText("Bitte geben Sie den Arbeitstitel des Vorhabens an."),
    ).toBeVisible();

    fireEvent.change(input, { target: { value: "Mein Gesetz" } });

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(
      screen.queryByText("Bitte geben Sie den Arbeitstitel des Vorhabens an."),
    ).not.toBeInTheDocument();
    expect(fireEvent.click(emailLink())).toBe(true);
  });

  it("asks to contact the support when unsure", () => {
    store.save({ ...allNo, kommunikation: "unsure" });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", { name: /mit „Ich bin unsicher“/ }),
    ).toBeVisible();
    expect(
      screen.queryByText("Ergebnis Ihrer Vorprüfung"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Ergebnis herunterladen"),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/das Digitalcheck-Team/)).toBeVisible();
    expect(
      screen.getByRole("link", { name: "kontakt@digitalcheck.gov.de" }),
    ).toBeVisible();
  });

  it("asks to contact the ZbR in Brandenburg when unsure", () => {
    $pruefbereich.set("Brandenburg");
    store.save({ ...allNo, kommunikation: "unsure" });
    render(<Ergebnis />);

    expect(
      screen.getByText(
        /^Bitte kontaktieren Sie die Zentralstelle für bessere Rechtsetzung \(ZbR\) per E-Mail an/,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "zbr@mdjd.brandenburg.de" }),
    ).toHaveAttribute("href", "mailto:zbr@mdjd.brandenburg.de");
    expect(screen.queryByText(/Digitalcheck-Team/)).not.toBeInTheDocument();
  });

  it("asks to contact the support in Nordrhein-Westfalen when unsure", () => {
    $pruefbereich.set("Nordrhein-Westfalen");
    store.save({ ...allNo, kommunikation: "unsure" });
    render(<Ergebnis />);

    expect(
      screen.getByText(/zuständigen Kolleginnen und Kollegen unter/),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "fp-r213@mhkbd.nrw.de" }),
    ).toHaveAttribute("href", "mailto:fp-r213@mhkbd.nrw.de");
    expect(screen.queryByText(/Digitalcheck-Team/)).not.toBeInTheDocument();
  });

  it("links to the Datenaustausch for a contradiction", () => {
    store.save({ ...allNo, "eu-bezug": "yes" });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", {
        name: "Widersprüchliche Angaben – bitte prüfen",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Frage 3 zum Datenaustausch überprüfen",
      }),
    ).toHaveAttribute("href", "/assistent/vorpruefung/datenaustausch");
    expect(
      screen.queryByText("Ergebnis Ihrer Vorprüfung"),
    ).not.toBeInTheDocument();
  });
});
