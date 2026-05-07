import {
  vorpruefung_automatisierung,
  vorpruefung_datenaustausch,
  vorpruefung_euBezug,
  vorpruefung_itSystem,
  vorpruefung_kommunikation,
  vorpruefung_verpflichtungenFuerBeteiligte,
} from "@/config/routes";

export const preCheckQuestions = {
  itSystem: {
    id: "it-system",
    title: "IT-System",
    path: vorpruefung_itSystem.path,
  },
  verpflichtungenFuerBeteiligte: {
    id: "verpflichtungen-fuer-beteiligte",
    title: "Verpflichtungen für Beteiligte",
    path: vorpruefung_verpflichtungenFuerBeteiligte.path,
  },
  datenaustausch: {
    id: "datenaustausch",
    title: "Datenaustausch",
    path: vorpruefung_datenaustausch.path,
  },
  kommunikation: {
    id: "kommunikation",
    title: "Digitale Kommunikation",
    path: vorpruefung_kommunikation.path,
  },
  automatisierung: {
    id: "automatisierung",
    title: "Automatisierung",
    path: vorpruefung_automatisierung.path,
  },
  euBezug: {
    id: "eu-bezug",
    title: "EU-Bezug",
    path: vorpruefung_euBezug.path,
  },
};
