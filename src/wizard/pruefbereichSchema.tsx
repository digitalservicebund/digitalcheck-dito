import { showLaender } from "@/config/features";
import { contact } from "@/resources/content/shared/contact";
import type { ReactNode } from "react";
import { z } from "zod";
import type { ClearResult } from "./vorpruefungResult";

// The Prüfbereich (Bund or a Bundesland), shared by both wizards and chosen on
// their start pages, with its Prüfstelle. Only depends on zod, the feature
// flags and the contact data (plus JSX for texts), so it can be imported anywhere.

/** Checks the Regelungsvorhaben, gets the results of both wizards by e-mail */
type Pruefstelle = {
  /** In the nominative, e.g. "der NKR prüft", see accusative() */
  article: "der" | "die";
  shortName: string;
  name: string;
  email: string;
};

/** Helps with an unclear Vorprüfung, as "{intro} {email}. {outro}" */
type Support = {
  email: string;
  intro: string;
  outro: string;
};

type PruefbereichData = {
  label: string;
  /** Without one, the results aren't sent to a Prüfstelle */
  pruefstelle?: Pruefstelle;
  /** Without one, the Digitalcheck team helps */
  support?: Support;
  /** Replaces the default texts on the result page of the Vorprüfung */
  vorpruefungTexts?: {
    /** Shown without the heading "Was bedeutet das für Ihr Vorhaben?" */
    meanings?: Record<ClearResult, ReactNode>;
    /** Intro of the download step */
    download?: string;
  };
  /** Replaces the default texts on the last page of the Dokumentation */
  dokumentationTexts?: {
    /** Intro of the download step */
    download?: string;
  };
};

const zbrEmail = "zbr@mdjd.brandenburg.de";

// Bund comes first, so it's preselected. The Länder are only offered (and
// accepted) with the feature flag, otherwise stored ones fall back to the Bund.
const allPruefbereiche = {
  Bund: {
    label: "Bund",
    pruefstelle: {
      article: "der",
      shortName: "NKR",
      name: "Normenkontrollrat",
      email: contact.nkrEmail,
    },
  },
  Brandenburg: {
    label: "Brandenburg",
    pruefstelle: {
      article: "die",
      shortName: "ZbR",
      name: "Zentralstelle für bessere Rechtsetzung",
      email: zbrEmail,
    },
    support: {
      email: zbrEmail,
      intro:
        "Bitte kontaktieren Sie die Zentralstelle für bessere Rechtsetzung (ZbR) per E-Mail an",
      outro: "Sie unterstützt Sie dabei, die Vorprüfung abzuschließen.",
    },
  },
  Hessen: { label: "Hessen" },
  "Nordrhein-Westfalen": {
    label: "Nordrhein-Westfalen",
    support: {
      email: "fp-r213@mhkbd.nrw.de",
      intro:
        "Bei Fragen zur Vorprüfung wenden Sie sich gerne per E-Mail an die zuständigen Kolleginnen und Kollegen unter",
      outro: "Sie unterstützen Sie gerne beim Ausfüllen der Vorprüfung.",
    },
    vorpruefungTexts: {
      meanings: {
        negative:
          "Sie müssen nichts weiter veranlassen. Der Digitalcheck für Ihr Regelungsvorhaben ist damit abgeschlossen.",
        digital: (
          <>
            Bitte berücksichtigen Sie in den weiteren Schritten Ihres
            Regelungsvorhabens die Anforderungen an die Digitaltauglichkeit. Für
            die EU-Interoperabilität sind <b>keine</b> weiteren Maßnahmen
            erforderlich.
          </>
        ),
        digitalAndInteroperability:
          "Bitte berücksichtigen Sie in den weiteren Schritten Ihres Regelungsvorhabens die Anforderungen an die Digitaltauglichkeit sowie die europäischen Vorgaben zur Interoperabilität.",
      },
      download:
        "Laden Sie Ihr Vorprüfungsergebnis herunter und fügen Sie es bei Bedarf Ihren Unterlagen bei.",
    },
    dokumentationTexts: {
      download:
        "Laden Sie die ausgefüllte Dokumentation herunter und fügen Sie diese Ihrem Gesetzesvorhaben bei.",
    },
  },
} as const satisfies Record<string, PruefbereichData>;

type AnyPruefbereich = keyof typeof allPruefbereiche;

export const pruefbereichOptions = (
  Object.keys(allPruefbereiche) as AnyPruefbereich[]
)
  .filter((value) => showLaender || value === "Bund")
  .map((value) => ({ value, label: allPruefbereiche[value].label }));

export type Pruefbereich = (typeof pruefbereichOptions)[number]["value"];

export const getPruefbereichData = (value: Pruefbereich): PruefbereichData =>
  allPruefbereiche[value];

/** The article in the accusative, e.g. "den" for "an den NKR" */
export const accusative = ({ article }: Pruefstelle) =>
  article === "der" ? "den" : "die";

export const pruefbereich = z.enum(
  pruefbereichOptions.map((option) => option.value),
  "Bitte wählen Sie den Bund oder Ihr Bundesland aus.",
);
