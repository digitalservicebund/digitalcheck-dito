import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import {
  getDocumentationSchemaFormUrl as _getDocumentationSchemaFormUrl,
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
  DocumentationData,
  EuInteroperabilityOutcome,
  Principle,
  PrincipleReasoningV1,
  V1,
  V2,
  type Participation,
  type PolicyTitle,
} from "~/routes/dokumentation/documentationDataSchema";
import { features } from "~/utils/featureFlags";
import {
  readDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";
import { EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY } from "./euInteroperabilityFlow.ts";

export const STORAGE_KEY = "documentationData";

type DocumentationDataContextType = {
  documentationData: DocumentationData<V1 | V2>;
  hasSavedDocumentation: boolean;
  getDocumentationSchemaFormUrl: (
    url: string,
  ) => ReturnType<typeof _getDocumentationSchemaFormUrl>;
  createOrUpdateDocumentationData: (data: DocumentationData<V1 | V2>) => void;
  deleteDocumentationData: () => void;
  setPolicyTitle: (policyTitle?: PolicyTitle) => void;
  setParticipation: (participation?: Participation) => void;
  setEuInteroperabilityOutcome: (
    euInteroperabilityOutcome?: EuInteroperabilityOutcome,
  ) => void;
  addOrUpdatePrinciple: (newPrinciple?: Principle<V1 | V2>) => void;
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
    | Principle
    | undefined;
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

type V = typeof DATA_SCHEMA_VERSION_V1 | typeof DATA_SCHEMA_VERSION_V2;

function writeToStorage(data: DocumentationData<V>): void {
  writeVersionedDataToLocalStorage(data, STORAGE_KEY);
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
    principles: principles as Principle[],
  };

  writeToStorage(updatedDocumentationData);

  return updatedDocumentationData;
}

function getInitialState(version: string): DocumentationData<V> {
  let storedData = readDataFromLocalStorage<DocumentationData<V>>(STORAGE_KEY);

  if (
    storedData &&
    version === DATA_SCHEMA_VERSION_V2 &&
    storedData.version === DATA_SCHEMA_VERSION_V1
  ) {
    storedData = migrateV1ToV2(storedData);
  }

  if (storedData !== null) return storedData;
  return { version };
}

export function DocumentationDataProvider({
  children,
}: Readonly<DocumentationDataProviderProps>) {
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);
  const version = simplifiedFlow
    ? DATA_SCHEMA_VERSION_V2
    : DATA_SCHEMA_VERSION_V1;

  const [documentationData, setDocumentationData] = useState<
    DocumentationData<V>
  >({ version } as DocumentationData<V>);

  useEffect(() => {
    // Read localStorage only on the client, after hydration, so the first
    // client render matches the SSR HTML (empty state). The lint rule is
    // overly strict for this case — see https://react.dev/learn/you-might-not-need-an-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDocumentationData(getInitialState(version));
  }, [version]);

  const getDocumentationSchemaFormUrl = useCallback(
    (url: string) => {
      return _getDocumentationSchemaFormUrl(url, simplifiedFlow);
    },
    [simplifiedFlow],
  );

  const createOrUpdateDocumentationData = useCallback(
    (data: DocumentationData<V>): void => {
      writeToStorage(data);
      setDocumentationData(data);
    },
    [],
  );

  const deleteDocumentationData = useCallback((): void => {
    removeFromLocalStorage(STORAGE_KEY);
    removeFromLocalStorage(EU_INTEROPERABILITY_ANSWERS_STORAGE_KEY);
    setDocumentationData(getInitialState(version));
  }, [version]);

  const setPolicyTitle = useCallback(
    (policyTitle?: PolicyTitle) => {
      if (!policyTitle) return;

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

  const addOrUpdatePrinciple = useCallback(
    (newPrinciple?: Principle<V>) => {
      if (!newPrinciple) return;

      const principles = documentationData.principles ?? ([] as Principle<V>[]);
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

      const principles = (documentationData.principles ?? []) as Principle[];
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

      const principles = (documentationData.principles ?? []) as Principle[];
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
    (
      url: string,
    ):
      | PolicyTitle
      | Participation
      | EuInteroperabilityOutcome
      | Principle
      | undefined => {
      if (url === ROUTE_DOCUMENTATION_TITLE.url)
        return documentationData.policyTitle;
      else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
        return documentationData.participation;
      else if (url === ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.url)
        return documentationData.euInteroperabilityOutcome;

      const principleData = documentationData.principles?.find(
        ({ id }) => id === url,
      );

      if (!principleData) return undefined;
      if (simplifiedFlow) return principleData as Principle; // simplified flow stops here

      // TODO: remove after enabling simplifiedPrincipleFlow
      let reasoning: string | PrincipleReasoningV1[];

      if (Array.isArray(principleData.reasoning)) {
        reasoning = principleData.reasoning?.filter(
          (r): r is PrincipleReasoningV1 => r?.checkbox !== undefined,
        );
      } else {
        reasoning =
          (principleData.reasoning as string | PrincipleReasoningV1[]) ?? "";
      }

      return {
        ...principleData,
        // @ts-expect-error somehow ts does not pick up the correct type
        reasoning,
      };
    },
    [documentationData, simplifiedFlow],
  );

  const hasSavedDocumentation =
    !!documentationData.principles ||
    !!documentationData.participation ||
    !!documentationData.policyTitle ||
    !!documentationData.euInteroperabilityOutcome;

  const value = useMemo(
    () => ({
      documentationData,
      hasSavedDocumentation,
      getDocumentationSchemaFormUrl,
      createOrUpdateDocumentationData,
      deleteDocumentationData,
      setPolicyTitle,
      setParticipation,
      setEuInteroperabilityOutcome,
      addOrUpdatePrinciple,
      addOrUpdatePrincipleAnswer,
      addOrUpdatePrincipleReasoning,
      findDocumentationDataForUrl,
    }),
    [
      documentationData,
      hasSavedDocumentation,
      getDocumentationSchemaFormUrl,
      createOrUpdateDocumentationData,
      deleteDocumentationData,
      setPolicyTitle,
      setParticipation,
      setEuInteroperabilityOutcome,
      addOrUpdatePrinciple,
      addOrUpdatePrincipleAnswer,
      addOrUpdatePrincipleReasoning,
      findDocumentationDataForUrl,
    ],
  );
  return (
    <DocumentationDataContext value={value}>
      {children}
    </DocumentationDataContext>
  );
}
