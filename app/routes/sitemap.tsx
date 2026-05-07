import type { ReactNode } from "react";
import { useLoaderData } from "react-router";

import type { Route as ConfigRoute } from "@/config/routes";
import { allRoutes, sitemap } from "@/config/routes";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";

type RouteWithChildren = ConfigRoute & {
  children: RouteWithChildren[];
};

const groupRoutesByParent = (
  routes: readonly ConfigRoute[],
): RouteWithChildren[] => {
  const routeMap = new Map<string, RouteWithChildren>(
    routes.map((route) => [route.path, { ...route, children: [] }]),
  );

  routes.forEach((route) => {
    if (!route.sitemap) return;
    const parentRoute = routeMap.get(route.parent?.path ?? "");
    if (parentRoute) {
      parentRoute.children.push(routeMap.get(route.path)!);
    }
  });

  return Array.from(routeMap.values()).filter((route) => !route.parent);
};

export const loader = () => {
  return groupRoutesByParent(allRoutes);
};

export default function Sitemap(): ReactNode {
  const routes = useLoaderData<typeof loader>();

  const renderRoutes = (routes: RouteWithChildren[]): ReactNode => (
    // [&_li>ul] styles the nested ul elements
    <ul className="list-unstyled [&_li>ul]:ml-8 [&_li>ul]:border-l [&_li>ul]:border-gray-400 [&_li>ul]:pl-8">
      {routes.map((route) => (
        <li key={route.path} className="mb-4 [&_li]:my-8">
          <a href={route.path} className="text-link hover:underline">
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
      <MetaTitle prefix={sitemap.title} />
      <main>
        <Hero title="Sitemap" />
        <ContentWrapper>{renderRoutes(routes)}</ContentWrapper>
      </main>
    </>
  );
}
