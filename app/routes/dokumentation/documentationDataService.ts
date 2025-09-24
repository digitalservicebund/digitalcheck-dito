import {
  readFromLocalStorage,
  removeFromLocalStorage,
  type VersionedData,
  writeToLocalStorage,
} from "~/utils/localStorage";

export type DocumentationData = {
  version: string;
  steps: DocumentationStep[];
} & VersionedData;

export type DocumentationStep = {
  id: string;
  items: DocumentationField[];
};

export type DocumentationField = {
  key: string;
  value: string;
};

export const DATA_SCHEMA_VERSION = "1";
export const STORAGE_KEY = "documentationData";

function writeToStorage(data: DocumentationData): void {
  writeToLocalStorage(data, STORAGE_KEY);
}

export function createDocumentationData(
  steps: DocumentationStep[] = [],
): DocumentationData {
  const data: DocumentationData = {
    version: DATA_SCHEMA_VERSION,
    steps: steps,
  };
  writeToStorage(data);
  return data;
}

export function getDocumentationData(): DocumentationData | null {
  return readFromLocalStorage<DocumentationData>(
    STORAGE_KEY,
    DATA_SCHEMA_VERSION,
  );
}

export function deleteDocumentationData(): void {
  removeFromLocalStorage(STORAGE_KEY);
}

export function createOrUpdateDocumentationStep(
  stepId: string,
  items: DocumentationField[],
) {
  let data = getDocumentationData();
  if (!data) {
    data = createDocumentationData();
  }

  const existingStepIndex = data.steps.findIndex((step) => step.id === stepId);
  const step: DocumentationStep = { id: stepId, items };

  if (existingStepIndex >= 0) {
    data.steps[existingStepIndex] = step;
  } else {
    data.steps.push(step);
  }

  writeToStorage(data);
}

export function getDocumentationStep(stepId: string): DocumentationStep | null {
  const data = getDocumentationData();
  if (!data) return null;

  return data.steps.find((step) => step.id === stepId) || null;
}

export function deleteDocumentationStep(stepId: string): boolean {
  const data = getDocumentationData();
  if (!data) return false;

  const initialLength = data.steps.length;
  data.steps = data.steps.filter((step) => step.id !== stepId);

  if (data.steps.length < initialLength) {
    writeToStorage(data);
    return true;
  }

  return false;
}
