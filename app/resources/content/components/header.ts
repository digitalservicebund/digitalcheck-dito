import {
  ROUTE_DOCUMENTATION,
  ROUTE_FIRST_PRINCIPLE,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_METHODS_FIVE_PRINCIPLES,
  ROUTE_PRECHECK,
  ROUTE_SUPPORT,
  ROUTE_VISUALISATIONS,
} from "~/resources/staticRoutes.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

export const header = {
  title: dedent`**Digitalcheck** 
  
  des Bundes`,
  contact: {
    msg: "Kontaktieren Sie den Support:",
    number: "0151/40 76 78 39",
  },
  items: [
    {
      isList: true,
      text: "Schritt für Schritt",
      overlayContent: [
        {
          title: "Vorprüfung: Digitalbezug identifizieren",
          content:
            "Anhand von 6 Fragen lernen Sie, in welchem Umfang Sie Digitaltauglichkeit beachten müssen.",
          href: ROUTE_PRECHECK.url,
        },
        {
          title: "Digitaltauglichkeit der Regelung sicherstellen",
          content:
            "Wir zeigen Ihnen Schritt für Schritt, wie Sie Ihr Vorhaben digitaltauglich gestalten.",
          newContent: "Mit EU Interoperabilitätsstandards",
          href: ROUTE_METHODS.url,
        },
        {
          title: "Dokumentieren der Digitaltauglichkeit",
          href: ROUTE_DOCUMENTATION.url,
        },
      ],
    },
    {
      text: "Beispiele",
      overlayContent: [
        {
          title: "Die 5 Prinzipien im Regelungstext",
          content:
            "Beispiele für digitaltaugliche Formulierungen aus anderen Regelungsvorhaben.",
          href: ROUTE_FIRST_PRINCIPLE.url,
        },
        {
          title: "Visualisierungen",
          content:
            "Veröffentliche Visualisierungen, welche Referaten beim Erarbeiten der Digitaltauglichkeit geholfen haben.",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },
    {
      text: "Grundlagen",
      overlayContent: [
        {
          title: "Prinzipien für digitaltaugliche Gesetzgebung",
          content:
            "Auf diesen Prinzipien basieren die Instrumente des Digitalcheck.",
          href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
        },
        {
          title: "Werkzeuge und Methoden",
          content:
            "Lernen Sie die Methoden kennen, mit denen Sie Digitaltauglichkeit sicherstellen können.",
          href: ROUTE_METHODS.url,
        },
        {
          title: "EU Interoperabilität",
          isNewTitle: true,
          content:
            "Verstehen Sie, was es mit EU Interoperabilität auf sich hat.",
          href: ROUTE_INTEROPERABILITY.url,
        },
      ],
    },
    {
      text: "Kontakt und Support",
      hasSupport: true,
      overlayContent: [
        {
          title: "Schulungen",
          content:
            "In dieser Online-Schulung bekommen Sie praktische Tipps für den Digitalcheck.",
          href: ROUTE_SUPPORT.url + "#angebote",
        },
        {
          title: "Termin buchen",
          content:
            "Buchen Sie ein Termin mit uns, damit wir Sie bei der Erarbeitung beraten können",
          href: ROUTE_SUPPORT.url + "#hilfe",
        },
      ],
    },
  ],
};
