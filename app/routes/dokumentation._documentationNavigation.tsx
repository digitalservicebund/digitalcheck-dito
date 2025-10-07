import { Outlet, useLocation, useOutletContext } from "react-router";
import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import { features } from "~/resources/features";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_ORDERED,
  ROUTES_DOCUMENTATION_ORDERED_NAV,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";

function findIndexForRoute(currentUrl: string) {
  const index = ROUTES_DOCUMENTATION_ORDERED.findIndex(
    (route) => route.url === currentUrl,
  );
  if (index === -1) {
    throw new Error(`Could not find route with url ${currentUrl}`);
  }
  return index;
}

function getPreviousRoute(currentUrl: string): Route {
  return findIndexForRoute(currentUrl) > 0
    ? ROUTES_DOCUMENTATION_ORDERED[findIndexForRoute(currentUrl) - 1]
    : ROUTE_DOCUMENTATION;
}

function getNextRoute(currentUrl: string): Route | null {
  return findIndexForRoute(currentUrl) < ROUTES_DOCUMENTATION_ORDERED.length - 1
    ? ROUTES_DOCUMENTATION_ORDERED[findIndexForRoute(currentUrl) + 1]
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

  const getNavItem = (route: Route) => (
    <Nav.Item key={route.url} url={route.url}>
      {route.title}
    </Nav.Item>
  );

  return (
    <div className="parent-bg-blue my-80 flex justify-center bg-blue-100">
      <div className="hidden flex-none pl-32 lg:block">
        <Nav
          activeElementUrl={currentUrl}
          ariaLabel={digitalDocumentation.navigation.ariaLabel}
        >
          <Nav.Items>
            {ROUTES_DOCUMENTATION_ORDERED_NAV.map((route) => {
              if (Array.isArray(route))
                return (
                  <Nav.Item
                    key={`${route[0].url}-subItems`}
                    subItems={<Nav.Items>{route.map(getNavItem)}</Nav.Items>}
                  >
                    {digitalDocumentation.navigation.principles}
                  </Nav.Item>
                );
              return getNavItem(route);
            })}
          </Nav.Items>
        </Nav>
      </div>
      <section className="w-[51rem]">
        <Container className="pt-0 lg:hidden">
          <Stepper
            currentElementUrl={currentUrl}
            elements={ROUTES_DOCUMENTATION_ORDERED}
          />
        </Container>
        <Container className="space-y-80 pt-0">
          <Outlet context={useOutletContext()} />
          <ButtonContainer>
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
