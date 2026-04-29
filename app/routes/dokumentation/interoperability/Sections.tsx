import { ReactNode } from "react";
import { interoperabilityExplanationParagraphs } from "~/routes/dokumentation/interoperability/explanationMarkdown.ts";
import { ExplanationParagraph } from "~/routes/dokumentation/interoperability/FormVariant1.tsx";

export type Question = {
  id: string;
  label: string;
  requiresDetailsText?: string;
  isOwnStatement?: boolean;
};
type QuestionGroup = {
  title: string;
  questions: Question[];
};
type Section = {
  title: string;
  id: string;
  levelDe: string;
  intro?: ReactNode;
  groups: QuestionGroup[];
};
export type Answer = {
  checked: boolean;
  details: string;
  ownStatement: string;
};
export type AnswersById = Record<string, Answer>;
export const sections: Section[] = [
  {
    id: "legal",
    levelDe: "rechtliche",
    title: "Rechtliche Interoperabilität",
    intro: (
      <ExplanationParagraph
        markdown={interoperabilityExplanationParagraphs.legal}
      />
    ),
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "rechtlich-pos-1",
            label:
              "Das Vorhaben ist explizit auf bestehende sektorale oder querschnittliche EU-Rechtsvorschriften abgestimmt (z. B. DSGVO, Open-Data-Richtlinie, europäische Statistikverordnung).",
            requiresDetailsText:
              "Bitte benennen Sie die einschlägigen EU-Rechtsvorschriften, auf die das Vorhaben abgestimmt ist:",
          },
          {
            id: "rechtlich-pos-2",
            label:
              "Die Regelung benennt und bevollmächtigt klar die Behörden, die für den grenzüberschreitenden Datenaustausch und die Beseitigung von Hindernissen zuständig sind.",
          },
          {
            id: "rechtlich-pos-3",
            label:
              "Das Vorhaben legt einen gemeinsamen Mindestrahmen oder ein „Einsichtsrecht“ fest, das in allen Mitgliedstaaten einheitlich gilt.",
            requiresDetailsText:
              "Bitte erläutern Sie den gemeinsamen Mindestrahmen oder das vorgesehene Einsichtsrecht:",
          },
          {
            id: "rechtlich-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "rechtlich-neg-1",
            label:
              "Die Rechtsgrundlage für Interoperabilität wird auf eine separate, künftige oder unverbindliche Initiative verschoben.",
          },
          {
            id: "rechtlich-neg-2",
            label:
              "Es wurden grenzüberschreitende Rechtshindernisse identifiziert, die im Rahmen dieses Vorhabens nicht angegangen werden (z. B. Notwendigkeit einer Überarbeitung des neuen Rechtsrahmens).",
            requiresDetailsText:
              "Bitte benennen Sie die identifizierten grenzüberschreitenden Rechtshindernisse:",
          },
          {
            id: "rechtlich-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
  {
    id: "organizational",
    levelDe: "organisatorische",
    title: "Organisatorische Interoperabilität",
    intro: (
      <ExplanationParagraph
        markdown={interoperabilityExplanationParagraphs.organizational}
      />
    ),
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "orga-pos-1",
            label:
              "Das Vorhaben definiert klare Governance-Strukturen und Informationsflüsse zwischen nationalen Stellen und EU-Einrichtungen.",
          },
          {
            id: "orga-pos-2",
            label:
              "Es werden im Zuge der geplanten Umsetzung des Vorhabens Verwaltungsprozesse angepasst, um die Nutzung grenzüberschreitender Zertifikate oder Dienste zu erleichtern (z. B. „Once-Only“-Prinzip).",
            requiresDetailsText:
              "Bitte erläutern Sie, welche Verwaltungsprozesse angepasst werden sollen:",
          },
          {
            id: "orga-pos-3",
            label:
              "Es werden Bestimmungen für andere Normen (z.B. Verwaltungsvorschriften) zur Festlegung praktischer Modalitäten, Fristen und Sicherheitsmaßnahmen für die Datenübermittlung festgelegt.",
            requiresDetailsText:
              "Bitte benennen Sie die vorgesehenen Normen sowie Modalitäten, Fristen oder Sicherheitsmaßnahmen:",
          },
          {
            id: "orga-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "orga-neg-1",
            label:
              "Es werden keine bestehenden Prozesse angepasst, da davon ausgegangen wird, dass bestehende Organisationsstrukturen ausreichen.",
          },
          {
            id: "orga-neg-2",
            label:
              "Rollen und Verantwortlichkeiten der Akteure bleiben undefiniert oder offen für stark voneinander abweichende Auslegungen der Länder oder Kommunen.",
          },
          {
            id: "orga-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
  {
    id: "semantic",
    levelDe: "semantische",
    title: "Semantische Interoperabilität",
    intro: (
      <ExplanationParagraph
        markdown={interoperabilityExplanationParagraphs.semantic}
      />
    ),
    groups: [
      {
        title: "Positive Auswirkungen",
        questions: [
          {
            id: "semantik-pos-1",
            label:
              "Das Vorhaben schreibt die Verwendung etablierter internationaler oder EU-weiter Metadatenstandards vor (z. B. SDMX, DCAT-AP, SIMS).",
            requiresDetailsText:
              "Bitte benennen Sie die vorgesehenen Metadatenstandards:",
          },
          {
            id: "semantik-pos-2",
            label:
              "Die Informationsanforderungen und Datenvariablen sind im Regelungstext oder in dessen Anhängen präzise definiert oder werden von anderen Normen präzisiert.",
          },
          {
            id: "semantik-pos-3",
            label:
              "Es werden standardisierter Formate für spezifische Datenpunkte referenziert (z. B. Datum/Uhrzeit, gemeinsame Identifikatoren oder harmonisierte Formeln).",
            requiresDetailsText:
              "Bitte benennen Sie die referenzierten standardisierten Formate oder Datenpunkte:",
          },
        ],
      },
      {
        title: "Neutrale oder negative Auswirkungen",
        questions: [
          {
            id: "semantik-neg-1",
            label:
              "Nennt das Vorhaben weit gefasste oder nicht präskriptive Definitionen (z. B. „elektronische Form“), die nicht interoperable Formate wie unstrukturierte PDFs oder Videos zulassen?",
            requiresDetailsText:
              "Bitte benennen Sie die weit gefassten Definitionen oder nicht interoperablen Formate:",
          },
          {
            id: "semantik-neg-2",
            label:
              "Die Bedeutung der ausgetauschten Daten wird ohne gemeinsamen semantischen Rahmen dem Ermessen einzelner Umsetzungsakteure überlassen.",
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    levelDe: "technische",
    title: "Technische Interoperabilität",
    intro: (
      <ExplanationParagraph
        markdown={interoperabilityExplanationParagraphs.technical}
      />
    ),
    groups: [
      {
        title: "Bestimmung eines positiven Effekts",
        questions: [
          {
            id: "technik-pos-1",
            label:
              "Der Vorschlag fördert die Wiederverwendung bestehender technischer EU-Lösungen oder gemeinsamer Infrastrukturen (z. B. MOVE-HUB, eIDAS, SDG oder OOTS).",
            requiresDetailsText:
              "Bitte benennen Sie die technischen EU-Lösungen oder Infrastrukturen, die wiederverwendet werden sollen:",
          },
          {
            id: "technik-pos-2",
            label:
              "Der Vorschlag sieht ein zentrales Register oder eine zentrale Anlaufstelle vor, um die Notwendigkeit komplexer Multi-Point-Integrationen zu verringern.",
            requiresDetailsText:
              "Bitte erläutern Sie das vorgesehene zentrale Register oder die zentrale Anlaufstelle:",
          },
          {
            id: "technik-pos-3",
            label:
              "Es werden technische Dokumentationen und APIs zur Verfügung gestellt, um sicherzustellen, dass lokale Systeme nahtlos angebunden werden können.",
            requiresDetailsText:
              "Bitte benennen Sie die vorgesehenen technischen Dokumentationen oder APIs:",
          },
          {
            id: "technik-pos-4",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
      {
        title: "Erkennung eines neutralen/negativen Effekts",
        questions: [
          {
            id: "technik-neg-1",
            label:
              "Erlaubt der Vorschlag „papieräquivalente“ digitale Formate (z. B. unstrukturierte Word-Dokumente) anstelle von maschinenlesbaren Daten?",
            requiresDetailsText:
              "Bitte benennen Sie die zugelassenen papieräquivalenten digitalen Formate:",
          },
          {
            id: "technik-neg-2",
            label:
              "Stellt die Komplexität der vorgeschlagenen technischen Lösung ein erhebliches Risiko oder ein Hindernis für die Umsetzung in bestimmten Mitgliedstaaten dar?",
            requiresDetailsText:
              "Bitte erläutern Sie das erhebliche Risiko oder Hindernis für die Umsetzung:",
          },
          {
            id: "technik-neg-3",
            label: "Eigene Angaben",
            isOwnStatement: true,
          },
        ],
      },
    ],
  },
];
