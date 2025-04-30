import { UIMatch } from "react-router";
import { type Route } from "~/resources/staticRoutes";

type Breadcrumb = (match: UIMatch) => Route;
export type MatchWithHandle = UIMatch & {
  handle: {
    hideBreadcrumbs?: boolean;
    breadcrumb?: Breadcrumb;
    hasProgressBar?: boolean;
  };
};

export const matchHasHandle = (match: UIMatch): match is MatchWithHandle =>
  Boolean(match.handle && typeof match.handle === "object");
