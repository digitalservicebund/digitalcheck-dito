export const EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY =
  "documentationData.euInteroperabilityAnswers";

export const YES_NO_OPTIONS = ["Yes", "No"] as const;

export type YesNoAnswer = (typeof YES_NO_OPTIONS)[number];

export const EU_INTEROPERABILITY_QUESTION_IDS = [
  "bindingRequirementsInDecisionProcess",
  "requirementIsBinding",
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
  "NOT_REQUIRED_NOT_BINDING",
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
  next: Record<YesNoAnswer, NextNode>;
};

export type EuInteroperabilityOutcome = {
  id: EuInteroperabilityOutcomeId;
  title: string;
  description: string;
};

export const EU_INTEROPERABILITY_QUESTIONS: Record<
  EuInteroperabilityQuestionId,
  EuInteroperabilityQuestion
> = {
  bindingRequirementsInDecisionProcess: {
    id: "bindingRequirementsInDecisionProcess",
    text: "Are you in a process that defines binding requirements? (e.g. legislative process, procurement process). In other words, are the binding requirements you are looking at yet to be decided and therefore still open to change?",
    next: {
      Yes: "requirementIsBinding",
      No: "NOT_REQUIRED_NO_DECISION_PROCESS",
    },
  },
  requirementIsBinding: {
    id: "requirementIsBinding",
    text: "Is the requirement to be decided binding? (i.e. something that limits the choices left to others)?",
    next: {
      Yes: "serviceProvidedByPublicOrUnionEntity",
      No: "NOT_REQUIRED_NOT_BINDING",
    },
  },
  serviceProvidedByPublicOrUnionEntity: {
    id: "serviceProvidedByPublicOrUnionEntity",
    text: "Does the binding requirement concern a digital public service provided either by Union bodies or by public sector bodies?",
    next: {
      Yes: "serviceProvidedInEuContext",
      No: "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
    },
  },
  serviceProvidedInEuContext: {
    id: "serviceProvidedInEuContext",
    text: "Is the digital public service provided either to another public sector body or to a Union entity or to a natural or legal person in the EU?",
    next: {
      Yes: "requiresCrossBorderSystemInteraction",
      No: "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
    },
  },
  requiresCrossBorderSystemInteraction: {
    id: "requiresCrossBorderSystemInteraction",
    text: "Does the provision of the affected digital public service require interactions by means of networks or information systems: (a) between public sector bodies that are located across Member State borders; (b) between Union entities; or (c) between Union entities and public sector bodies?",
    next: {
      Yes: "firstAssessmentForRequirement",
      No: "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
    },
  },
  firstAssessmentForRequirement: {
    id: "firstAssessmentForRequirement",
    text: "Is this the first time that an assessment is carried out for this binding requirement?",
    next: {
      Yes: "REQUIRED",
      No: "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
    },
  },
};

export const EU_INTEROPERABILITY_OUTCOMES: Record<
  EuInteroperabilityOutcomeId,
  EuInteroperabilityOutcome
> = {
  REQUIRED: {
    id: "REQUIRED",
    title: "An interoperability assessment is required.",
    description:
      "You are legally required to perform an interoperability assessment and publish the report.",
  },
  NOT_REQUIRED_NO_DECISION_PROCESS: {
    id: "NOT_REQUIRED_NO_DECISION_PROCESS",
    title: "No interoperability assessment is needed.",
    description:
      "Only if a requirement is still open for change, is it mandatory to perform an interoperability assessment.",
  },
  NOT_REQUIRED_NOT_BINDING: {
    id: "NOT_REQUIRED_NOT_BINDING",
    title: "No interoperability assessment is needed.",
    description:
      "Only binding requirements are essential for triggering an interoperability assessment.",
  },
  NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY: {
    id: "NOT_REQUIRED_NOT_PROVIDED_BY_PUBLIC_OR_UNION_ENTITY",
    title: "No interoperability assessment is needed.",
    description:
      "Only public services provided by public sector bodies or Union entities are subject to the IEA.",
  },
  NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS: {
    id: "NOT_REQUIRED_NOT_PROVIDED_TO_EU_ACTORS",
    title: "No interoperability assessment is needed.",
    description:
      "Only public services provided to other public sector bodies or Union entities are subject to the IEA.",
  },
  NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION: {
    id: "NOT_REQUIRED_NO_CROSS_BORDER_SYSTEM_INTERACTION",
    title: "No interoperability assessment is needed.",
    description:
      "Services confined to a single Member State do not qualify as trans-European digital public services.",
  },
  NOT_REQUIRED_NOT_FIRST_ASSESSMENT: {
    id: "NOT_REQUIRED_NOT_FIRST_ASSESSMENT",
    title: "No interoperability assessment is needed.",
    description:
      "You are not legally required to perform an interoperability assessment. However, a voluntary assessment may still provide value.",
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
    if (answer === "Yes" || answer === "No") normalized[questionId] = answer;
  }

  return normalized;
}
