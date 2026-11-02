import type { Pruefbereich } from "@/wizard/pruefbereichSchema";
import type { ImageMetadata } from "astro";
import brandenburg from "./brandenburg.svg";
import bund from "./bund.png";
import hessen from "./hessen.svg";
import nordrheinWestfalen from "./nordrhein-westfalen.svg";

// Logos of the Prüfbereiche, e.g. for the PruefbereichBreadcrumb, with their
// size in the design.
export const pruefbereichLogos: Partial<
  Record<Pruefbereich, { image: ImageMetadata; width: number; height: number }>
> = {
  Bund: { image: bund, width: 36, height: 24 },
  Brandenburg: { image: brandenburg, width: 44, height: 34 },
  Hessen: { image: hessen, width: 28, height: 34 },
  "Nordrhein-Westfalen": { image: nordrheinWestfalen, width: 32, height: 34 },
};
