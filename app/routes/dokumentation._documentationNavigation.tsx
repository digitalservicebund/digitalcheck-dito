import { Outlet, useLocation, useOutletContext } from "react-router";
import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { general } from "~/resources/content/shared/general";
import { features } from "~/resources/features";
import {
  type Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INFO,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_ORDERED,
  ROUTES_DOCUMENTATION_PRINCIPLES,
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

  return (
    <div className="parent-bg-blue flex justify-center bg-blue-100 pt-32">
      <div className="hidden flex-none pl-32 lg:block">
        <Nav
          activeElementUrl={currentUrl}
          ariaLabel="Alle Fragen"
          completedElementUrls={[]} // TODO: to be filled
        >
          <Nav.Items>
            <Nav.Item url={ROUTE_DOCUMENTATION_INFO.url}>
              {ROUTE_DOCUMENTATION_INFO.title}
            </Nav.Item>
            <Nav.Item url={ROUTE_DOCUMENTATION_PARTICIPATION.url}>
              {ROUTE_DOCUMENTATION_PARTICIPATION.title}
            </Nav.Item>
            <Nav.Item
              subItems={
                <Nav.Items>
                  {ROUTES_DOCUMENTATION_PRINCIPLES.map((route) => (
                    <Nav.Item key={route.url} url={route.url}>
                      {route.title}
                    </Nav.Item>
                  ))}
                </Nav.Items>
              }
            >
              Prinzip
            </Nav.Item>
            <Nav.Item url={ROUTE_DOCUMENTATION_SUMMARY.url}>
              {ROUTE_DOCUMENTATION_SUMMARY.title}
            </Nav.Item>
            <Nav.Item url={ROUTE_DOCUMENTATION_SEND.url}>
              {ROUTE_DOCUMENTATION_SEND.title}
            </Nav.Item>
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
