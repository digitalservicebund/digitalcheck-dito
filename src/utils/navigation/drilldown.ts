import type { Route } from "@/config/routes";
import {
  getRouteByPath,
  getRouteChain,
  getRouteLabel,
  getVisibleChildren,
  hasVisibleChildren,
  isRouteVisible,
} from "./routeUtils";

export type DrilldownEntry = {
  path: string;
  label: string;
  eyebrow?: string;
  isVisible: boolean;
  panelId: string | null;
};

export type DrilldownPanel = {
  id: string;
  depth: number;
  parent: { id: string; label: string } | null;
  sectionRoute: DrilldownEntry | null;
  items: DrilldownEntry[];
};

export type DrilldownNavigationData = {
  currentPath: string;
  activePanel: DrilldownPanel;
  panels: DrilldownPanel[];
};

const MOBILE_ROOT_PANEL_ID = "root";
const MOBILE_ROOT_PARENT = { id: MOBILE_ROOT_PANEL_ID, label: "Hauptmenü" };
// Only the header routes and their direct children are shown, deeper routes are not drilled into
const MAX_PANEL_DEPTH = 1;

export function getMobileMenuNavigation(
  currentPath: string,
  headerRoutes: Route[],
): DrilldownNavigationData {
  const rootPanel: DrilldownPanel = {
    id: MOBILE_ROOT_PANEL_ID,
    depth: 0,
    parent: null,
    sectionRoute: null,
    items: headerRoutes.map((route) => toDrilldownEntry(route, 1)),
  };

  const childPanels = headerRoutes.flatMap((route) =>
    collectPanels(route, 1, MOBILE_ROOT_PARENT),
  );

  const panels = [rootPanel, ...childPanels];

  return {
    currentPath,
    activePanel: findActivePanel(currentPath, panels) ?? rootPanel,
    panels,
  };
}

function collectPanels(
  route: Route,
  depth: number,
  syntheticParent: DrilldownPanel["parent"] = null,
): DrilldownPanel[] {
  if (depth > MAX_PANEL_DEPTH) return [];
  const childRoutes = getVisibleChildren(route);
  if (childRoutes.length === 0) return [];

  const panel: DrilldownPanel = {
    id: route.key,
    depth,
    parent: route.parent
      ? { id: route.parent.key, label: getRouteLabel(route.parent) }
      : syntheticParent,
    sectionRoute: {
      ...toDrilldownEntry(route, depth),
      panelId: null,
    },
    items: childRoutes.map((child) => toDrilldownEntry(child, depth + 1)),
  };

  return [
    panel,
    ...childRoutes.flatMap((child) => collectPanels(child, depth + 1)),
  ];
}

function findActivePanel(
  currentPath: string,
  panels: DrilldownPanel[],
): DrilldownPanel | null {
  const currentRoute = getRouteByPath(currentPath);
  if (!currentRoute) return null;
  const chain = getRouteChain(currentRoute).toReversed();
  for (const route of chain) {
    const panel = panels.find((p) => p.id === route.key);
    if (panel) return panel;
  }
  return null;
}

const toDrilldownEntry = (
  route: Route,
  panelDepth: number,
): DrilldownEntry => ({
  path: route.path,
  label: getRouteLabel(route),
  eyebrow: route.navEyebrow,
  isVisible: isRouteVisible(route),
  panelId:
    panelDepth <= MAX_PANEL_DEPTH && hasVisibleChildren(route)
      ? route.key
      : null,
});
