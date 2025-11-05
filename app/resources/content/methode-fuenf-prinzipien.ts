import { DrawOutlined } from "@digitalservicebund/icons";
import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import {
  ROUTE_DOWNLOAD_PRINCIPLE_POSTER,
  ROUTE_EXAMPLES,
  ROUTE_METHODS,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTE_METHODS_VISUALIZE,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
import { ContentAction } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";

export type DetailsSummary = {
  title: string;
  items: DetailsSummaryItem[];
};

export type DetailsSummaryItem = {
  title: string;
  text: string;
  questions: string[];
  wordingExample?: string;
};

export const methodsFivePrinciples = {
  title: "Chancen und Hindernisse der digitalen Umsetzung identifizieren",
  subtitle: dedent`
  Die folgenden Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen. Nutzen Sie die Prinzipien auch, um mit beteiligten Akteurinnen und Akteuren über die Umsetzung zu sprechen.
  
  Welche Prinzipien besonders wichtig sind und wie Sie diese anwenden, hängt davon ab, worum es in Ihrem Vorhaben geht – und ob Sie ein Gesetz oder eine Verordnung entwerfen. Sie sind sich unsicher oder wollen über Ihre Einordnung reflektieren, dann nutzen Sie gern unsere [vertraulichen Unterstützungs- und Supportangebote](${ROUTE_SUPPORT.url}).
  `,
  grundlagenTitle: "Prinzipien für digitaltaugliche Gesetzgebung",
  grundlagenSubtitle:
    "Die Prinzipien für digitaltaugliche Gesetzgebung bilden die Basis der Instrumente des Digitalcheck. Werden sie beachtet, ist eine Regelung mit hoher Wahrscheinlichkeit digitaltauglich und folgt den Vorgaben für EU-Interoperabilität.",
  buttonText: "Beispiele betrachten",
  wordingExampleTitle: "Formulierungsbeispiel:",
  questionsTitle: "Fragen Sie sich:",
  contentOverviewTitle: "Inhalt",
  exampleTitle: "Beispiel aus",
  exampleLinkText: "Ganzes Beispiel zeigen",
  anchor: {
    principle: "Prinzip:",
    instruction:
      "Anleitung: So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
  },
  instruction: {
    badge: {
      Icon: DrawOutlined,
      text: "Anleitung",
    },
    title: "So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
    items: [
      {
        heading: { text: "Als konkrete Umsetzungstipps" },
        content:
          "Nutzen Sie die Tipps als Inspiration, um in Ihrem Regelungsvorhaben die Möglichkeiten des Digitalen auszuschöpfen und Hindernisse zu erkennen.",
      },
      {
        heading: { text: "Als Überprüfung für den Gesamtprozess" },
        content: `Besonders erkenntnisreich sind die fünf Prinzipien, wenn Sie diese auf eine Skizze des geplanten Umsetzungsprozesses anwenden. Skizzieren Sie Schritt für Schritt die Umsetzung und markieren Sie die Stellen, an denen eines oder mehrere Prinzipien wichtig sind. Mehr Informationen und Anleitung zur Visualisierungen finden Sie auf [visualisieren.digitalcheck.bund.de](${ROUTE_METHODS_VISUALIZE.url}).`,
      },
      {
        heading: { text: "Als Startpunkt für ihren Regelungstext" },
        content:
          "Nutzen Sie die gesammelten Beispiele als Startpunkt für Ihre Formulierungen. Bauen Sie auf Formulierungen auf, oder lassen Sie sich durch die Wirklogiken Ihrer Kolleginnen und Kollegen inspirieren. Sie finden gute Formulierungen, Einordnungen und deren Kontext im Regelungstext in den Beispielen.",
        link: { url: ROUTE_EXAMPLES.url, text: "Beispiele betrachten" },
      },
    ],
  },
  principleLabel: "Prinzip",
  detailsSummaryTitle: "So wenden Sie das Prinzip an",
  nextStepMethods: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.5. Technische Umsetzbarkeit sicherstellen",
    text: "Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
    buttons: [
      {
        look: "tertiary" as const,
        text: "IT-Auswirkungen prüfen",
        linkTo: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
      },
    ] satisfies ContentAction[],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title:
      "Verfassen Sie den Regelungsentwurf und dokumentieren Sie Ihre Entscheidungen",
    text: "Die gesammelten Erkenntnisse und Ergebnisse helfen Ihnen dabei, Aspekte der Digitaltauglichkeit in Ihrem Regelungsentwurf zu berücksichtigen. Diese Entscheidungen dokumentieren Sie in einem Fragebogen.",
    buttons: [
      {
        text: "Zu „Erarbeiten“",
        look: "tertiary" as const,
        linkTo: ROUTE_METHODS.url + "#verfassen-des-regelungsentwurfes",
      },
    ] satisfies ContentAction[],
  },
  principlePosterBox: {
    badgeText: "Download",
    heading: "Die Prinzipien als Poster",
    content:
      "Drucken Sie sich das Poster in A4 oder A3 aus, um die Prinzipien für digitaltaugliche Gesetzgebung immer im Blick zu haben.",
    imageUrl: "/images/Poster_5Prinzipien.jpg",
    imageAlt: "Poster der 5 Prinzipien",
    downloadTitle: "Poster herunterladen",
    downloadUrl: ROUTE_DOWNLOAD_PRINCIPLE_POSTER.url,
  },
};
