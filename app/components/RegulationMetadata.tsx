import { examplesRegelungen } from "~/resources/content/beispiele-regelungen";
import { type Beispielvorhaben } from "~/utils/strapiData.server";
import { formatDate, gesetzStatusMap } from "~/utils/utilFunctions";
import CustomLink from "./CustomLink";
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
            <CustomLink
              to={exampleProject.LinkRegelungstext}
              target="_blank"
              rel="noreferrer"
              className="text-blue-800 underline"
            >
              {exampleProject.GesetzStatus
                ? gesetzStatusMap[exampleProject.GesetzStatus]
                : examplesRegelungen.infoLabels.fallbackLinkText}
            </CustomLink>
          }
        />
      )}
    </Metadata>
  );
}
