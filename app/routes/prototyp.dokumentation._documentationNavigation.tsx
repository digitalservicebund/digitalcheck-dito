import Check from "@digitalservicebund/icons/Check";
import { useId } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import Container from "~/components/Container";
import LinkBar from "~/components/LinkBar";
import {
  type Route,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_3,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5,
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
} from "~/resources/staticRoutes";
import customTwMerge from "~/utils/tailwindMerge";

const routes = [
  ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_PARTICIPATION,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_1,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_2,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_3,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_4,
  ROUTE_PROTOTYPE_DOCUMENTATION_PRINCIPLE_5,
];

export default function LayoutWithDocumentationNavigation() {
  const location = useLocation();

  return (
    <div className="parent-bg-blue flex justify-center bg-blue-100 pt-32">
      <div className="hidden flex-none pl-32 lg:block">
        <DocumentationNavigation />
      </div>
      <section className="w-[51rem]">
        <Container className="pt-0 lg:hidden">
          <LinkBar currentElementUrl={location.pathname} elements={routes} />
        </Container>
        <Outlet />
      </section>
    </div>
  );
}

function DocumentationNavigation() {
  const location = useLocation();

  return (
    <nav aria-label="Alle Fragen">
      <ul className="list-unstyled">
        {routes.map((route: Route) => {
          const isCurrent = route.url === location.pathname;
          return (
            <NavItem
              key={route.url}
              url={route.url}
              label={route.title.replace(" - Prototyp", "")}
              isCurrent={isCurrent}
              isDone={false}
              isDisabled={false}
            />
          );
        })}
      </ul>
    </nav>
  );
}

export type NavItem = {
  url: string;
  label: string;
  isDisabled: boolean;
  isCurrent: boolean;
  isDone: boolean;
};

function NavItem({
  url,
  label,
  isDisabled,
  isCurrent,
  isDone,
}: Readonly<NavItem>) {
  const liClassNames = twJoin(
    "border-b-[1px] border-b-white border-l-[4px]",
    isCurrent ? "border-l-blue-800 pointer-events-none" : "border-l-blue-100",
    isDisabled && "text-gray-800 pointer-events-none",
  );

  // Transparent left borders to avoid layout shifts
  const itemClassNames = customTwMerge(
    "bg-blue-100 w-full ds-label-02-reg p-16 flex gap-x-4 items-center hover:underline hover:bg-blue-300 active:bg-white focus-visible:shadow-[inset_0px_0px_0px_4px] focus:shadow-blue-800",
    isCurrent && "ds-label-02-bold bg-blue-400",
  );
  const iconId = useId();

  return (
    <li className={liClassNames}>
      <Link
        to={url}
        className={itemClassNames}
        aria-disabled={isDisabled || isCurrent}
        aria-current={isCurrent}
        aria-describedby={iconId}
      >
        {isDone && <Check id={iconId} className="shrink-0" />}
        <span
          title={label}
          className="after:ds-label-02-bold after:invisible after:block after:h-0 after:content-[attr(title)]" // Prevent shifting on navigation
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
