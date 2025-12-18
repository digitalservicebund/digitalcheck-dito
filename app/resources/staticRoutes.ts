// These routes can't be exported from ~/routes.ts as that file isn't part of the app environment: https://github.com/remix-run/react-router/issues/12392

import { documentationDocument } from "~/resources/content/documentation-document";
import { preCheckQuestions } from "~/resources/content/shared/pre-check-questions";
import { FILE_NAME_DOCUMENTATION_STATIC_WORD } from "~/utils/constants";
import { removeTrailingSlash } from "~/utils/utilFunctions";

export type Route = {
  url: string;
  title: string;
  parent?: Route;
  hideInSitemap?: boolean;
};

// LANDING ROUTE AS ROOT
export const ROUTE_LANDING = {
  url: "/",
  title: "Startseite",
};

export const createRoute = (
  path: string,
  title: string,
  parent?: Route,
  hideInSitemap?: boolean,
): Route => ({
  url: `${removeTrailingSlash(parent?.url ?? "")}/${path}`,
  title,
  parent: parent ?? ROUTE_LANDING,
  hideInSitemap,
});

// BASIC ROUTES
export const ROUTE_SUPPORT = createRoute(
  "unterstuetzung",
  "Unterstützungsangebote",
);
export const ROUTE_IMPRINT = createRoute("impressum", "Impressum");
export const ROUTE_PRIVACY = createRoute("datenschutz", "Datenschutzerklärung");
export const ROUTE_A11Y = createRoute("barrierefreiheit", "Barrierefreiheit");
export const ROUTE_SITEMAP = createRoute("sitemap", "Sitemap");
export const ROUTE_NUMBERS_FACTS = createRoute(
  "zahlen-und-fakten",
  "Zahlen und Fakten",
);
export const ROUTE_VERSION_HISTORY = createRoute("das-ist-neu", "Das ist neu");

// PRECHECK ROUTES
export const ROUTE_PRECHECK = createRoute(
  "vorpruefung",
  "Vorprüfung: Digitalbezug einschätzen",
);
export const ROUTE_PRECHECK_INFO = createRoute(
  "hinweise",
  "Allgemeine Hinweise zur Vorprüfung",
  ROUTE_PRECHECK,
);
export const ROUTE_PRECHECK_RESULT = createRoute(
  "ergebnis",
  "Ergebnis der Vorprüfung",
  ROUTE_PRECHECK,
);
export const ROUTES_PRECHECK_QUESTIONS = Object.values(preCheckQuestions).map(
  (question) =>
    createRoute(question.id, `${question.title} — Vorprüfung`, ROUTE_PRECHECK),
);

// METHODS ROUTES
export const ROUTE_METHODS = createRoute("methoden", "Regelung erarbeiten");
export const ROUTE_METHODS_RESPONSIBLE_ACTORS = createRoute(
  "zustaendige-akteurinnen-auflisten",
  "Akteure auflisten",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_VISUALIZE = createRoute(
  "visualisieren",
  "Visualisieren",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_VISUALIZE_FLOWCHARTS = createRoute(
  "flussdiagramm",
  "Anleitung Flussdiagramme",
  ROUTE_METHODS_VISUALIZE,
);
export const ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX = createRoute(
  "download/Anleitung_Flussdiagramm_erstellen.pptx",
  "Anleitung Flussdiagramm erstellen",
);
export const ROUTE_METHODS_COLLECT_IT_SYSTEMS = createRoute(
  "it-systeme-erfassen",
  "IT-Systeme erfassen",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_PRINCIPLES = createRoute(
  "fuenf-prinzipien",
  "Fünf Prinzipien",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_TECHNICAL_FEASIBILITY = createRoute(
  "technische-umsetzbarkeit",
  "Technische Umsetzbarkeit sicherstellen",
  ROUTE_METHODS,
);

// DOCUMENTATION ROUTES
export const ROUTE_DOCUMENTATION = createRoute(
  "dokumentation",
  "Dokumentation",
);
export const ROUTE_DOCUMENTATION_NOTES = createRoute(
  "hinweise",
  "Hinweise",
  ROUTE_DOCUMENTATION,
);
export const ROUTE_DOCUMENTATION_TITLE = createRoute(
  "regelungsvorhaben-titel",
  "Regelungsvorhaben Titel",
  ROUTE_DOCUMENTATION,
);
export const ROUTE_DOCUMENTATION_PARTICIPATION = createRoute(
  "beteiligungsformate",
  "Beteiligungsformate",
  ROUTE_DOCUMENTATION,
);
export const ROUTE_DOCUMENTATION_SUMMARY = createRoute(
  "zusammenfassung",
  "Zusammenfassung",
  ROUTE_DOCUMENTATION,
);
export const ROUTE_DOCUMENTATION_SEND = createRoute(
  "absenden",
  "Absenden",
  ROUTE_DOCUMENTATION,
);

export const ROUTES_DOCUMENTATION_INTRO = [
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_DOCUMENTATION_PARTICIPATION,
];

export const ROUTES_DOCUMENTATION_FINALIZE = [
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_SEND,
];

export const ROUTE_DOCUMENTATION_STATIC_WORD = createRoute(
  "download/" + FILE_NAME_DOCUMENTATION_STATIC_WORD,
  "Begleitende Dokumentation als Word-Dokument",
);
export const ROUTE_DOCUMENTATION_TEMPLATE_WORD = createRoute(
  `download/${documentationDocument.filename}`,
  "Vorlage Dokumentation der Digitaltauglichkeit",
  ROUTE_DOCUMENTATION,
);

// INTEROPERABILITY ROUTES
export const ROUTE_INTEROPERABILITY = createRoute(
  "interoperabel",
  "Interoperable Regelungen",
);
export const ROUTE_INTEROPERABILITY_SPOC = createRoute(
  "nationale-kontaktstelle",
  "Nationale Kontaktstelle",
  ROUTE_INTEROPERABILITY,
);

// EXAMPLES ROUTES
export const ROUTE_EXAMPLES = createRoute(
  "beispiele",
  "Beispiele für Digitaltauglichkeit",
);
export const ROUTE_EXAMPLES_PRINCIPLES = createRoute(
  "prinzipien",
  "Die Prinzipien im Regelungstext",
  ROUTE_EXAMPLES,
);
export const ROUTE_EXAMPLES_DIGITAL_COMMUNICATION = createRoute(
  "digitale-angebote-fuer-alle-nutzbar-gestalten",
  "Digitale Angebote",
  ROUTE_EXAMPLES_PRINCIPLES,
  true,
);
export const ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS = createRoute(
  "datenwiederverwendung-benoetigt-einheitliches-recht",
  "Datenwiederverwendung",
  ROUTE_EXAMPLES_PRINCIPLES,
  true,
);
export const ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES = createRoute(
  "etablierte-technologien-ermoeglichen-effiziente-umsetzung",
  "Etablierte Technologien",
  ROUTE_EXAMPLES_PRINCIPLES,
  true,
);
export const ROUTE_EXAMPLES_AUTOMATION = createRoute(
  "automatisierung-basiert-auf-eindeutigen-regelungen",
  "Automatisierung",
  ROUTE_EXAMPLES_PRINCIPLES,
  true,
);
export const ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY =
  createRoute(
    "datenschutz-und-informationssicherheit-schaffen-vertrauen",
    "Datenschutz und Informationssicherheit",
    ROUTE_EXAMPLES_PRINCIPLES,
    true,
  );
export const ROUTE_REGELUNGEN = createRoute(
  "regelungen",
  "Regelungsbeispiel",
  ROUTE_EXAMPLES,
);
export const ROUTE_EXAMPLES_VISUALISATIONS = createRoute(
  "visualisierungen",
  "Beispiele für Visualisierungen",
  ROUTE_EXAMPLES,
  false,
);
export const ROUTE_VISUALISATION = createRoute(
  "visualisierung",
  "Visualisierung",
  ROUTE_EXAMPLES,
);

// FUNDAMENTALS ROUTES
export const ROUTE_FUNDAMENTALS = createRoute("grundlagen", "Grundlagen");

export const ROUTE_FUNDAMENTALS_PRINCIPLES = createRoute(
  "fuenf-prinzipien",
  "Fünf Prinzipien (Grundlagen)",
  ROUTE_FUNDAMENTALS,
  false,
);

export const ROUTE_FUNDAMENTALS_DIGITAL_READINESS = createRoute(
  "digitaltauglichkeit",
  "Digitaltauglichkeit",
  ROUTE_FUNDAMENTALS,
);
export const ROUTE_FUNDAMENTALS_NKR = createRoute(
  "normenkontrollrat",
  "Die Rolle des Nationalen Normenkontrollrats",
  ROUTE_FUNDAMENTALS,
);

export const ROUTE_DOWNLOAD_PRINCIPLE_POSTER = createRoute(
  "download/Prinzipien-Poster.pdf",
  "Prinzipien-Poster",
);

// BACKEND ROUTES
export const ROUTE_HANDLE_CLIENT_SIDE_ERRORS = "/handle-client-side-error";

export const ROUTES: Route[] = [
  ROUTE_LANDING,
  ROUTE_SUPPORT,
  ROUTE_IMPRINT,
  ROUTE_PRIVACY,
  ROUTE_A11Y,
  ROUTE_SITEMAP,
  ROUTE_VERSION_HISTORY,
  ROUTE_PRECHECK,
  ROUTE_PRECHECK_INFO,
  ...ROUTES_PRECHECK_QUESTIONS,
  ROUTE_PRECHECK_RESULT,
  ROUTE_METHODS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_VISUALIZE,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_SPOC,
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
];
