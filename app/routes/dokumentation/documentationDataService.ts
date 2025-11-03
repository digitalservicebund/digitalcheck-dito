import {
  type DocumentationData,
  type Participation,
  type PolicyTitle,
  type Principle,
} from "~/routes/dokumentation/documentationDataSchema";
import {
  readVersionedDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";

export const DATA_SCHEMA_VERSION = "1";
export const STORAGE_KEY = "documentationData";
export const initialDocumentationData: DocumentationData = {
  version: DATA_SCHEMA_VERSION,
};
let cachedDocumentationData = initialDocumentationData;

let listeners: (() => void)[] = [];

function writeToStorage(data: DocumentationData): void {
  writeVersionedDataToLocalStorage(data, STORAGE_KEY);
}

export function getDocumentationData(): DocumentationData {
  const storedData =
    readVersionedDataFromLocalStorage<DocumentationData>(
      STORAGE_KEY,
      DATA_SCHEMA_VERSION,
    ) ?? initialDocumentationData;

  if (cachedDocumentationData !== storedData) {
    cachedDocumentationData = storedData;
    emitChange();
  }

  return storedData;
}

export function createOrUpdateDocumentationData(data: DocumentationData): void {
  writeToStorage(data);
  cachedDocumentationData = data;
  emitChange();
}

export function deleteDocumentationData(): void {
  removeFromLocalStorage(STORAGE_KEY);
  cachedDocumentationData = initialDocumentationData;
  emitChange();
}

export function setPolicyTitle(policyTitle: PolicyTitle): void {
  const data = getDocumentationData();
  createOrUpdateDocumentationData({
    ...data,
    policyTitle,
  });
}

export function setParticipation(participation: Participation): void {
  const data = getDocumentationData();
  createOrUpdateDocumentationData({
    ...data,
    participation,
  });
}

export function addOrUpdatePrinciple(newPrinciple: Principle): void {
  const data = getDocumentationData();
  const principles = data.principles ?? [];
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
    ...data,
    principles: updatedPrinciples,
  });
}

export function subscribeToDocumentationData(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export const getDocumentationDataSnapshot = () => cachedDocumentationData;
export const getDocumentationDataServerSnapshot = () =>
  initialDocumentationData;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
