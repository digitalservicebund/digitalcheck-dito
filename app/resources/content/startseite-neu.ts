import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_INTEROPERABILITY,
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
          "Sie identifizieren den Digitalbezug und Interoperabilitätsanforderungen für Ihr Vorhaben.",
        duration: "Wenige Minuten",
        result:
          "Identifizierter Digital- und Interoperabilitätsbezug; Ergebnis als E-Mail mit ggf. weiteren notwendigen Normenkontrolle",
      },
      {
        number: 2,
        title: "Digitaltauglichkeit der Regelung sicherstellen",
        link: {
          text: "Regelung erarbeiten",
          href: ROUTE_METHODS.url,
          look: "ghost" as const,
        },
        description:
          "Bei einer positiven Vorprüfung wenden Sie die Werkzeuge und Methoden an, die die Digitaltauglichkeit Ihres Vorhabens sicherstellen.",
        duration: "Punktuell über die gesamte Zeit der Regelungsausarbeitung",
        result:
          "Ihre Regelung wird organisatorisch, visualisiert als zur Angebotenen Umsetzung Ihrer Regelung",
      },
      {
        number: 3,
        title: "Dokumentieren der Digitaltauglichkeit",
        link: {
          text: "Digitaltauglichkeit dokumentieren",
          href: ROUTE_DOCUMENTATION.url,
          look: "ghost" as const,
        },
        description:
          "Sie dokumentieren, wie Sie Digitaltauglichkeit in Ihrer Regelung sichergestellt haben.",
        duration: "Ein bis zwei Stunden",
        result:
          "Ausgefülltes Word-Dokument, welches Sie dem Normenkontrollrat senden",
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
    title: "Das Potential von Visualisierungen nutzen",
    content:
      "Visualisierungen helfen kostspieligen Aufbau Ihrer Regelung einfach sichtbar zu machen und Digitaltauglichkeit einzuschätzen.",
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
      "Fünf Prinzipien helfen Ihnen dabei, bei der digitalen Umsetzung ausgeschöpfte und Hindernisse zu erkennen.",
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
    title: "Individuelle Digital-Expertise für Ihr Vorhaben kennenlernen",
    content:
      "Nutzen Sie unsere persönlichen Unterstützung: Angebote, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Prozess erfolgreich durchzuführen.",
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

  dataNotice: {
    headline: "Ihre Arbeitsstände werden eine Woche lang gespeichert.",
    content:
      "Um in dieser Zeit zu Ihrem alten Arbeitsstand zurückzukehren, nutzen Sie bitte denselben Rechner und Browser.",
  },
  trainings: {
    title: "Beispiele für Digitaltauglichkeit",
    text: dedent`
      Auf dieser Seite finden Sie Beispiele für digitaltaugliche Regelungsvorhaben. Lassen Sie sich inspirieren durch:
      - die Umsetzung der 5 Prinzipien in Regelungstexten durch konkrete Formulierungen
      - geeignete Visualisierungen einzelner Sachverhalte und ganzer Regelungsvorhaben`,
    link: {
      text: "Jetzt Beispiele entdecken",
      href: ROUTE_EXAMPLES.url,
      look: "link" as const,
    },
  },
  interoperability: {
    title: "EU-Vorgaben zur Interoperabilität in Regelungen",
    text: "Seit Januar 2025 tritt die [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) in Kraft. Bestimmte Regelungsvorhaben müssen daher die EU-Anforderungen an Interoperabilität erfüllen. Ob und wie die Verordnung Ihr Vorhaben betrifft, erfahren Sie in unserer [Vorprüfung](/vorpruefung) und auf der Übersichtsseite zur Interoperabilität.",
    link: {
      text: "Übersicht zur Interoperabilität",
      href: ROUTE_INTEROPERABILITY.url,
      look: "link" as const,
    },
  },
  summary: {
    tabName: "Was ist Digitaltauglichkeit?",
    plausibleEventName: "Tab+Bar+Digitaltauglichkeit",
    title: "Zusammengefasst",
    items: [
      {
        heading: {
          text: "Was ist Digitaltauglichkeit?",
        },
        content: dedent`
          Regelungen werden vermehrt digital umgesetzt. Beispiele sind eine Gesetzesänderung, mit der ein Papierantrag 
          durch einen Online-Antrag ersetzt wird oder eine Verordnung, die Änderungen in den IT-Verfahren nachgelagerter 
          Behörden erfordert.
          <br class="block content-[''] mb-24!" />
          Damit die digitale Umsetzung reibungslos klappt, muss die Regelung digitaltauglich gestaltet sein. Das heißt 
          erstens, dass der digitalen Umsetzung nichts im Wege steht, wie zum Beispiel das persönliche Einreichen von 
          Dokumenten. Zweitens soll aktiv gefördert werden, dass möglichst viele Schritte von Computern durchgeführt 
          oder unterstützt werden.`,
      },
      {
        heading: {
          text: "Digitaltaugliche Regelungen sparen Ressourcen",
        },
        content:
          "Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden: auf Seiten der Normadressaten und -adressatinnen und auf Seiten der Verwaltung.",
      },
      {
        heading: {
          text: "Alle Regelungsvorhaben sind betroffen",
        },
        content:
          "Der Digitalcheck gilt für alle Regelungsvorhaben (Gesetze, Verordnungen und Verwaltungsvorschriften), sowohl für neue Vorhaben als auch für Änderungen an bestehenden Regelungen.",
      },
    ],
  },
  principles: {
    title: "5 Prinzipien für digitaltaugliche Gesetzgebung",
    content: [
      "Prinzip 1: Digitale Kommunikation sicherstellen",
      "Prinzip 2: Wiederverwendung von Daten und Standards ermöglichen",
      "Prinzip 3: Datenschutz und Informationssicherheit gewährleisten",
      "Prinzip 4: Klare Regelungen für eine digitale Ausführung finden",
      "Prinzip 5: Automatisierung ermöglichen",
    ],
    link: {
      text: "Details und Beispiele",
      href: ROUTE_METHODS_PRINCIPLES.url,
    },
  },
};
