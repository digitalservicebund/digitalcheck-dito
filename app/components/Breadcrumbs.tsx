import HomeOutlined from "@digitalservicebund/icons/HomeOutlined";
import { Link, useMatches, type UIMatch } from "react-router";
import {
  ROUTE_LANDING,
  ROUTES,
  type Route,
} from "~/resources/routeDefinitions";

type Breadcrumb = (match: UIMatch) => Route;

export default function Breadcrumbs() {
  const matchesWithoutLanding = useMatches().slice(1);
  console.log(matchesWithoutLanding);
  const breadcrumbs = matchesWithoutLanding.map((match) => {
    // Use a handle if it exists in the route
    if (
      match.handle &&
      typeof match.handle === "object" &&
      "breadcrumb" in match.handle &&
      typeof match.handle.breadcrumb === "function"
    ) {
      return (match.handle.breadcrumb as Breadcrumb)(match);
    }
    // Otherwise find the route that match the current path, removing trailing slashes
    return ROUTES.find((r) => r.url === match.pathname.replace(/\/$/, ""));
  });

  const uniqueBreadcrumbs = breadcrumbs
    .filter((route) => route !== undefined)
    .filter(
      // Remove duplicate URLs that come from parent + _index routes
      (breadcrumb, index, self) =>
        index === self.findIndex((t) => t?.url === breadcrumb?.url),
    );

  return uniqueBreadcrumbs.length ? (
    <nav
      className="flex flex-wrap items-center bg-blue-100 px-16 py-8 text-base print:hidden"
      data-testid="breadcrumbs-menu"
      aria-label="breadcrumb navigation"
    >
      <Link
        to={ROUTE_LANDING.url}
        className="ds-link-01-bold fill-blue-800 outline-blue-800"
      >
        <HomeOutlined />
        <span className="sr-only">{ROUTE_LANDING.title}</span>
      </Link>
      {uniqueBreadcrumbs.map((breadcrumb, idx, arr) => (
        <div key={breadcrumb.url}>
          <span className="mx-8">/</span>
          <span>
            {idx === arr.length - 1 ? (
              <span>{breadcrumb.title}</span>
            ) : (
              <Link to={breadcrumb.url} className="text-link increase-tap-area">
                {breadcrumb.title}
              </Link>
            )}
          </span>
        </div>
      ))}
    </nav>
  ) : null;
}
