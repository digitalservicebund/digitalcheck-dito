import { dedent } from "~/utils/dedentMultilineStrings";
import {
  ROUTE_FUNDAMENTALS_METHODS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_PRECHECK,
} from "../staticRoutes";

export const hinweis = {
  title: "Hinweis zur Aktualisierung unserer Inhalte",
  items: [
    {
      content: dedent`
      Wir überarbeiten derzeit unsere Inhalte, um Sie im Digitalcheck-Prozess noch besser unterstützen zu können. Aus diesem Grund sind die bisherigen Inhalte vorübergehend nicht verfügbar. Nach der Sommerpause stehen Ihnen die aktualisierten Inhalte zur Verfügung.
  
      Wenn Sie weitere Fragen zu Ihrem Regelungsvorhaben haben helfen wir Ihnen gerne weiter. Schreiben Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:015140767839).
    `,
    },
    {
      headline: {
        text: "Das könnte Sie auch interessieren",
      },
      linkList: {
        links: [
          {
            title: "Werkzeuge und Methoden",
            url: ROUTE_FUNDAMENTALS_METHODS.url,
          },
          {
            title: "Prinzipien für digitaltauglliche Regelungen",
            url: ROUTE_FUNDAMENTALS_PRINCIPLES.url,
          },
          {
            title: "Vorprüfung: Digitalbezug einschätzen",
            url: ROUTE_PRECHECK.url,
          },
        ],
      },
    },
  ],
};
