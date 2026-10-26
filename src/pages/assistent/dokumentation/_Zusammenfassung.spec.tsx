import { wizardStores } from "@/wizard/stores";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Zusammenfassung, { type PrinzipSummary } from "./_Zusammenfassung";

const store = wizardStores.dokumentation;

const prinzipien: PrinzipSummary[] = [
  {
    order: 1,
    name: "Digitale Angebote für alle nutzbar gestalten",
    path: "/assistent/dokumentation/prinzip-1",
    schwerpunkte: { "digitale-kommunikation": "Digitale Kommunikation" },
  },
];

const getSummary = (title: string) =>
  within(
    screen
      .getByRole("heading", { name: new RegExp(`${title}$`) })
      .closest<HTMLElement>(".kern-summary")!,
  );

describe("Zusammenfassung", () => {
  beforeEach(() => {
    store.reset();
  });

  it("shows the stored answers with their labels", () => {
    store.save({
      "regelungsvorhaben-titel": "Beispielvorhaben",
      "prinzip1-antwort": "yes",
      "prinzip1-schwerpunkte": ["digitale-kommunikation"],
      "prinzip1-erklaerung": "Verhindert einen Medienbruch.",
    });
    render(<Zusammenfassung prinzipien={prinzipien} />);

    expect(
      getSummary("Informationen zum Regelungsvorhaben").getByText(
        "Beispielvorhaben",
      ),
    ).toBeVisible();
    const prinzip = getSummary(
      "Prinzip 1: Digitale Angebote für alle nutzbar gestalten",
    );
    expect(prinzip.getByText("Ja, gänzlich oder teilweise")).toBeVisible();
    expect(prinzip.getByText("Digitale Kommunikation")).toBeVisible();
    expect(prinzip.getByText("Verhindert einen Medienbruch.")).toBeVisible();
  });

  it("marks steps without answers and missing answers", () => {
    store.save({ "prinzip1-antwort": "no" });
    render(<Zusammenfassung prinzipien={prinzipien} />);

    expect(
      getSummary("Beteiligungsformate").getByText(
        "Sie haben diesen Punkt noch nicht bearbeitet.",
      ),
    ).toBeVisible();
    const prinzip = getSummary(
      "Prinzip 1: Digitale Angebote für alle nutzbar gestalten",
    );
    expect(prinzip.getByText("Nein")).toBeVisible();
    // Schwerpunkte are only asked for "yes"
    expect(prinzip.queryByText("Schwerpunkte")).not.toBeInTheDocument();
    expect(
      prinzip.getByText(
        "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
      ),
    ).toBeVisible();
  });

  it("only lists the EU steps with EU-Bezug", () => {
    store.save({ "eu-interoperabilitaet-bezug": "no" });
    const { unmount } = render(<Zusammenfassung prinzipien={prinzipien} />);

    expect(screen.getByText("Nein")).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: /Verbindliche Anforderungen/ }),
    ).not.toBeInTheDocument();
    unmount();

    store.save({
      "eu-interoperabilitaet-bezug": "yes",
      "verbindliche-anforderungen": [
        {
          titel: "Übermittlung an Behörde",
          rechtsgrundlage: "§ 6",
          dienste: "",
          bereiche: ["health"],
          betroffene: "",
        },
        // Empty boxes are skipped
        {
          titel: "",
          rechtsgrundlage: "",
          dienste: "",
          bereiche: [],
          betroffene: "",
        },
      ],
    });
    render(<Zusammenfassung prinzipien={prinzipien} />);

    const anforderungen = getSummary("Verbindliche Anforderungen");
    expect(anforderungen.getByText("Übermittlung an Behörde")).toBeVisible();
    expect(anforderungen.getByText("Gesundheit")).toBeVisible();
    expect(anforderungen.getAllByText("Rechtsgrundlage")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /6.*Veröffentlichung/ }),
    ).toBeVisible();
  });

  it("links every step to its page", () => {
    render(<Zusammenfassung prinzipien={prinzipien} />);

    expect(
      screen.getByRole("link", {
        name: "Bearbeiten: Prinzip 1: Digitale Angebote für alle nutzbar gestalten",
      }),
    ).toHaveAttribute("href", "/assistent/dokumentation/prinzip-1");
    expect(
      screen.getByRole("link", {
        name: "Bearbeiten: Bezug zu EU-Interoperabilität",
      }),
    ).toHaveAttribute("href", "/assistent/dokumentation/eu-interoperabilitaet");
  });
});
