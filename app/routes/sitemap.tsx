import { ReactNode } from "react";
import { type MetaArgs, useLoaderData } from "react-router";

import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { ROUTE_SITEMAP, ROUTES } from "~/resources/routeDefinitions";
import prependMetaTitle from "~/utils/metaTitle";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_SITEMAP.title, matches);
};

export const handle = {
  breadcrumb: () => ROUTE_SITEMAP,
};

interface Route {
  url: string;
  title: string;
  parent?: string;
  children?: Route[];
}

const groupRoutesByParent = (routes: Route[]): Route[] => {
  const routeMap = new Map<string, Route>();

  routes.forEach((route) => {
    routeMap.set(route.url, { ...route, children: [] });
  });

  routes.forEach((route) => {
    if (route.parent) {
      const parentRoute = routeMap.get(route.parent);
      if (parentRoute) {
        parentRoute.children?.push(routeMap.get(route.url)!);
      }
    }
  });

  return Array.from(routeMap.values()).filter((route) => !route.parent);
};

export const loader = () => {
  return groupRoutesByParent(ROUTES);
};

export default function Sitemap(): ReactNode {
  const urls = useLoaderData<typeof loader>();

  const renderRoutes = (routes: Route[]): ReactNode => (
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
      <Container>{renderRoutes(urls)}</Container>
    </>
  );
}
