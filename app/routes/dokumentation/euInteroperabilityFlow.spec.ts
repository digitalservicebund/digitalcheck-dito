import { describe, expect, it } from "vitest";
import {
  getEuInteroperabilityFlowState,
  sanitizeEuInteroperabilityAnswers,
} from "./euInteroperabilityFlow.ts";

describe("euInteroperabilityFlow", () => {
  it("returns required outcome for all yes answers", () => {
    const flowState = getEuInteroperabilityFlowState({
      bindingRequirementsInDecisionProcess: "Yes",
      requirementIsBinding: "Yes",
      serviceProvidedByPublicOrUnionEntity: "Yes",
      serviceProvidedInEuContext: "Yes",
      requiresCrossBorderSystemInteraction: "Yes",
      firstAssessmentForRequirement: "Yes",
    });

    expect(flowState.outcomeId).toBe("REQUIRED");
    expect(flowState.activeQuestionId).toBe(undefined);
  });

  it("returns first not-required outcome when first question is no", () => {
    const flowState = getEuInteroperabilityFlowState({
      bindingRequirementsInDecisionProcess: "No",
    });

    expect(flowState.outcomeId).toBe("NOT_REQUIRED_NO_DECISION_PROCESS");
    expect(flowState.activeQuestionId).toBe(undefined);
  });

  it("returns the currently active question when flow is incomplete", () => {
    const flowState = getEuInteroperabilityFlowState({
      bindingRequirementsInDecisionProcess: "Yes",
      requirementIsBinding: "Yes",
    });

    expect(flowState.activeQuestionId).toBe(
      "serviceProvidedByPublicOrUnionEntity",
    );
    expect(flowState.outcomeId).toBeUndefined();
  });

  it("sanitizes unknown values from storage payload", () => {
    const answers = sanitizeEuInteroperabilityAnswers({
      bindingRequirementsInDecisionProcess: "Yes",
      requirementIsBinding: "Maybe",
      unknownField: "No",
    });

    expect(answers).toEqual({
      bindingRequirementsInDecisionProcess: "Yes",
    });
  });
});
