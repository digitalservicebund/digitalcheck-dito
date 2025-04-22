import { steps } from "~/resources/content/components/naechste-schritte";
import {
  ROUTE_EXAMPLES,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS_FIVE_PRINCIPLES,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const index = {
  title: "Digitaltaugliche Regelungen erarbeiten",
  subtitle: dedent`
    Hier erfahren Sie,

    - was Digitaltauglichkeit für Ihr Regelungsvorhaben bedeutet,
    - wie Sie eine reibungslose Umsetzung des Vorhabens ermöglichen,
    - welche Unterlagen Sie benötigen.
  `,
  list: {
    title: "So gehen Sie vor",
    items: [
      steps.preCheck,
      {
        spacer: {
          text: "Bei positiver Vorprüfung:",
        },
        ...steps.methods,
      },
      steps.documentation,
      steps.nkr,
    ],
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
    text: `Seit Januar 2025 tritt die [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) in Kraft. Bestimmte Regelungsvorhaben müssen daher die EU-Anforderungen an Interoperabilität erfüllen. Ob und wie die Verordnung Ihr Vorhaben betrifft, erfahren Sie in unserer [Vorprüfung](/vorpruefung) und auf der Übersichtsseite zur Interoperabilität.`,
    link: {
      text: "Übersicht zur Interoperabilität",
      href: ROUTE_INTEROPERABILITY.url,
      look: "link" as const,
    },
  },
  summary: {
    title: "Zusammengefasst",
    items: [
      {
        headline: {
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
        headline: {
          text: "Digitaltaugliche Regelungen sparen Ressourcen",
        },
        content: `Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden: auf Seiten der Normadressaten und -adressatinnen und auf Seiten der Verwaltung.`,
      },
      {
        headline: {
          text: "Alle Regelungsvorhaben sind betroffen",
        },
        content: `Der Digitalcheck gilt für alle Regelungsvorhaben (Gesetze, Verordnungen und Verwaltungsvorschriften), sowohl für neue Vorhaben als auch für Änderungen an bestehenden Regelungen.`,
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
      href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
    },
  },
};
