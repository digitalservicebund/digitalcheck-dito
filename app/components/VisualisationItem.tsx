import { ROUTE_REGELUNGEN } from "@/config/additionalRoutes";
import { getImagePath } from "@/utils/images";
import { ZoomInOutlined } from "@digitalservicebund/icons";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import type { Visualisierung } from "~/utils/strapiData.types";
import { formatDate } from "~/utils/utilFunctions";
import { BlocksRenderer } from "./BlocksRenderer";

export type VisualisationItemProps = {
  visualisierung: Visualisierung;
  showContext?: boolean;
};

const LabelValuePair = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="space-x-8">
      <span>{label}</span>
      <span className="ds-label-01-bold">{value}</span>
    </div>
  ) : null;

export default function VisualisationItem({
  visualisierung,
  showContext,
}: Readonly<VisualisationItemProps>) {
  return (
    <div className="ds-stack ds-stack-32">
      <Heading
        tagName="h2"
        text={visualisierung.Titel}
        look="ds-heading-02-regular break-words"
      />
      {showContext && visualisierung.Beispielvorhaben && (
        <div>
          <strong>Kontext: </strong>
          <a
            href={`${ROUTE_REGELUNGEN}/${visualisierung.Beispielvorhaben.URLBezeichnung}`}
          >
            {visualisierung.Beispielvorhaben.Titel}
          </a>
        </div>
      )}

      <div className="flex gap-16 max-sm:flex-col sm:gap-24">
        <div className="sm:w-1/2">
          <a
            href={getImagePath(visualisierung)}
            target="_blank"
            rel="noreferrer"
            className="link-unstyled relative block aspect-square cursor-zoom-in overflow-hidden border border-blue-500"
          >
            <Image
              url={getImagePath(visualisierung)}
              alternativeText={visualisierung.Bild.alternativeText}
              className="size-full object-cover"
            />
            <ZoomInOutlined
              className="absolute bottom-16 left-16 bg-blue-800 p-1 shadow-sm"
              fill="white"
            />
          </a>

          <div className="bg-gray-100 p-12">
            <LabelValuePair
              label="Rechtsbereich:"
              value={visualisierung.Beispielvorhaben?.Rechtsgebiet}
            />
            <LabelValuePair
              label="Veröffentlicht am:"
              value={formatDate(
                visualisierung.Beispielvorhaben?.VeroeffentlichungsDatum,
              )}
            />
            <LabelValuePair
              label="Art der Visualisierung:"
              value={visualisierung.Visualisierungsart}
            />
            <LabelValuePair
              label="Software zur Erstellung:"
              value={visualisierung.Visualisierungstool}
            />
            <LabelValuePair
              label="Aufwand für das Referat:"
              value={visualisierung.Aufwand}
            />
            <LabelValuePair
              label="Ressort:"
              value={
                visualisierung.Ressort ??
                visualisierung.Beispielvorhaben?.Ressort
              }
            />
          </div>
        </div>
        <div className="mb-12 sm:w-1/2">
          <BlocksRenderer
            className={"[&_p]:mb-8"}
            content={visualisierung.Beschreibung}
          />
        </div>
      </div>
    </div>
  );
}
