import {
  assistent_vorpruefung_automatisierung,
  assistent_vorpruefung_datenaustausch,
  assistent_vorpruefung_euBezug,
  assistent_vorpruefung_itSystem,
  assistent_vorpruefung_kommunikation,
  assistent_vorpruefung_verpflichtungenFuerBeteiligte,
} from "@/config/routes";

export type TQuestion = {
  id: string;
  title: string;
  path: string;
};

export const preCheck = {
  questions: [
    {
      id: "it-system",
      path: assistent_vorpruefung_itSystem.path,
      title: "IT-System",
    },
    {
      id: "verpflichtungen-fuer-beteiligte",
      path: assistent_vorpruefung_verpflichtungenFuerBeteiligte.path,
      title: "Verpflichtungen für Beteiligte",
    },
    {
      id: "datenaustausch",
      path: assistent_vorpruefung_datenaustausch.path,
      title: "Datenaustausch",
    },
    {
      id: "kommunikation",
      path: assistent_vorpruefung_kommunikation.path,
      title: "Digitale Kommunikation",
    },
    {
      id: "automatisierung",
      path: assistent_vorpruefung_automatisierung.path,
      title: "Automatisierung",
    },
    {
      id: "eu-bezug",
      path: assistent_vorpruefung_euBezug.path,
      title: "EU-Bezug",
    },
  ] as TQuestion[],
};
