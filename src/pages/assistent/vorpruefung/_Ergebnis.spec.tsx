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
      screen.getByText("Anforderungen der Interoperabilität"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Ergebnis per E-Mail an den NKR senden",
      }),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:poststelle@nkr\.bund\.de\?cc=interoperabel%40digitalservice\.bund\.de&/,
    );
  });

  it("sends the result to the NKR without a copy for the Bund without Interoperabilität", () => {
    store.save({ ...allNo, "it-system": "yes" });
    render(<Ergebnis />);

    expect(
      screen.getByText("keine eindeutigen Anforderungen der Interoperabilität"),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).not.toContain("cc=");
    expect(screen.queryByText(/Kopie/)).not.toBeInTheDocument();
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
      /^mailto:interoperabel@digitalservice\.bund\.de\?/,
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
  });

  it("adds the title to the e-mail", () => {
    store.save(withInteroperability);
    render(<Ergebnis />);

    fireEvent.change(screen.getByLabelText("Arbeitstitel des Vorhabens"), {
      target: { value: "Mein Gesetz" },
    });

    expect(decodeURIComponent(emailLink().getAttribute("href")!)).toContain(
      "Vorhaben: Mein Gesetz",
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
