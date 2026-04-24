import { beispiele_prinzipien, beispiele_visualisierungen, dokumentation, grundlagen_digitaltauglichkeit, grundlagen_normenkontrollrat, interoperabel, interoperabel_nationaleKontaktstelle, methoden, methoden_fuenfPrinzipien, unterstuetzung, vorpruefung } from "@/config/routes";
import { type ActiveBehavior } from "~/components/DropdownContentList";
import { contact } from "~/resources/content/shared/contact";
import { ROUTE_SUPPORT_TRAININGS } from "~/resources/staticRoutes";

export const header = {
  title: "Digitalcheck",
  contactTel: {
    msg: "Kontaktieren Sie den Support:",
    msgMobile: "Support:",
    number: contact.phoneDisplay,
  },
  contactMail: {
    msg: "oder",
    text: contact.email,
    url: `mailto:${contact.email}`,
  },
  noscript: {
    text: "**Menü funktioniert nicht?** Erlauben Sie JavaScript in den Browsereinstellungen oder navigieren Sie über den [Footer](#footer).",
  },
  items: [
    {
      isOrderedList: true,
      plausibleEventName: "Schritt+für+Schritt",
      text: "Schritt für Schritt",
      overlayContent: [
        {
          plausibleEventName: "Link+Vorprüfung",
          title: "Vorprüfung: Digitalbezug einschätzen",
          content:
            "Anhand von 6 Fragen lernen Sie, in welchem Umfang Sie Digitaltauglichkeit beachten müssen.",
          newContent: "Mit europäischem Interoperabilitätsbezug",

          href: vorpruefung.path,
        },
        {
          plausibleEventName: "Link+Erarbeiten",
          title: "Digitaltauglichkeit der Regelung sicherstellen",
          content:
            "Wir zeigen Ihnen Schritt für Schritt, wie Sie Ihr Vorhaben digitaltauglich gestalten.",
          href: methoden.path,
        },
        {
          plausibleEventName: "Link+Dokumentieren",
          title: "Dokumentieren der Digitaltauglichkeit",
          content:
            "Dokumentieren Sie, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben.",
          href: dokumentation.path,
        },
      ],
    },
    {
      plausibleEventName: "Beispiele",
      text: "Beispiele",
      overlayContent: [
        {
          plausibleEventName: "Link+Prinzipien+Beispiele",
          title: "Digitaltauglichkeit im Regelungstext",
          content:
            "So wurden die 5 Prinzipien von Ihren Kolleginnen und Kollegen in Regelungen ausformuliert.",
          href: beispiele_prinzipien.path,
        },
        {
          plausibleEventName: "Link+Visualisierungen",
          title: "Visualisierungen",
          content:
            "Veröffentliche Visualisierungen, welche Referaten beim Erarbeiten der Digitaltauglichkeit geholfen haben.",
          href: beispiele_visualisierungen.path,
        },
      ],
    },
    {
      plausibleEventName: "Grundlagen",
      text: "Grundlagen",
      overlayContent: [
        {
          plausibleEventName: "Link+Prinzipien",
          title: "Prinzipien für digitaltaugliche Gesetzgebung",
          content:
            "Auf diesen Prinzipien basieren die Instrumente des Digitalcheck.",
          href: methoden_fuenfPrinzipien.path,
        },
        {
          plausibleEventName: "Link+Interoperabilität",
          title: "EU-Interoperabilität",
          isNewTitle: true,
          content:
            "Verstehen Sie, was es mit EU-Interoperabilität auf sich hat.",
          href: interoperabel.path,
          activeBehavior: "exactMatch" as ActiveBehavior,
        },
        {
          plausibleEventName: "Link+Prinzipien",
          title: "Was ist Digitaltauglichkeit?",
          content:
            "Welche Relevanz Digitaltauglichkeit hat und wie Ihre Regelung davon profitiert.",
          href: grundlagen_digitaltauglichkeit.path,
        },
        {
          plausibleEventName: "Link+Prinzipien",
          title: "NKR und Digitalcheck",
          isNewTitle: true,
          content:
            "Aufgaben und Vorgehensweise des Nationalen Normenkontrollrat im Kontext des Digitalcheck.",
          href: grundlagen_normenkontrollrat.path,
        },
      ],
    },
    {
      plausibleEventName: "Kontakt+Support",
      text: "Kontakt und Support",
      hasSupport: true,
      overlayContent: [
        {
          plausibleEventName: "Link+Alle+Hilfestellungen",
          title: "Individuelle Unterstützung für Ihr Vorhaben",
          content:
            "Nutzen Sie unsere persönliche Hilfestellungen bei der Regelungsarbeit.",
          href: unterstuetzung.path,
          activeBehavior: "noHighlight" as ActiveBehavior,
        },
        {
          plausibleEventName: "Link+Schulungen",
          title: "Schulungen",
          content:
            "In dieser Online-Schulung bekommen Sie praktische Tipps für den Digitalcheck.",
          href: ROUTE_SUPPORT_TRAININGS.url,
          activeBehavior: "noHighlight" as ActiveBehavior,
        },
        {
          plausibleEventName: "Link+Nationale+Kontaktstelle",
          title: "Nationale Kontaktstelle",
          isNewTitle: true,
          content:
            "Nationale Kontaktstelle für ein interoperables Europa (2024/903 Art. 17).",
          href: interoperabel_nationaleKontaktstelle.path,
        },
      ],
    },
  ],
};
