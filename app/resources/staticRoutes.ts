import { beispiele, unterstuetzung } from "@/config/routes";
import { getTabAnchorLink } from "../utils/tabs";

// ⚠️ Routes fully migrated to src/config/routes.ts or src/config/downloads.ts have been removed.
// Only path constants without a static page or download equivalent remain here.

// ── Backend endpoint ──────────────────────────────────────────────────────────
export const ROUTE_HANDLE_CLIENT_SIDE_ERRORS = "/handle-client-side-error";

// ── Anchor-based URL (tab + hash, no dedicated page) ─────────────────────────
export const ROUTE_SUPPORT_TRAININGS =
  unterstuetzung.path + getTabAnchorLink("online-schulungen", "angebote");

// ── Dynamic route base paths (no static page) ─────────────────────────────────
export const ROUTE_REGELUNGEN = beispiele.path + "/regelungen";
