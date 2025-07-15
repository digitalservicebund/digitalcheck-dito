import fs from "node:fs";

function readSecretVolume(path: string): string | null {
  try {
    return fs.readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

export * from "./constants";

export const UNLEASH_KEY =
  readSecretVolume("/etc/secrets/unleash-key") ??
  process?.env?.UNLEASH_KEY ??
  "";
