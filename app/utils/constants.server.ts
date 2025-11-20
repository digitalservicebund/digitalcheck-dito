import fs from "node:fs";

function readSecretVolume(path: string): string | null {
  try {
    return fs.readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

export * from "./constants";

export const POSTHOG_KEY =
  readSecretVolume("/etc/secrets/posthog-key") ??
  process?.env?.POSTHOG_KEY ??
  "";
