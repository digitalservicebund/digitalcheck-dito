import { Outlet, useLocation, useOutletContext } from "react-router";
import Container from "~/components/Container";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { features } from "~/resources/features.ts";
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
import useFeatureFlag from "~/utils/featureFlags.ts";

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
  const prototypeAlternativeEnabled = useFeatureFlag(
    features.enableDocumentationPrototypeAlternative,
  );
  const filteredRoutes = prototypeAlternativeEnabled
    ? routes.filter(
        (route) =>
          route.title !== ROUTE_PROTOTYPE_DOCUMENTATION_START_RESUME.title,
      )
    : routes;

  return (
    <div className="parent-bg-blue flex justify-center bg-blue-100 pt-32">
      <div className="hidden flex-none pl-32 lg:block">
        <Nav ariaLabel="Alle Fragen" activeElementUrl={location.pathname}>
          <Nav.Items>
            {filteredRoutes.map((route: Route) => (
              <Nav.Item key={route.url} url={route.url}>
                {route.title}
              </Nav.Item>
            ))}
          </Nav.Items>
        </Nav>
      </div>
      <section className="w-[51rem]">
        <Container className="pt-0 lg:hidden">
          <Stepper
            currentElementUrl={location.pathname}
            elements={filteredRoutes}
          />
        </Container>
        <Outlet context={useOutletContext()} />
      </section>
    </div>
  );
}
