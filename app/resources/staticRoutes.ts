import { getTabAnchorLink } from "../utils/tabs";
import { removeTrailingSlash } from "../utils/utilFunctions";
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

// ── Backend endpoint ──────────────────────────────────────────────────────────
export const ROUTE_HANDLE_CLIENT_SIDE_ERRORS = "/handle-client-side-error";

// ── Anchor-based URL (tab + hash, no dedicated page) ─────────────────────────
export const ROUTE_SUPPORT_TRAININGS = createRoute(
  `${getTabAnchorLink("online-schulungen", "angebote")}`,
  "Schulungen",
  ROUTE_SUPPORT,
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
