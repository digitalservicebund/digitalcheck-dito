export const ROUTE_ZFL_LANDING = {
  path: "zfl",
  title: "Zentrum für Legistik",
  href: "/zfl",
};

const createRoute = (path: string, title: string) => ({
  path,
  title,
  href: `${ROUTE_ZFL_LANDING.href}/${path}`,
});

export const ROUTE_ZFL_INVOLVEMENTS = createRoute(
  "beteiligungen",
  "Beteiligungen",
);
export const ROUTE_ZFL_TRAININGS = createRoute("schulungen", "Schulungen");
export const ROUTE_ZFL_IMPRINT = createRoute("impressum", "Impressum");
export const ROUTE_ZFL_PRIVACY = createRoute("privacy", "Datenschutzerklärung");
export const ROUTE_ZFL_A11Y = createRoute("a11y", "Barrierefreiheit");

export default [
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_INVOLVEMENTS,
  ROUTE_ZFL_TRAININGS,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_A11Y,
];
