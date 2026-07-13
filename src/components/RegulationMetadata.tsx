import { examplesRegelungen } from "@/resources/content/beispiele-regelungen";
import type { Beispielvorhaben } from "@/utils/strapiData.types";
import { formatDate, gesetzStatusMap } from "@/utils/utilFunctions";
import Metadata from "./Metadata";

export default function RegulationMetadata({
  exampleProject,
}: Readonly<{ exampleProject: Beispielvorhaben }>) {
  return (
    <Metadata className="bg-gray-100 px-16 py-8">
      {exampleProject.VeroeffentlichungsDatum && (
        <Metadata.Item
          label={examplesRegelungen.infoLabels.from}
          value={formatDate(exampleProject.VeroeffentlichungsDatum)}
        />
      )}
      <Metadata.Item
        label={examplesRegelungen.infoLabels.resort}
        value={exampleProject.Ressort}
      />
      {exampleProject.LinkRegelungstext && (
        <Metadata.Item
          label={examplesRegelungen.infoLabels.linkLabel}
          value={
            <a href={exampleProject.LinkRegelungstext}>
              {exampleProject.GesetzStatus
                ? gesetzStatusMap[exampleProject.GesetzStatus]
                : examplesRegelungen.infoLabels.fallbackLinkText}
            </a>
          }
        />
      )}
    </Metadata>
  );
}
