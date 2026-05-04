import RichText from "~/components/RichText.tsx";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

export const EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY =
  "documentationData.euInteroperabilityAnswers";

export const YES_NO_OPTIONS = ["Ja", "Nein"] as const;

export type YesNoAnswer = (typeof YES_NO_OPTIONS)[number];

export const EU_INTEROPERABILITY_QUESTION_IDS = [
  "bindingRequirementsInDecisionProcess",
  "serviceProvidedByPublicOrUnionEntity",
  "serviceProvidedInEuContext",
  "requiresCrossBorderSystemInteraction",
  "firstAssessmentForRequirement",
] as const;

export type EuInteroperabilityQuestionId =
  (typeof EU_INTEROPERABILITY_QUESTION_IDS)[number];

export const EU_INTEROPERABILITY_OUTCOME_IDS = [
  "REQUIRED",
  "NOT_REQUIRED_NO_DECISION_PROCESS",
  "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
  "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
  "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
  "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
] as const;

export type EuInteroperabilityOutcomeId =
  (typeof EU_INTEROPERABILITY_OUTCOME_IDS)[number];

type NextNode = EuInteroperabilityQuestionId | EuInteroperabilityOutcomeId;

export type EuInteroperabilityQuestion = {
  id: EuInteroperabilityQuestionId;
  text: string;
  details?: string;
  next: Record<YesNoAnswer, NextNode>;
};

export type EuInteroperabilityOutcome = {
  id: EuInteroperabilityOutcomeId;
  title: string;
  description: ReactNode;
};

export function linkToIEAArticle(index?: number) {
  const base =
    "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903";
  if (!index) return base;
  return `${base}#art_${index}`;
}

export function markdownCiteIEA(article: number, paragraph?: number) {
  let text = `Art. ${article}`;
  if (paragraph) text += ` Abs. ${paragraph}`;
  text += " IEA";
  return `[${text}](${linkToIEAArticle(article)})`;
}

export const EU_INTEROPERABILITY_QUESTIONS: Record<
  EuInteroperabilityQuestionId,
  EuInteroperabilityQuestion
> = {
  bindingRequirementsInDecisionProcess: {
    id: "bindingRequirementsInDecisionProcess",
    text: "Definiert oder ändert Ihre Regelung oder deren Vollzug eine Verpflichtung, ein Verbot, eine Bedingung, ein Kriterium oder eine Beschränkung rechtlicher, organisatorischer, semantischer oder technischer Art?",
    details: dedent`
      Dies ist bei Regelungsvorhaben in der Regel der Fall.
      
      Im Vollzug kann dies z. B. durch Verwaltungsvorschriften, Architekturvorgaben geschehen.
    `,
    next: {
      Ja: "serviceProvidedByPublicOrUnionEntity",
      Nein: "NOT_REQUIRED_NO_DECISION_PROCESS",
    },
  },
  serviceProvidedByPublicOrUnionEntity: {
    id: "serviceProvidedByPublicOrUnionEntity",
    text: "Betreffen die verbindlichen Anforderungen einen digitalen öffentlichen Dienst, der von öffentlichen Stellen oder EU-Organen erbracht wird?",
    details: `Siehe ${markdownCiteIEA(2, 2)}.`,
    next: {
      Ja: "serviceProvidedInEuContext",
      Nein: "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
    },
  },
  serviceProvidedInEuContext: {
    id: "serviceProvidedInEuContext",
    text: "Wird der digitale öffentliche Dienst einer anderen öffentlichen Stelle, einem EU-Organ oder einer natürlichen oder juristischen Person in der EU bereitgestellt?",
    next: {
      Ja: "requiresCrossBorderSystemInteraction",
      Nein: "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
    },
  },
  requiresCrossBorderSystemInteraction: {
    id: "requiresCrossBorderSystemInteraction",
    text: "Erfordert die Erbringung des betroffenen digitalen öffentlichen Dienstes Interaktionen über Netze oder Informationssysteme:",
    details: dedent`
    - zwischen öffentlichen Stellen über Mitgliedstaatsgrenzen hinweg,
    - zwischen EU-Organen **oder**
    - zwischen EU-Organen und öffentlichen Stellen?
    `,
    next: {
      Ja: "firstAssessmentForRequirement",
      Nein: "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
    },
  },
  firstAssessmentForRequirement: {
    id: "firstAssessmentForRequirement",
    text: "Wird für diese verbindliche Anforderung zum ersten Mal eine Interoperabilitätsbewertung durchgeführt?",
    next: {
      Ja: "REQUIRED",
      Nein: "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
    },
  },
};

export const EU_INTEROPERABILITY_OUTCOMES: Record<
  EuInteroperabilityOutcomeId,
  EuInteroperabilityOutcome
> = {
  REQUIRED: {
    id: "REQUIRED",
    title: "Eine Interoperabilitätsbewertung ist erforderlich.",
    description: (
      <RichText
        markdown={dedent`
          Sie sind gemäß ${markdownCiteIEA(3)} verpflichtet, eine Interoperabilitätsbewertung
          durchzuführen und an die entsprechenden Stellen zu übermitteln.

          Nutzen Sie hierfür die folgenden Schritte. Senden Sie die resultierende Dokumentation
          (Word-Datei) an die nationale Kontaktstelle, welche sie an die EU-Kommission übermitteln wird.
          
          Alternativ können Sie die Interoperabilitätsbewertung auch direkt an
          die EU-Kommission übermitteln. Nutzen Sie hierfür das [Online-Tool](https://interoperable-europe.ec.europa.eu/collection/assessments/online-tool-assessments).
        `}
      />
    ),
  },
  NOT_REQUIRED_NO_DECISION_PROCESS: {
    id: "NOT_REQUIRED_NO_DECISION_PROCESS",
    title: "Keine Interoperabilitätsbewertung erforderlich.",
    description:
      "Eine Interoperabilitätsbewertung ist nur dann verpflichtend, wenn eine Anforderung noch offen für Änderungen ist.",
  },
  NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY: {
    id: "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
    title: "Keine Interoperabilitätsbewertung erforderlich.",
    description:
      "Nur digitale öffentliche Dienste, die von öffentlichen Stellen oder EU-Organen erbracht werden, unterliegen dem IEA.",
  },
  NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS: {
    id: "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
    title: "Keine Interoperabilitätsbewertung erforderlich.",
    description:
      "Nur Dienste, die an andere öffentliche Stellen oder EU-Organe erbracht werden, unterliegen dem IEA.",
  },
  NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION: {
    id: "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
    title: "Keine Interoperabilitätsbewertung erforderlich.",
    description:
      "Dienste, die auf einen einzigen Mitgliedstaat beschränkt sind, gelten nicht als transeuropäische digitale öffentliche Dienste.",
  },
  NOT_REQUIRED_NOT_FIRST_ASSESSMENT: {
    id: "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
    title: "Keine Interoperabilitätsbewertung erforderlich.",
    description:
      "Sie sind nicht gesetzlich verpflichtet, eine Interoperabilitätsbewertung durchzuführen. Eine freiwillige Bewertung kann jedoch dennoch sinnvoll sein.",
  },
};

export type EuInteroperabilityAnswers = Partial<
  Record<EuInteroperabilityQuestionId, YesNoAnswer>
>;

export type EuInteroperabilityFlowState = {
  questionIds: EuInteroperabilityQuestionId[];
  activeQuestionId?: EuInteroperabilityQuestionId;
  outcomeId?: EuInteroperabilityOutcomeId;
};

const FIRST_QUESTION_ID: EuInteroperabilityQuestionId =
  "bindingRequirementsInDecisionProcess";

export function getEuInteroperabilityFlowState(
  answers: EuInteroperabilityAnswers,
): EuInteroperabilityFlowState {
  const visitedQuestionIds: EuInteroperabilityQuestionId[] = [];
  let node: NextNode = FIRST_QUESTION_ID;

  while (node in EU_INTEROPERABILITY_QUESTIONS) {
    const questionId = node as EuInteroperabilityQuestionId;
    visitedQuestionIds.push(questionId);

    const answer = answers[questionId];
    if (!answer) {
      return {
        questionIds: visitedQuestionIds,
        activeQuestionId: questionId,
      };
    }

    node = EU_INTEROPERABILITY_QUESTIONS[questionId].next[answer];
  }

  return {
    questionIds: visitedQuestionIds,
    outcomeId: node as EuInteroperabilityOutcomeId,
  };
}

export function sanitizeEuInteroperabilityAnswers(
  input: unknown,
): EuInteroperabilityAnswers {
  if (!input || typeof input !== "object") return {};

  const normalized: EuInteroperabilityAnswers = {};

  for (const questionId of EU_INTEROPERABILITY_QUESTION_IDS) {
    const answer = (input as Record<string, unknown>)[questionId];
    if (answer === "Ja" || answer === "Nein") normalized[questionId] = answer;
  }

  return normalized;
}
