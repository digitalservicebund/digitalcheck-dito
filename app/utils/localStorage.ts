export interface VersionedData {
  version: string;
}

/**
 * Read versioned data from localStorage
 * @returns The parsed data or null if not found/invalid
 * @throws Error if version mismatch is detected
 */
export function readFromLocalStorage<T extends VersionedData>(
  storageKey: string,
  currentVersion: string,
): T | null {
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

export function writeToLocalStorage<T extends VersionedData>(
  data: T,
  storageKey: string,
): void {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function removeFromLocalStorage(storageKey: string): void {
  localStorage.removeItem(storageKey);
}
