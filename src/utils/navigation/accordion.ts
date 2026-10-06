import type { Route } from "@/config/routes";
import { getRouteLabel, getVisibleChildren } from "./routeUtils";

export type AccordeonNavigationEntry = {
  path: string;
  label: string;
  children: AccordeonNavigationEntry[];
  isCurrent: boolean;
  isInCurrentBranch: boolean;
};

function isPathMatchOrDescendant(path: string, activePath: string) {
  return activePath === path || activePath.startsWith(`${path}/`);
}

function buildEntry(
  route: Route,
  currentPath: string,
): AccordeonNavigationEntry {
  const children = getVisibleChildren(route).map((child) =>
    buildEntry(child, currentPath),
  );
  const isCurrent = currentPath === route.path;
  const isInCurrentBranch =
    isPathMatchOrDescendant(route.path, currentPath) ||
    children.some((child) => child.isInCurrentBranch);

  return {
    path: route.path,
    label: getRouteLabel(route),
    children,
    isCurrent,
    isInCurrentBranch,
  };
}

export function buildAccordeonEntries(
  sectionRoot: Route,
  currentPath: string,
): AccordeonNavigationEntry[] {
  return [buildEntry(sectionRoot, currentPath)];
}
