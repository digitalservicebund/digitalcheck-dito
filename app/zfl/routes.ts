export const ROUTE_ZFL_LANDING = {
  url: "/zfl",
  title: "Zentrum für Legistik",
};

const createRoute = (path: string, title: string) => ({
  path,
  title,
  href: `${ROUTE_ZFL_LANDING.url}/${path}`,
});

export const ROUTE_ZFL_TASK_FORCES = createRoute("task-forces", "Task Forces");
export const ROUTE_ZFL_TRAININGS = createRoute("schulungen", "Schulungen");
export const ROUTE_ZFL_IMPRINT = createRoute("impressum", "Impressum");
export const ROUTE_ZFL_PRIVACY = createRoute("privacy", "Datenschutzerklärung");
export const ROUTE_ZFL_A11Y = createRoute("a11y", "Barrierefreiheit");

export default [
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_TASK_FORCES,
  ROUTE_ZFL_TRAININGS,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_A11Y,
];
