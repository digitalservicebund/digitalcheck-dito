import { FILE_NAME_DOCUMENTATION_STATIC_WORD } from "../utils/constants";
import { getTabAnchorLink } from "../utils/tabs";
import { removeTrailingSlash } from "../utils/utilFunctions";
import { documentationDocument } from "./content/documentation-document";
import { preCheckQuestions } from "./content/shared/pre-check-questions";

// ⚠️ Routes fully migrated to src/config/routes.ts have been removed.
// Only routes without a static page equivalent remain here.

export type Route = {
  url: string;
  title: string;
  parent?: Route;
  hideInSitemap?: boolean;
};

const createRoute = (
  path: string,
  title: string,
  parent?: Route,
  hideInSitemap?: boolean,
): Route => ({
  url: `${removeTrailingSlash(parent?.url ?? "")}/${path}`,
  title,
  parent,
  hideInSitemap,
});

// Internal: only used as parent references to compute child URLs.
const ROUTE_SUPPORT = createRoute("unterstuetzung", "Unterstützungsangebote");
const ROUTE_PRECHECK = createRoute(
  "vorpruefung",
  "Vorprüfung: Digitalbezug einschätzen",
);
const ROUTE_EXAMPLES = createRoute(
  "beispiele",
  "Beispiele für Digitaltauglichkeit",
);

const ROUTE_DOCUMENTATION = createRoute("dokumentation", "Dokumentation");

// ── Backend endpoint ──────────────────────────────────────────────────────────
export const ROUTE_HANDLE_CLIENT_SIDE_ERRORS = "/handle-client-side-error";

// ── Anchor-based URL (tab + hash, no dedicated page) ─────────────────────────
export const ROUTE_SUPPORT_TRAININGS = createRoute(
  `${getTabAnchorLink("online-schulungen", "angebote")}`,
  "Schulungen",
  ROUTE_SUPPORT,
);

// ── Download / asset links ────────────────────────────────────────────────────
export const ROUTE_DOWNLOAD_PRINCIPLE_POSTER = createRoute(
  "download/Prinzipien-Poster.pdf",
  "Prinzipien-Poster",
);
export const ROUTE_METHODS_TASKS_PROCESSES_POWERPOINT_PPTX = createRoute(
  "download/Anleitung_Flussdiagramm_erstellen.pptx",
  "Anleitung Flussdiagramm erstellen",
);
export const ROUTE_DOCUMENTATION_STATIC_WORD = createRoute(
  "download/" + FILE_NAME_DOCUMENTATION_STATIC_WORD,
  "Begleitende Dokumentation als Word-Dokument",
);
export const ROUTE_DOCUMENTATION_TEMPLATE_WORD = createRoute(
  `download/${documentationDocument.filename}`,
  "Vorlage Dokumentation der Digitaltauglichkeit",
  ROUTE_DOCUMENTATION,
);

// ── Dynamic route base paths (no static page) ─────────────────────────────────
export const ROUTE_REGELUNGEN = createRoute(
  "regelungen",
  "Regelungsbeispiel",
  ROUTE_EXAMPLES,
);
export const ROUTE_VISUALISATION = createRoute(
  "visualisierung",
  "Visualisierung",
  ROUTE_EXAMPLES,
);

// ── Pre-check question pages (generated from content, not static files) ───────
export const ROUTES_PRECHECK_QUESTIONS = Object.values(preCheckQuestions).map(
  (question) =>
    createRoute(question.id, `${question.title} — Vorprüfung`, ROUTE_PRECHECK),
);
