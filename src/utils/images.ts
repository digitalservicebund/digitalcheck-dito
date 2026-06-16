import { beispiele } from "@/config/routes";
import type { Visualisierung } from "~/utils/strapiData.types";

export function getImageFilename(v: Visualisierung): string {
  const fn = new URL(v.Bild.url).pathname.split("/").pop();
  if (!fn) {
    throw new Error("Invalid image URL", { cause: v.Bild.url });
  }
  return fn;
}

export function getImagePath(v: Visualisierung): string {
  const filename = getImageFilename(v);
  return `${beispiele.path}/visualisierung/${filename}`;
}
