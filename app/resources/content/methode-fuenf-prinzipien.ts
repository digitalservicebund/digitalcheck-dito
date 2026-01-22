import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import {
  ROUTE_DOWNLOAD_PRINCIPLE_POSTER,
  ROUTE_METHODS,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";
import { ContentLink } from "~/utils/contentTypes.ts";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methodsFivePrinciples = {
  title: "Chancen und Hindernisse der digitalen Umsetzung identifizieren",
  subtitle: dedent`
  Die folgenden Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen. Nutzen Sie die Prinzipien auch, um mit beteiligten Akteurinnen und Akteuren über die Umsetzung zu sprechen.
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
    title: "So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
  },
  principleLabel: "Prinzip",
  detailsSummaryTitle: "So wenden Sie das Prinzip an",
  nextStepMethods: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.5. Technische Umsetzbarkeit sicherstellen",
    text: "Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
    links: [
      {
        look: "tertiary" as const,
        text: "IT-Auswirkungen prüfen",
        to: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
      },
    ] satisfies ContentLink[],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title:
      "Verfassen Sie den Regelungsentwurf und dokumentieren Sie Ihre Entscheidungen",
    text: "Die gesammelten Erkenntnisse und Ergebnisse helfen Ihnen dabei, Aspekte der Digitaltauglichkeit in Ihrem Regelungsentwurf zu berücksichtigen. Diese Entscheidungen dokumentieren Sie in einem Fragebogen.",
    links: [
      {
        text: "Zu „Erarbeiten“",
        look: "tertiary" as const,
        to: ROUTE_METHODS.url + "#verfassen-des-regelungsentwurfes",
      },
    ] satisfies ContentLink[],
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
