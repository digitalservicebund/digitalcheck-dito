import { ReactNode } from "react";
import { useLoaderData } from "react-router";

import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { Route, ROUTE_SITEMAP, ROUTES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_SITEMAP.title);
}

type RouteWithChildren = Route & {
  children: RouteWithChildren[];
};

const groupRoutesByParent = (routes: Route[]): RouteWithChildren[] => {
  const routeMap = new Map<string, RouteWithChildren>(
    routes.map((route) => [route.url, { ...route, children: [] }]),
  );

  routes.forEach((route) => {
    const parentRoute = routeMap.get(route.parent?.url ?? "");
    if (parentRoute) {
      parentRoute.children.push(routeMap.get(route.url)!);
    }
  });

  return Array.from(routeMap.values()).filter((route) => !route.parent);
};

export const loader = () => {
  return groupRoutesByParent(ROUTES);
};

export default function Sitemap(): ReactNode {
  const routes = useLoaderData<typeof loader>();

  const renderRoutes = (routes: RouteWithChildren[]): ReactNode => (
    // [&_li>ul] styles the nested ul elements
    <ul className="list-unstyled [&_li>ul]:ml-8 [&_li>ul]:border-l [&_li>ul]:border-gray-400 [&_li>ul]:pl-8">
      {routes.map((route) => (
        <li key={route.url} className="mb-4 [&_li]:my-8">
          <a href={route.url} className="text-link hover:underline">
            {route.title}
          </a>
          {route.children &&
            route.children.length > 0 &&
            renderRoutes(route.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: "Sitemap",
            }}
          />
        </Container>
      </Background>
      <Container>{renderRoutes(routes)}</Container>
    </>
  );
}
