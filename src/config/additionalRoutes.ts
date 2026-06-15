import { beispiele, unterstuetzung } from "@/config/routes";
import { getTabAnchorLink } from "~/utils/tabs";

// ── Anchor-based URL (tab + hash, no dedicated page) ─────────────────────────
export const ROUTE_SUPPORT_TRAININGS =
  unterstuetzung.path + getTabAnchorLink("online-schulungen", "angebote");

// ── Dynamic route base paths (no static page) ─────────────────────────────────
export const ROUTE_REGELUNGEN = beispiele.path + "/regelungen";
