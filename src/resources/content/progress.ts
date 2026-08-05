import { dokumentation, methoden, vorpruefung } from "@/config/routes";

export const progress = {
  ariaLabel: "Digitalcheck-Fortschritt",
  items: [
    {
      label: "Vorprüfung",
      labelShort: "Vorprüfung",
      prefix: vorpruefung.path,
    },
    {
      label: "Digitaltauglichkeit erarbeiten",
      labelShort: "Erarbeiten",
      prefix: methoden.path,
    },
    {
      label: "Dokumentation",
      labelShort: "Dokumentation",
      prefix: dokumentation.path,
    },
  ],
};
