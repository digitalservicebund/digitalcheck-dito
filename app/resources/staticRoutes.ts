// These routes can't be exported from ~/routes.ts as that file isn't part of the app environment: https://github.com/remix-run/react-router/issues/12392

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

const createRoute = (
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
export const ROUTE_VERSION_HISTORY = createRoute(
  "versionsverlauf",
  "Versionsverlauf",
);

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

// METHODS ROUTES
export const ROUTE_METHODS = createRoute("methoden", "Regelung erarbeiten");
export const ROUTE_METHODS_RESPONSIBLE_ACTORS = createRoute(
  "zustaendige-akteurinnen-auflisten",
  "Akteure auflisten",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_TASKS_PROCESSES = createRoute(
  "ablaeufe-aufgaben-erfassen",
  "Abläufe erfassen",
  ROUTE_METHODS,
);
export const ROUTE_METHODS_FLOWCHARTS = createRoute(
  "flussdiagramm",
  "Anleitung Flussdiagramme",
  ROUTE_METHODS,
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
// NOTE: 70-tage replace pdf with word document
export const ROUTE_DOCUMENTATION_STATIC_PDF = createRoute(
  "download/prototyp_documentation_dummy_result.pdf",
  "Begleitende Dokumentation als Word-Dokument",
);
export const ROUTE_DOCUMENTATION_STATIC_WORD = createRoute(
  "download/" + FILE_NAME_DOCUMENTATION_STATIC_WORD,
  "Begleitende Dokumentation als Word-Dokument",
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

// PROTOTYPE DOCUMENTATION ROUTES
export const ROUTE_PROTOTYPE = createRoute("prototyp", "Prototyp");

export const ROUTE_PROTOTYPE_DOCUMENTATION = createRoute(
  "dokumentation",
  "Dokumentation - Prototyp",
  ROUTE_PROTOTYPE,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME = createRoute(
  "start-oder-fortsetzen",
  "Dokumentation starten oder fortsetzen - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_META = createRoute(
  "meta",
  "Informationen zum Regelungsvorhaben - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION = createRoute(
  "beteiligung",
  "Praxistaugliche Umsetzung - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1 = createRoute(
  "prinzip-1",
  "Prinzip: Digitale Angebote - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2 = createRoute(
  "prinzip-2",
  "Prinzip: Datenwiederverwendung - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_3 = createRoute(
  "prinzip-3",
  "Prinzip: Etablierte Technologien - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4 = createRoute(
  "prinzip-4",
  "Prinzip: Automatisierung - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5 = createRoute(
  "prinzip-5",
  "Prinzip: Datenschutz und Informationssicherheit - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_RESULT = createRoute(
  "ergebnis",
  "Dokumentation abschließen - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE = createRoute(
  "zwischenstand-speichern",
  "Später weiterarbeiten - Prototyp",
  ROUTE_PROTOTYPE_DOCUMENTATION,
);

export const ROUTE_DOWNLOAD_PRINCIPLE_POSTER = createRoute(
  "download/Prinzipien-Poster.pdf",
  "Prinzipien-Poster",
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF = createRoute(
  "download/prototyp_documentation_dummy_result.pdf",
  "Ihre Digitalcheck-Dokumentation als PDF-Datei",
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD = createRoute(
  "download/digitalcheck-dokumentation-04-07-2025-prototyp.docx",
  "Ihre Digitalcheck-Dokumentation als Word-Datei",
);
export const ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_JSON = createRoute(
  "download/digitalcheck-vorpruefung-zwischenstand.json",
  "Ihre Digitalcheck-Dokumentation als JSON-Datei",
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
  ...Object.values(preCheckQuestions).map((question) =>
    createRoute(question.id, question.title, ROUTE_PRECHECK),
  ),
  ROUTE_PRECHECK_RESULT,
  ROUTE_METHODS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTE_DOCUMENTATION,
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
