import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_METHODS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_PRECHECK,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
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
          href: ROUTE_PRECHECK.url,
          look: "primary" as const,
        },
        description:
          "Sie identifizieren Digitalbezug und Interoperabilitätsanforderungen für Ihr Vorhaben.",
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
          href: ROUTE_METHODS.url,
          look: "tertiary" as const,
        },
        description:
          "Bei einer positiven Vorprüfung wenden Sie die Werkzeuge und Methoden an, die die Digitaltauglichkeit Ihres Vorhabens sicherstellen.",
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
          href: ROUTE_DOCUMENTATION.url,
          look: "tertiary" as const,
        },
        description:
          "Sie dokumentieren, wie Sie Digitaltauglichkeit in Ihrer Regelung sichergestellt haben.",
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
        title: "Mehr zur Digitaltauglichkeit erfahren",
        url: ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url,
      },
    },
    nationaleNormenkontrolle: {
      title: "Worauf achtet der Nationale Normenkontrollrat?",
      content:
        "Der Nationale Normenkontrollrat (NKR) prüft das Vorhaben auf Digitaltauglichkeit. Mit der Anwendung der **Prinzipien** und Erstellung von **Visualisierungen** kann der Nationale Normenkontrollrat die Digitaltauglichkeit besser und schneller nachvollziehen.",
      link: {
        title: "Mehr zum NKR erfahren",
        url: ROUTE_FUNDAMENTALS_NKR.url,
      },
    },
  },

  visualisierungen: {
    title: "Das Potenzial von Visualisierungen nutzen",
    content:
      "Visualisierungen helfen bestehende Abläufe Ihrer Regelung einfach sichtbar zu machen und Digitaltauglichkeit einzuschätzen.",
    buttons: [
      {
        text: "Zu Visualisierungen",
        href: ROUTE_METHODS_TASKS_PROCESSES.url,
        look: "tertiary" as const,
      },
      {
        text: "Beispiele",
        href: ROUTE_EXAMPLES_VISUALISATIONS.url,
        look: "ghost" as const,
      },
    ],
  },

  prinzipien: {
    title: "Prinzipien als Grundlage für Digitaltauglichkeit einsetzen",
    content:
      "Fünf Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen.",
    buttons: [
      {
        text: "Zu den Prinzipien",
        href: ROUTE_METHODS_PRINCIPLES.url,
        look: "tertiary" as const,
      },
      {
        text: "Beispiele",
        href: ROUTE_EXAMPLES_PRINCIPLES.url,
        look: "ghost" as const,
      },
    ],
  },

  individuelleExpertise: {
    title: "Individuelle Unterstützung für Ihr Vorhaben",
    content:
      "Nutzen Sie unsere persönlichen Unterstützungsangebote, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Prozess erfolgreich zu durchlaufen.",
    button: {
      text: "Angebote kennenlernen",
      href: ROUTE_SUPPORT.url,
      look: "tertiary" as const,
    },
  },

  quote: {
    text: "„Der Digitalcheck erscheint mit den Hilfestellungen unkomplizierter als gedacht.“",
    reference: "**Referentin**<br>aus einem Bundesministerium",
  },
};
