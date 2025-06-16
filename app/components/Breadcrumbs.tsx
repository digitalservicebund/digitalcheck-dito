import HomeOutlined from "@digitalservicebund/icons/HomeOutlined";
import { Link, useMatches } from "react-router";
import { ROUTE_LANDING, ROUTES } from "~/resources/staticRoutes";
import { matchHasHandle } from "~/utils/handles";
import { removeTrailingSlash } from "~/utils/utilFunctions";

export default function Breadcrumbs() {
  const matchesWithoutLanding = useMatches().slice(1);

  const breadcrumbs = matchesWithoutLanding.map((match) => {
    // Use a handle if it exists in the route
    if (matchHasHandle(match) && match.handle.breadcrumb) {
      return match.handle.breadcrumb(match);
    }
    // Otherwise find the route that match the current path, removing trailing slashes
    return ROUTES.find((r) => r.url === removeTrailingSlash(match.pathname));
  });

  // Remove duplicate URLs that come from parent + parent._index routes and filter undefined
  const uniqueBreadcrumbs = Array.from(new Set(breadcrumbs)).filter(
    (route) => route !== undefined,
  );

  return uniqueBreadcrumbs.length ? (
    <nav
      className="flex flex-wrap items-center bg-blue-100 px-16 py-8 text-base print:hidden"
      data-testid="breadcrumbs-menu"
      aria-label="breadcrumb navigation"
    >
      <Link to={ROUTE_LANDING.url} className="fill-blue-800 outline-blue-800">
        <HomeOutlined />
        <span className="sr-only">{ROUTE_LANDING.title}</span>
      </Link>
      {uniqueBreadcrumbs.map((breadcrumb, idx, arr) => (
        <div key={breadcrumb.url}>
          <span className="mx-8">/</span>
          <span>
            {idx === arr.length - 1 ? (
              <span>{breadcrumb.extraBreadcrumbTitle ?? breadcrumb.title}</span>
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
