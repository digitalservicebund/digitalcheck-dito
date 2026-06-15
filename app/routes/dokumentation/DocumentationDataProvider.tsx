import {
  dokumentation_beteiligungsformate,
  dokumentation_bewertungOrganisatorisch,
  dokumentation_bewertungRechtlich,
  dokumentation_bewertungSemantisch,
  dokumentation_bewertungTechnisch,
  dokumentation_euInteroperabilitaetsbezug,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_verbindlicheAnforderungen,
} from "@/config/routes";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type {
  BindingRequirementsData,
  DocumentationData,
  EuInteroperabilityOutcome,
  InteroperabilityAssessmentData,
  InteroperabilityAssessmentLevel,
  Participation,
  PolicyTitle,
  Principle,
  V1,
  V2,
} from "~/routes/dokumentation/documentationDataSchema";
import {
  bindingRequirementsNavigationSchema,
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
  euInteroperabilityOutcomeNavigationSchema,
  interoperabilityAssessmentLevelNavigationSchema,
  participationSchema,
  policyHeaderSchema,
  principleSchemaV2,
} from "~/routes/dokumentation/documentationDataSchema";

import {
  readDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";
import { useHydrationMarker } from "~/utils/useHydrationMarker";

export const STORAGE_KEY = "documentationData";

type DocumentationDataContextType = {
  documentationData: DocumentationData;
  hasSavedDocumentation: boolean;
  createOrUpdateDocumentationData: (data: DocumentationData) => void;
  deleteDocumentationData: () => void;
  setPolicyTitle: (policyTitle?: PolicyTitle) => void;
  setParticipation: (participation?: Participation) => void;
  setEuInteroperabilityOutcome: (
    euInteroperabilityOutcome?: EuInteroperabilityOutcome,
  ) => void;
  setBindingRequirementsData: (
    bindingRequirements?: BindingRequirementsData,
  ) => void;
  setInteroperabilityAssessmentData: (
    interoperabilityAssessment?: InteroperabilityAssessmentData,
  ) => void;
  addOrUpdatePrinciple: (newPrinciple?: Principle) => void;
  addOrUpdatePrincipleAnswer: (
    principleId: string,
    newAnswer: Principle["answer"],
  ) => void;
  addOrUpdatePrincipleReasoning: (
    principleId: string,
    newReasoning: string,
    newAspects: Principle["aspects"],
  ) => void;
  findDocumentationDataForUrl: (
    url: string,
  ) =>
    | PolicyTitle
    | Participation
    | EuInteroperabilityOutcome
    | BindingRequirementsData
    | InteroperabilityAssessmentLevel
    | Principle
    | undefined;
  validateDocumentationDataForRoute: (
    routePath: string,
    dataIdentifier?: string,
  ) => {
    formData: DocumentationDataType | undefined;
    validationResult: ValidationResult;
  };
};

const DocumentationDataContext =
  createContext<DocumentationDataContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useDocumentationDataService() {
  const documentationDataService = useContext(DocumentationDataContext);
  if (documentationDataService === null)
    throw new Error(
      "Documentation data could not be loaded, please wrap in DocumentationDataProvider",
    );

  return documentationDataService;
}

type DocumentationDataProviderProps = {
  children: ReactNode;
};

function writeToStorage(data: DocumentationData): void {
  writeVersionedDataToLocalStorage(data, STORAGE_KEY);
}

type DocumentationDataType =
  | PolicyTitle
  | Participation
  | EuInteroperabilityOutcome
  | BindingRequirementsData
  | InteroperabilityAssessmentLevel
  | Principle
  | undefined;

export enum ValidationResult {
  missingData,
  completed,
  neutral,
}
type RouteDefinition = {
  getData: (data: DocumentationData) => DocumentationDataType;
  schema: RouteSchema;
  /**
   * Custom validation. Return `null` to use default validation.
   */
  validate?: (data: DocumentationData) => ValidationResult | null;
};

type RouteSchema =
  | typeof policyHeaderSchema
  | typeof participationSchema
  | typeof euInteroperabilityOutcomeNavigationSchema
  | typeof bindingRequirementsNavigationSchema
  | typeof interoperabilityAssessmentLevelNavigationSchema
  | typeof principleSchemaV2;

const skipIfNoInteroperabilityRequired = (data: DocumentationData) => {
  if (data.euInteroperabilityOutcome?.outcomeId !== "REQUIRED")
    return ValidationResult.neutral;
  return null; // keep default behavior
};
const routeDefinitions: Record<string, RouteDefinition> = {
  [dokumentation_regelungsvorhabenTitel.path]: {
    getData: (data) => data.policyTitle,
    schema: policyHeaderSchema,
  },
  [dokumentation_beteiligungsformate.path]: {
    getData: (data) => data.participation,
    schema: participationSchema,
  },
  [dokumentation_euInteroperabilitaetsbezug.path]: {
    getData: (data) => data.euInteroperabilityOutcome,
    schema: euInteroperabilityOutcomeNavigationSchema,
  },
  [dokumentation_verbindlicheAnforderungen.path]: {
    getData: (data) => data.bindingRequirements,
    schema: bindingRequirementsNavigationSchema,
    validate: skipIfNoInteroperabilityRequired,
  },
  [dokumentation_bewertungRechtlich.path]: {
    getData: (data) => data.interoperabilityAssessment?.legal,
    schema: interoperabilityAssessmentLevelNavigationSchema,
    validate: skipIfNoInteroperabilityRequired,
  },
  [dokumentation_bewertungOrganisatorisch.path]: {
    getData: (data) => data.interoperabilityAssessment?.organizational,
    schema: interoperabilityAssessmentLevelNavigationSchema,
    validate: skipIfNoInteroperabilityRequired,
  },
  [dokumentation_bewertungSemantisch.path]: {
    getData: (data) => data.interoperabilityAssessment?.semantic,
    schema: interoperabilityAssessmentLevelNavigationSchema,
    validate: skipIfNoInteroperabilityRequired,
  },
  [dokumentation_bewertungTechnisch.path]: {
    getData: (data) => data.interoperabilityAssessment?.technical,
    schema: interoperabilityAssessmentLevelNavigationSchema,
    validate: skipIfNoInteroperabilityRequired,
  },
};

function getRouteData(
  routeOrDataIdentifier: string,
  documentationData: DocumentationData,
): {
  formData: DocumentationDataType;
  schema: RouteSchema;
  validate: RouteDefinition["validate"];
} {
  const routeDefinition = routeDefinitions[routeOrDataIdentifier];
  const formData = routeDefinition
    ? routeDefinition.getData(documentationData)
    : documentationData.principles?.find(
        ({ id }) => id === routeOrDataIdentifier,
      );
  const schema =
    routeDefinitions[routeOrDataIdentifier]?.schema ?? principleSchemaV2;

  return { formData, schema, validate: routeDefinition?.validate };
}

const { radioOptions } = digitalDocumentation.principlePages;

function migrateV1ToV2(v1: DocumentationData<V1>): DocumentationData<V2> {
  const principles = v1.principles?.map((p) => {
    if (p.answer !== radioOptions[0] || !Array.isArray(p.reasoning)) return p;
    const checked = p.reasoning.filter((r) => r.checkbox);
    return {
      id: p.id,
      answer: p.answer,
      aspects: checked
        .map((r) => r.aspect)
        .filter((a): a is string => Boolean(a)),
      reasoning: checked
        .map((r) => r.reason)
        .filter(Boolean)
        .join("\n"),
    } as Principle;
  });

  const updatedDocumentationData: DocumentationData<V2> = {
    version: DATA_SCHEMA_VERSION_V2,
    policyTitle: v1.policyTitle,
    participation: v1.participation,
    euInteroperabilityOutcome: v1.euInteroperabilityOutcome,
    bindingRequirements: v1.bindingRequirements,
    interoperabilityAssessment: v1.interoperabilityAssessment,
    principles: principles as Principle[],
  };

  writeToStorage(updatedDocumentationData);

  return updatedDocumentationData;
}

function getInitialState(): DocumentationData {
  let storedData = readDataFromLocalStorage<
    DocumentationData<V1> | DocumentationData
  >(STORAGE_KEY);

  if (storedData && storedData.version === DATA_SCHEMA_VERSION_V1) {
    storedData = migrateV1ToV2(storedData);
  }

  if (storedData !== null)
    return { ...storedData, initialized: true } as DocumentationData;
  return { version: DATA_SCHEMA_VERSION_V2, initialized: true };
}

export function DocumentationDataProvider({
  children,
}: Readonly<DocumentationDataProviderProps>) {
  useHydrationMarker();
  const [documentationData, setDocumentationData] = useState<DocumentationData>(
    { version: DATA_SCHEMA_VERSION_V2, initialized: false },
  );

  useEffect(() => {
    // Read localStorage only on the client, after hydration, so the first
    // client render matches the SSR HTML (empty state). The lint rule is
    // overly strict for this case — see https://react.dev/learn/you-might-not-need-an-effect

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDocumentationData(getInitialState());
  }, []);

  const validateDocumentationDataForRoute: DocumentationDataContextType["validateDocumentationDataForRoute"] =
    useCallback(
      (routePath: string, dataIdentifier?: string) => {
        const { formData, schema, validate } = getRouteData(
          dataIdentifier ?? routePath,
          documentationData,
        );

        if (validate) {
          const result = validate(documentationData);
          if (result !== null) {
            return {
              formData,
              validationResult: result,
            };
          }
        }

        if (formData === undefined) {
          return { formData, validationResult: ValidationResult.neutral };
        }

        const parseResult = schema.safeParse(formData);

        const validationResult = parseResult.success
          ? ValidationResult.completed
          : ValidationResult.missingData;

        return {
          formData,
          validationResult,
        };
      },
      [documentationData],
    );

  const createOrUpdateDocumentationData = useCallback(
    (data: DocumentationData): void => {
      writeToStorage(data);
      setDocumentationData(data);
    },
    [],
  );

  const deleteDocumentationData = useCallback((): void => {
    removeFromLocalStorage(STORAGE_KEY);
    setDocumentationData(getInitialState());
  }, []);

  const setPolicyTitle = useCallback(
    (policyTitle?: PolicyTitle) => {
      if (!policyTitle) return;
      if (policyTitle.publicationStatus === "published") {
        policyTitle.publicationDate = "";
      } else if (policyTitle.publicationStatus === "planned") {
        policyTitle.publicationLink = "";
      }

      createOrUpdateDocumentationData({
        ...documentationData,
        policyTitle,
      });
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const setParticipation = useCallback(
    (participation?: Participation) => {
      if (!participation) return;

      createOrUpdateDocumentationData({
        ...documentationData,
        participation,
      });
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const setEuInteroperabilityOutcome = useCallback(
    (euInteroperabilityOutcome?: EuInteroperabilityOutcome) => {
      const updatedDocumentationData = {
        ...documentationData,
        euInteroperabilityOutcome,
      };

      if (!euInteroperabilityOutcome)
        delete updatedDocumentationData.euInteroperabilityOutcome;

      createOrUpdateDocumentationData(updatedDocumentationData);
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const setBindingRequirementsData = useCallback(
    (bindingRequirements?: BindingRequirementsData) => {
      const updatedDocumentationData = {
        ...documentationData,
        bindingRequirements,
      };

      if (!bindingRequirements)
        delete updatedDocumentationData.bindingRequirements;

      createOrUpdateDocumentationData(updatedDocumentationData);
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const setInteroperabilityAssessmentData = useCallback(
    (interoperabilityAssessment?: InteroperabilityAssessmentData) => {
      const updatedDocumentationData = {
        ...documentationData,
        interoperabilityAssessment,
      };

      if (!interoperabilityAssessment)
        delete updatedDocumentationData.interoperabilityAssessment;

      createOrUpdateDocumentationData(updatedDocumentationData);
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const addOrUpdatePrinciple = useCallback(
    (newPrinciple?: Principle) => {
      if (!newPrinciple) return;

      const principles = documentationData.principles ?? [];
      const existingIndex = principles.findIndex(
        (existingPrinciple) => existingPrinciple.id === newPrinciple.id,
      );

      const updatedPrinciples =
        existingIndex >= 0
          ? principles.map((existingPrinciple, index) =>
              index === existingIndex ? newPrinciple : existingPrinciple,
            )
          : [...principles, newPrinciple];

      createOrUpdateDocumentationData({
        ...documentationData,
        principles: updatedPrinciples,
      });
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const addOrUpdatePrincipleAnswer = useCallback(
    (principleId: string, newAnswer: Principle["answer"]) => {
      if (!principleId || !newAnswer) return;

      const principles = documentationData.principles ?? [];
      const existingIndex = principles.findIndex(
        (existingPrinciple) => existingPrinciple.id === principleId,
      );

      const defaultNewAspects = newAnswer !== radioOptions[0] ? undefined : [];

      const updatedPrinciples: Principle[] =
        existingIndex >= 0
          ? principles.map((existingPrinciple, index) => {
              if (index === existingIndex) {
                const newPrinciple = {
                  ...existingPrinciple,
                  answer: newAnswer,
                };

                if (newAnswer !== radioOptions[0])
                  newPrinciple.aspects = defaultNewAspects;

                return newPrinciple;
              }

              return existingPrinciple;
            })
          : [
              ...principles,
              {
                id: principleId,
                answer: newAnswer,
                reasoning: "",
                aspects: defaultNewAspects,
              },
            ];

      createOrUpdateDocumentationData({
        ...documentationData,
        principles: updatedPrinciples,
      });
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const addOrUpdatePrincipleReasoning = useCallback(
    (
      principleId: string,
      newReasoning: string,
      newAspects: Principle["aspects"],
    ) => {
      if (!principleId) return;

      const principles = documentationData.principles ?? [];
      const existingIndex = principles.findIndex(
        (existingPrinciple) => existingPrinciple.id === principleId,
      );

      if (existingIndex === -1) return;

      const updatedPrinciples: Principle[] = principles.map(
        (existingPrinciple, index) =>
          index === existingIndex
            ? {
                ...existingPrinciple,
                reasoning: newReasoning,
                aspects: newAspects,
              }
            : existingPrinciple,
      );

      createOrUpdateDocumentationData({
        ...documentationData,
        principles: updatedPrinciples,
      });
    },
    [documentationData, createOrUpdateDocumentationData],
  );

  const findDocumentationDataForUrl = useCallback(
    (url: string): DocumentationDataType =>
      getRouteData(url, documentationData).formData,
    [documentationData],
  );

  const hasSavedDocumentation =
    !!documentationData.principles ||
    !!documentationData.participation ||
    !!documentationData.policyTitle ||
    !!documentationData.euInteroperabilityOutcome ||
    !!documentationData.interoperabilityAssessment;

  const value = useMemo(
    () => ({
      documentationData,
      hasSavedDocumentation,
      createOrUpdateDocumentationData,
      deleteDocumentationData,
      setPolicyTitle,
      setParticipation,
      setEuInteroperabilityOutcome,
      setBindingRequirementsData,
      setInteroperabilityAssessmentData,
      addOrUpdatePrinciple,
      addOrUpdatePrincipleAnswer,
      addOrUpdatePrincipleReasoning,
      findDocumentationDataForUrl,
      validateDocumentationDataForRoute,
    }),
    [
      documentationData,
      hasSavedDocumentation,
      createOrUpdateDocumentationData,
      deleteDocumentationData,
      setPolicyTitle,
      setParticipation,
      setEuInteroperabilityOutcome,
      setBindingRequirementsData,
      setInteroperabilityAssessmentData,
      addOrUpdatePrinciple,
      addOrUpdatePrincipleAnswer,
      addOrUpdatePrincipleReasoning,
      findDocumentationDataForUrl,
      validateDocumentationDataForRoute,
    ],
  );
  return (
    <DocumentationDataContext value={value}>
      {children}
    </DocumentationDataContext>
  );
}
