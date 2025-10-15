import type {
  DocumentationData,
  Participation,
  PolicyTitle,
  Principle,
} from "~/routes/dokumentation/documentationDataSchema";
import {
  readVersionedDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";

export const DATA_SCHEMA_VERSION = "1";
export const STORAGE_KEY = "documentationData";

function writeToStorage(data: DocumentationData): void {
  writeVersionedDataToLocalStorage(data, STORAGE_KEY);
}

export function getDocumentationData(): DocumentationData {
  return (
    readVersionedDataFromLocalStorage<DocumentationData>(
      STORAGE_KEY,
      DATA_SCHEMA_VERSION,
    ) ?? { version: DATA_SCHEMA_VERSION }
  );
}

export function createOrUpdateDocumentationData(data: DocumentationData): void {
  writeToStorage(data);
}

export function deleteDocumentationData(): void {
  removeFromLocalStorage(STORAGE_KEY);
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
