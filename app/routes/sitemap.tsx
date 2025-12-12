import { ReactNode } from "react";
import { useLoaderData } from "react-router";

import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import { Route, ROUTE_SITEMAP, ROUTES } from "~/resources/staticRoutes";

type RouteWithChildren = Route & {
  children: RouteWithChildren[];
};

const groupRoutesByParent = (routes: Route[]): RouteWithChildren[] => {
  const routeMap = new Map<string, RouteWithChildren>(
    routes.map((route) => [route.url, { ...route, children: [] }]),
  );

  routes.forEach((route) => {
    if (route.hideInSitemap) return;
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
      <MetaTitle prefix={ROUTE_SITEMAP.title} />
      <main>
        <Hero title="Sitemap" />
        <ContentWrapper>{renderRoutes(routes)}</ContentWrapper>
      </main>
    </>
  );
}
