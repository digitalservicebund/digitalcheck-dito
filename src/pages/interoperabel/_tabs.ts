import { interoperabel } from "@/config/routes";
import { getTabAnchorLinkFromLabel } from "@/utils/tabs";

export const tabLabels = {
  overviewTabLabel: "Überblick",
  backgroundTabLabel: "Hintergrund",
  euLawTabLabel: "Angrenzendes EU-Recht",
  interoperableSolutionsTabLabel: "Interoperable Lösungen",
} as const;

const ASSESSMENT_ANCHOR = "bewertung";
export const interopsAssessment = {
  anchor: ASSESSMENT_ANCHOR,
  path:
    interoperabel.path +
    getTabAnchorLinkFromLabel(tabLabels.overviewTabLabel, ASSESSMENT_ANCHOR),
} as const;
