import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_METHODS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_VISUALIZE,
  ROUTE_PRECHECK,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
import { ContentAction, LinkAction } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";

export const startseite = {
  title: "Digitaltaugliche Regelungen erarbeiten",
  subtitle: dedent`
    Der Digitalcheck ist eine Prozessbegleitung für Ihr Regelungsvorhaben. Sie
    stellen damit Digitaltauglichkeit sicher.
  `,
  stepByStep: {
    title: "Schritt für Schritt",
    procedureLabel: "Vorgehen",
    durationLabel: "Dauer",
    resultLabel: "Ergebnis",
    steps: [
      {
        number: 1,
        title: "Digitalbezug einschätzen",
        link: {
          text: "Digitalbezug einschätzen",
          linkTo: ROUTE_PRECHECK.url,
          look: "primary" as const,
          plausibleEventName: "Content.Schritte.Button+Vorprüfung",
        } satisfies ContentAction,
        description: {
          text: "Sie identifizieren Digitalbezug und Inter&shy;operabilitäts&shy;an&shy;for&shy;der&shy;un&shy;gen für Ihr Vorhaben.",
        },
        duration: "Wenige Minuten",
        result: dedent`
          - Individueller Digital- und Interoperabilitätsbezug
          - Ergebnis als E-Mail zum Versenden an den Nationalen Normenkontrollrat
        `,
      },
      {
        number: 2,
        title: "Digitaltauglichkeit der Regelung sicherstellen",
        link: {
          text: "Regelung erarbeiten",
          linkTo: ROUTE_METHODS.url,
          look: "tertiary" as const,
          plausibleEventName: "Content.Schritte.Link+Erarbeiten",
        } satisfies ContentAction,
        description: {
          text: "Bei einer positiven Vorprüfung wenden Sie die Werkzeuge und Methoden an, die die Digitaltauglichkeit Ihres Vorhabens sicherstellen.",
        },
        duration: "Punktuell über die gesamte Zeit der Regelungsausarbeitung",
        result: dedent`
          - Ihre Regelung wird digitaltauglich
          - Visualisierungen zur digitaltauglichen Umsetzung Ihrer Regelung
        `,
      },
      {
        number: 3,
        title: "Dokumentieren der Digitaltauglichkeit",
        link: {
          text: "Dokumentation erstellen",
          linkTo: ROUTE_DOCUMENTATION.url,
          look: "tertiary" as const,
          plausibleEventName: "Content.Schritte.Link+Dokumentieren",
        } satisfies ContentAction,
        description: {
          text: "Sie dokumentieren, wie Sie Digitaltauglichkeit in Ihrer Regelung sichergestellt haben.",
          // special case that depends on a feature flag being set
          FEATURE_enableDigitalDocumentationHighlight: {
            badge: "NEU",
            text: "Jetzt auch online ausfüllbar.",
          },
        },

        duration: "Ein bis zwei Stunden",
        result: dedent`
          - Ausgefülltes Word-Dokument, welches Sie dem Nationalen Normenkontrollrat senden
          - Ihr Vorhaben ist formal bereit für die Ressortabstimmung
        `,
      },
    ],
  },

  grundlagen: {
    title: "Grundlagen zum Digitalcheck",
    wasIstDigitaltauglichkeit: {
      title:
        "Was ist Digitaltauglichkeit? Und wie unterstützt Sie der Digitalcheck dabei?",
      content:
        "Digitaltaugliche Regelungen ermöglichen eine rechtlich und technisch reibungslose digitale Umsetzung und fördern die automatisierte Bearbeitung von Verfahrensschritten.",
      link: {
        text: "Mehr zur Digitaltauglichkeit erfahren",
        linkTo: ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url,
        plausibleEventName: "Content.Grundlagen.Link+Digitaltauglichkeit",
        look: "link",
      } satisfies LinkAction,
    },
    nationaleNormenkontrolle: {
      title: "Worauf achtet der Nationale Normenkontrollrat?",
      content:
        "Der Nationale Normenkontrollrat (NKR) prüft das Vorhaben auf Digitaltauglichkeit. Mit der Anwendung der **Prinzipien** und Erstellung von **Visualisierungen** kann der Nationale Normenkontrollrat die Digitaltauglichkeit besser und schneller nachvollziehen.",
      link: {
        text: "Mehr zum NKR erfahren",
        linkTo: ROUTE_FUNDAMENTALS_NKR.url,
        plausibleEventName: "Content.Grundlagen.Link+NKR",
        look: "link",
      } satisfies LinkAction,
    },
  },

  visualisierungen: {
    title: "Das Potenzial von Visualisierungen nutzen",
    content:
      "Visualisierungen helfen bestehende Abläufe Ihrer Regelung einfach sichtbar zu machen und Digitaltauglichkeit einzuschätzen.",
    links: [
      {
        text: "Zu Visualisierungen",
        linkTo: ROUTE_METHODS_VISUALIZE.url,
        look: "tertiary" as const,
        plausibleEventName:
          "Content.Teaser+Visualisierungen.Link+Visualisierungen",
      },
      {
        text: "Beispiele",
        linkTo: ROUTE_EXAMPLES_VISUALISATIONS.url,
        look: "ghost" as const,
        plausibleEventName: "Content.Teaser+Visualisierungen.Link+Beispiele",
      },
    ] satisfies ContentAction[],
  },

  prinzipien: {
    title: "Prinzipien als Grundlage für Digitaltauglichkeit einsetzen",
    content:
      "Fünf Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen.",
    links: [
      {
        text: "Zu den Prinzipien",
        linkTo: ROUTE_METHODS_PRINCIPLES.url,
        look: "tertiary" as const,
        plausibleEventName: "Content.Teaser+Prinzipien.Link+Prinzipien",
      },
      {
        text: "Beispiele",
        linkTo: ROUTE_EXAMPLES_PRINCIPLES.url,
        look: "ghost" as const,
        plausibleEventName: "Content.Teaser+Prinzipien.Link+Beispiele",
      },
    ] satisfies ContentAction[],
  },

  individuelleExpertise: {
    title: "Individuelle Unterstützung für Ihr Vorhaben",
    content:
      "Nutzen Sie unsere persönlichen Unterstützungsangebote, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Prozess erfolgreich zu durchlaufen.",
    link: {
      text: "Angebote kennenlernen",
      linkTo: ROUTE_SUPPORT.url,
      look: "tertiary" as const,
      plausibleEventName: "Content.Support.Button+Support",
    } satisfies ContentAction,
  },

  quote: {
    text: "„Der Digitalcheck erscheint mit den Hilfestellungen unkomplizierter als gedacht.“",
    reference: "**Referentin**<br>aus einem Bundesministerium",
  },
};
