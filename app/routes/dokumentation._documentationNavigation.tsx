import Check from "@digitalservicebund/icons/Check";
import { useId } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router";
import { twJoin } from "tailwind-merge";
import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Stepper from "~/components/Stepper";
import { general } from "~/resources/content/shared/general";
import { features } from "~/resources/features";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_PRINCIPLES,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import customTwMerge from "~/utils/tailwindMerge";

const routes = [
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ...ROUTES_DOCUMENTATION_PRINCIPLES,
  ROUTE_DOCUMENTATION_SUMMARY,
];

function findIndexForRoute(currentUrl: string) {
  const index = routes.findIndex((route) => route.url === currentUrl);
  if (index === -1) {
    throw new Error(`Could not find route with url ${currentUrl}`);
  }
  return index;
}

function getPreviousRoute(currentUrl: string): Route {
  return findIndexForRoute(currentUrl) > 0
    ? routes[findIndexForRoute(currentUrl) - 1]
    : ROUTE_DOCUMENTATION;
}

function getNextRoute(currentUrl: string): Route | null {
  return findIndexForRoute(currentUrl) < routes.length - 1
    ? routes[findIndexForRoute(currentUrl) + 1]
    : null;
}

export default function LayoutWithDocumentationNavigation() {
  const location = useLocation();
  const currentUrl = location.pathname;

  const enableDigitalDocumentation = useFeatureFlag(
    features.enableDigitalDocumentation,
  );

  if (!enableDigitalDocumentation) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  const nextRoute = getNextRoute(currentUrl);

  return (
    <div className="parent-bg-blue flex justify-center bg-blue-100 pt-32">
      <div className="hidden flex-none pl-32 lg:block">
        <DocumentationNavigation routes={routes} currentRouteUrl={currentUrl} />
      </div>
      <section className="w-[51rem]">
        <Container className="pt-0 lg:hidden">
          <Stepper currentElementUrl={currentUrl} elements={routes} />
        </Container>
        <Container className="pt-0">
          <Outlet context={useOutletContext()} />
          <ButtonContainer className="pt-40">
            {nextRoute && (
              <Button href={nextRoute.url}>{general.buttonNext.text}</Button>
            )}
            <Button href={getPreviousRoute(currentUrl).url} look="tertiary">
              {general.buttonBack.text}
            </Button>
          </ButtonContainer>
        </Container>
      </section>
    </div>
  );
}

function DocumentationNavigation({
  routes,
  currentRouteUrl,
}: {
  routes: Route[];
  currentRouteUrl: string;
}) {
  return (
    <nav aria-label="Alle Fragen">
      <ul className="list-unstyled">
        {routes.map((route: Route) => {
          const isCurrent = route.url === currentRouteUrl;
          return (
            <NavItem
              key={route.url}
              url={route.url}
              label={route.title}
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
