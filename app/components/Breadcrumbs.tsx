import HomeOutlined from "@digitalservicebund/icons/HomeOutlined";
import { Link } from "react-router";
import { ROUTE_LANDING, type Route } from "~/resources/routeDefinitions";

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Route[] }) {
  return breadcrumbs.length ? (
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
      {breadcrumbs.map((breadcrumb, idx, arr) => {
        return (
          <div key={breadcrumb.url}>
            <span className="mx-8">/</span>
            <span>
              {idx === arr.length - 1 ? (
                <span>{breadcrumb.title}</span>
              ) : (
                <Link
                  to={breadcrumb.url}
                  className="text-link increase-tap-area"
                >
                  {breadcrumb.title}
                </Link>
              )}
            </span>
          </div>
        );
      })}
    </nav>
  ) : null;
}
