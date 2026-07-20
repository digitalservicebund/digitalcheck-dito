import type { Beispielvorhaben } from "@/utils/strapiData.types";
import { formatDate, gesetzStatusMap } from "@/utils/utilFunctions";
import Metadata from "./Metadata";

export default function RegulationMetadata({
  exampleProject,
}: Readonly<{ exampleProject: Beispielvorhaben }>) {
  return (
    <Metadata className="bg-ds-gray-100 px-16 py-8">
      {exampleProject.VeroeffentlichungsDatum && (
        <Metadata.Item
          label="Fassung vom"
          value={formatDate(exampleProject.VeroeffentlichungsDatum)}
        />
      )}
      <Metadata.Item label="Ressort" value={exampleProject.Ressort} />
      {exampleProject.LinkRegelungstext && (
        <Metadata.Item
          label="Link"
          value={
            <a href={exampleProject.LinkRegelungstext}>
              {exampleProject.GesetzStatus
                ? gesetzStatusMap[exampleProject.GesetzStatus]
                : "Aktuelle Fassung"}
            </a>
          }
        />
      )}
    </Metadata>
  );
}
