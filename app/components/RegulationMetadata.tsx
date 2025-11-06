import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { type Beispielvorhaben } from "~/utils/strapiData.server";
import { formatDate, gesetzStatusMap } from "~/utils/utilFunctions";
import Metadata from "./Metadata";
import NewTabLink from "./NewTabLink.tsx";

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
            <NewTabLink
              to={exampleProject.LinkRegelungstext}
              className="text-blue-800 underline"
            >
              {exampleProject.GesetzStatus
                ? gesetzStatusMap[exampleProject.GesetzStatus]
                : examplesRegelungen.infoLabels.fallbackLinkText}
            </NewTabLink>
          }
        />
      )}
    </Metadata>
  );
}
