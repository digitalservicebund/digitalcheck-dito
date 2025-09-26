export interface VersionedData {
  version: string;
}

/**
 * Read versioned data from localStorage
 * @returns The parsed data or null if not found/invalid
 * @throws Error if version mismatch is detected
 */
export function readVersionedDataFromLocalStorage<T extends VersionedData>(
  storageKey: string,
  currentVersion: string,
): T | null {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    throw new Error(
      "localStorage is not available. This function should only be called on the client-side.",
    );
  }

  const stored = localStorage.getItem(storageKey);
  if (!stored) return null;

  const data: T = JSON.parse(stored) as T;
  if (data.version !== currentVersion) {
    throw new Error(
      `Data version mismatch for ${storageKey}. Expected ${currentVersion}, found ${data.version}`,
    );
  }

  return data;
}

export function writeVersionedDataToLocalStorage<T extends VersionedData>(
  data: T,
  storageKey: string,
): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    throw new Error(
      "localStorage is not available. This function should only be called on the client-side.",
    );
  }

  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function removeFromLocalStorage(storageKey: string): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    throw new Error(
      "localStorage is not available. This function should only be called on the client-side.",
    );
  }

  localStorage.removeItem(storageKey);
}
