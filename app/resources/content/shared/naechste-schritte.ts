import {
  ROUTE_DOCUMENTATION,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import { LinkAction, Step } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";

const stepNKR: Step<LinkAction> = {
  headline: {
    text: "Prüfen durch den NKR",
  },
  content:
    "Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.",
  isDisabled: false,
};
export const steps = {
  preCheck: {
    headline: {
      text: "Vorprüfung: Digitalbezug einschätzen",
    },
    content:
      "Finden Sie heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der digitalen Umsetzung und EU-Anforderungen an Interoperabilität beachten müssen. Danach entscheidet sich, ob die weiteren Schritte für Sie relevant sind.",
    action: {
      text: "Digitalbezug einschätzen",
      linkTo: ROUTE_PRECHECK.url,
    },
    finished: {
      headline: {
        text: "Abgeschlossene Vorprüfung: Der Digitalbezug wurde eingeschätzt.",
      },
      isDisabled: true,
    },
  },
  methods: {
    headline: {
      text: "Erarbeiten des Regelungsvorhabens",
    },
    content:
      "Nutzen Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit und Interoperabilität in Ihrer Regelung sicherzustellen. Das Digitalcheck-Team steht Ihnen bei der Erarbeitung zur Verfügung.",
    action: {
      text: "Zu „Erarbeiten“",
      linkTo: ROUTE_METHODS.url,
    },
    isDisabled: false,
    finished: {
      headline: {
        text: "Abgeschlossene Erarbeitung eines digitaltauglichen Regelungsvorhabens.",
      },
      isDisabled: true,
    },
  },
  documentation: {
    headline: {
      text: "Dokumentieren des Regelungsvorhabens",
    },
    content:
      "Dokumentieren Sie in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Beschreiben Sie, wie Sie diese in das Regelungsvorhaben einfließen lassen. Die Erkenntnisse der vorigen Schritte helfen Ihnen beim Ausfüllen.",
    action: {
      text: "Zu „Dokumentieren“",
      linkTo: ROUTE_DOCUMENTATION.url,
    },
    isDisabled: false,
    finished: {
      headline: {
        text: "Abgeschlossene Dokumentation der Digitaltauglichkeit.",
      },
      isDisabled: true,
    },
  },
  nkr: stepNKR,
  nkrFinal: {
    ...stepNKR,
    isDisabled: false,
    content:
      stepNKR.content +
      dedent`
        <p>Senden Sie die von Ihnen erstellte Dokumentation per E-Mail an folgende Adresse: <a href="mailto:nkr@bmj.bund.de" class="plausible-event-name=Content.Steps.Link+BMJ+Email underline hover:no-underline text-blue-700 font-bold">nkr@bmj.bund.de</a></p>

        Damit ist der Digitalcheck für Sie beendet.
      `,
  },
} satisfies { [key: string]: Step<LinkAction> };
