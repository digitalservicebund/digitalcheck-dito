import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import {
  getDocumentationSchemaFormUrl as _getDocumentationSchemaFormUrl,
  DATA_SCHEMA_VERSION_V1,
  DATA_SCHEMA_VERSION_V2,
  DocumentationData,
  Principle,
  V1,
  V2,
  type Participation,
  type PolicyTitle,
} from "~/routes/dokumentation/documentationDataSchema";
import {
  readDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";

export const STORAGE_KEY = "documentationData";

type DocumentationDataContextType = {
  documentationData: DocumentationData;
  hasSavedDocumentation: boolean;
  getDocumentationSchemaFormUrl: (
    url: string,
  ) => ReturnType<typeof _getDocumentationSchemaFormUrl>;
  createOrUpdateDocumentationData: (data: DocumentationData) => void;
  deleteDocumentationData: () => void;
  setPolicyTitle: (policyTitle?: PolicyTitle) => void;
  setParticipation: (participation?: Participation) => void;
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
  ) => PolicyTitle | Participation | Principle | undefined;
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
    storedData = migrateV1ToV2(storedData as DocumentationData<V1>);
  }

  if (storedData !== null) return storedData as DocumentationData;
  return { version: DATA_SCHEMA_VERSION_V2 };
}

export function DocumentationDataProvider({
  children,
}: Readonly<DocumentationDataProviderProps>) {
  const [documentationData, setDocumentationData] = useState<DocumentationData>(
    { version: DATA_SCHEMA_VERSION_V2 },
  );

  useEffect(() => {
    // Read localStorage only on the client, after hydration, so the first
    // client render matches the SSR HTML (empty state). The lint rule is
    // overly strict for this case — see https://react.dev/learn/you-might-not-need-an-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDocumentationData(getInitialState());
  }, []);

  const getDocumentationSchemaFormUrl = useCallback((url: string) => {
    return _getDocumentationSchemaFormUrl(url);
  }, []);

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
    (url: string): PolicyTitle | Participation | Principle | undefined => {
      if (url === ROUTE_DOCUMENTATION_TITLE.url)
        return documentationData.policyTitle;
      else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
        return documentationData.participation;

      return documentationData.principles?.find(({ id }) => id === url);
    },
    [documentationData],
  );

  const hasSavedDocumentation =
    !!documentationData.principles ||
    !!documentationData.participation ||
    !!documentationData.policyTitle;

  const value = useMemo(
    () => ({
      documentationData,
      hasSavedDocumentation,
      getDocumentationSchemaFormUrl,
      createOrUpdateDocumentationData,
      deleteDocumentationData,
      setPolicyTitle,
      setParticipation,
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
