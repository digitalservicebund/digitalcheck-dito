import {
  ROUTE_DOCUMENTATION,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
} from "../staticRoutes";

export const progress = {
  ariaLabel: "Digitalcheck-Fortschritt",
  items: [
    {
      label: "Vorprüfung",
      labelShort: "Vorprüfung",
      prefix: ROUTE_PRECHECK.url,
    },
    {
      label: "Digitaltauglichkeit erarbeiten",
      labelShort: "Erarbeiten",
      prefix: ROUTE_METHODS.url,
    },
    {
      label: "Dokumentation",
      labelShort: "Dokumentation",
      prefix: ROUTE_DOCUMENTATION.url,
    },
  ],
};
