import { dokumentation, methoden, vorpruefung } from "@/config/routes";
import type { Step } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";
import { contact } from "./contact";

const methodsStepGeneric: Step = {
  headline: {
    text: "Erarbeiten des Regelungsvorhabens",
  },
  content:
    "Nutzen Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit und Interoperabilität in Ihrer Regelung sicherzustellen.",
  link: {
    text: "Zu „Erarbeiten“",
    to: methoden.path,
  },
  isDisabled: false,
  finished: {
    headline: {
      text: "Abgeschlossene Erarbeitung eines digitaltauglichen Regelungsvorhabens.",
    },
    isDisabled: true,
  },
};

export const steps = {
  preCheck: {
    headline: {
      text: "Vorprüfung: Digitalbezug einschätzen",
    },
    content:
      "Finden Sie heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der digitalen Umsetzung und EU-Anforderungen an Interoperabilität beachten müssen. Danach entscheidet sich, ob die weiteren Schritte für Sie relevant sind.",
    link: {
      text: "Digitalbezug einschätzen",
      to: vorpruefung.path,
    },
    finished: {
      headline: {
        text: "Abgeschlossene Vorprüfung: Der Digitalbezug wurde eingeschätzt.",
      },
      isDisabled: true,
    },
  },
  methodsGeneric: methodsStepGeneric,
  methodsBund: {
    ...methodsStepGeneric,
    content: `${methodsStepGeneric.content} Das Digitalcheck-Team steht Ihnen bei der Erarbeitung zur Verfügung`,
    condition: ({ isBund, hasDigitalbezug }) => hasDigitalbezug && isBund,
  },
  methodsBundesland: {
    ...methodsStepGeneric,
    condition: ({ isBund, hasDigitalbezug }) => hasDigitalbezug && !isBund,
  },
  documentation: {
    headline: {
      text: "Dokumentieren des Regelungsvorhabens",
    },
    content:
      "Dokumentieren Sie in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Beschreiben Sie, wie Sie diese in das Regelungsvorhaben einfließen lassen. Die Erkenntnisse der vorigen Schritte helfen Ihnen beim Ausfüllen.",
    link: {
      text: "Zu „Dokumentieren“",
      to: dokumentation.path,
    },
    isDisabled: false,
    finished: {
      headline: {
        text: "Abgeschlossene Dokumentation der Digitaltauglichkeit.",
      },
      isDisabled: true,
    },
  },
  pruefstelleGeneric: {
    headline: {
      text: "Prüfen durch zuständige Prüfstelle",
    },
    content: dedent`
        Ihre Prüfstelle untersucht ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Senden Sie die von Ihnen erstelle Dokumentation per E-Mail an Ihre Prüfstelle. Die E-Mail-Adresse finden Sie am Ende der Dokumentationserstellung. 

        Damit ist der Digitacheck für Sie beendet. 

        Wenn Sie keine Prüfstelle haben, dient die Dokumentation zur Selbstprüfung.`,
    isDisabled: false,
  },
  pruefstelleBund: {
    headline: { text: "Prüfen durch den NKR" },
    content: dedent`
      Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen. 
      Senden Sie die von Ihnen erstellte Dokumentation per E-Mail an folgende Adresse: ${contact.nkrEmail}

      Damit ist der Digitalcheck für Sie beendet.
    `,
    condition: ({ isBund }) => isBund,
  },
  pruefstelleBundesland: {
    headline: { text: "Prüfen durch zuständige Prüfstelle" },
    content: dedent`
      Ihre zuständige Prüfstelle prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung.

      Damit ist der Digitalcheck für Sie beendet.
    `,
    condition: ({ isBund, hasPruefstelle }) => !isBund && hasPruefstelle,
  },
} satisfies { [key: string]: Step };
