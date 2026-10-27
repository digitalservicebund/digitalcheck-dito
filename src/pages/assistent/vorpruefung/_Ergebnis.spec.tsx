import { wizardStores } from "@/wizard/stores";
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
  });

  it("sends the result to the NKR with a copy for Interoperabilität", () => {
    store.save({ pruefbereich: "Bund", ...withInteroperability });
    render(<Ergebnis />);

    expect(
      screen.getByText("Anforderungen der Interoperabilität"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Ergebnis an den Normenkontrollrat senden",
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
    store.save({ pruefbereich: "Hessen", ...withInteroperability });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", {
        name: "Ergebnis an das Digitalcheck Team senden",
      }),
    ).toBeVisible();
    expect(emailLink().getAttribute("href")).toMatch(
      /^mailto:interoperabel@digitalservice\.bund\.de\?/,
    );
  });

  it("only offers the download for a Land without Interoperabilität", () => {
    store.save({ pruefbereich: "Hessen", ...allNo });
    render(<Ergebnis />);

    expect(screen.getByText("keinen Digitalbezug")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Vorprüfungsergebnis herunterladen",
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

    fireEvent.change(
      screen.getByLabelText("Vorläufiger Arbeitstitel des Vorhabens"),
      { target: { value: "Mein Gesetz" } },
    );

    expect(decodeURIComponent(emailLink().getAttribute("href")!)).toContain(
      "Vorhaben: Mein Gesetz",
    );
  });

  it("asks to contact the support when unsure", () => {
    store.save({ ...allNo, kommunikation: "unsure" });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", { name: /mit „Ich bin unsicher“/ }),
    ).toBeVisible();
    expect(screen.queryByText("Ihr Ergebnis")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vorprüfungsergebnis herunterladen"),
    ).not.toBeInTheDocument();
  });

  it("links to the Datenaustausch for a contradiction", () => {
    store.save({ ...allNo, "eu-bezug": "yes" });
    render(<Ergebnis />);

    expect(
      screen.getByRole("heading", { name: "Widerspruch in Ihren Angaben" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Frage 3 zum Datenaustausch überprüfen",
      }),
    ).toHaveAttribute("href", "/assistent/vorpruefung/datenaustausch");
    expect(screen.queryByText("Ihr Ergebnis")).not.toBeInTheDocument();
  });
});
