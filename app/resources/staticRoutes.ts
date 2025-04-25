// These routes can't be exported from ~/routes.ts as that file isn't part of the app environment: https://github.com/remix-run/react-router/issues/12392

import { preCheckQuestions } from "./content/shared/preCheckQuestions";

export type Route = {
  url: string;
  title: string;
  parent?: Route;
};

// LANDING ROUTE AS ROOT
export const ROUTE_LANDING = {
  url: "/",
  title: "Startseite",
};

const createRoute = (path: string, title: string, parent?: Route): Route => ({
  url: `${parent?.url ?? ""}/${path}`,
  title,
  parent: parent ?? ROUTE_LANDING,
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

// PRECHECK ROUTES
export const ROUTE_PRECHECK = createRoute(
  "vorpruefung",
  "Vorprüfung: Digitalbezug einschätzen",
);
export const ROUTE_PRECHECK_INFO = createRoute(
  "hinweise",
  "Allgemeine Hinweise",
  ROUTE_PRECHECK,
);
export const ROUTE_PRECHECK_RESULT = createRoute(
  "ergebnis",
  "Ergebnis",
  ROUTE_PRECHECK,
);
export const ROUTE_RESULT_PDF = createRoute(
  "digitalcheck-vorpruefung.pdf",
  "Vorprüfung als PDF",
  ROUTE_PRECHECK_RESULT,
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
export const ROUTE_DOCUMENTATION_STATIC_PDF = createRoute(
  "download/digitalcheck-begleitende-dokumentation.pdf",
  "Begleitende Dokumentation als PDF",
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
  "Prinzipien",
  ROUTE_EXAMPLES,
);
export const ROUTE_EXAMPLES_DIGITAL_COMMUNICATION = createRoute(
  "digitale-kommunikation-sicherstellen",
  "Prinzip 1 in Regelungstexten",
  ROUTE_EXAMPLES_PRINCIPLES,
);
export const ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS = createRoute(
  "wiederverwendung-von-daten-und-standards-ermoeglichen",
  "Prinzip 2 in Regelungstexten",
  ROUTE_EXAMPLES_PRINCIPLES,
);
export const ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY =
  createRoute(
    "datenschutz-und-informationssicherheit-gewaehrleisten",
    "Prinzip 3 in Regelungstexten",
    ROUTE_EXAMPLES_PRINCIPLES,
  );
export const ROUTE_EXAMPLES_CLEAR_REGULATIONS = createRoute(
  "klare-regelungen-fuer-eine-digitale-ausfuehrung-finden",
  "Prinzip 4 in Regelungstexten",
  ROUTE_EXAMPLES_PRINCIPLES,
);
export const ROUTE_EXAMPLES_AUTOMATION = createRoute(
  "automatisierung-ermoeglichen",
  "Prinzip 5 in Regelungstexten",
  ROUTE_EXAMPLES_PRINCIPLES,
);
export const ROUTE_REGELUNGEN = createRoute(
  "regelungen",
  "Gesetze",
  ROUTE_EXAMPLES,
);
export const ROUTE_EXAMPLES_VISUALISATIONS = createRoute(
  "visualisierungen",
  "Visualisierungen",
  ROUTE_EXAMPLES,
);
export const ROUTE_VISUALISATION = createRoute(
  "visualisierung",
  "Visualisierung",
  ROUTE_EXAMPLES,
);

// FUNDAMENTALS ROUTES
export const ROUTE_FUNDAMENTALS = createRoute(
  "grundlagen",
  "Grundlagen",
  ROUTE_LANDING,
);

export const ROUTE_FUNDAMENTALS_PRINCIPLES = createRoute(
  "fuenf-prinzipien",
  "Prinzipien",
  ROUTE_FUNDAMENTALS,
);

export const ROUTE_FUNDAMENTALS_METHODS = createRoute(
  "methoden",
  "Methoden",
  ROUTE_FUNDAMENTALS,
);

export const ROUTES: Route[] = [
  ROUTE_LANDING,
  ROUTE_SUPPORT,
  ROUTE_IMPRINT,
  ROUTE_PRIVACY,
  ROUTE_A11Y,
  ROUTE_SITEMAP,
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
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_CLEAR_REGULATIONS,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_FUNDAMENTALS_METHODS,
];
