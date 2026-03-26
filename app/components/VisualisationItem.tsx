import ZoomInOutlined from "@digitalservicebund/icons/ZoomInOutlined";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import {
  ROUTE_REGELUNGEN,
  ROUTE_VISUALISATION,
} from "~/resources/staticRoutes";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import { Visualisierung } from "~/utils/strapiData.server";
import { formatDate } from "~/utils/utilFunctions";
import { BlocksRenderer } from "./BlocksRenderer";

export type VisualisationItemProps = {
  visualisierung: Visualisierung;
  plausibleEventName?: string;
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
  plausibleEventName,
  showContext,
}: Readonly<VisualisationItemProps>) {
  const visualisationUrl = visualisierung.Bild.url.split("/").pop();
  const plausibleEvent = getPlausibleEventClassName(plausibleEventName);

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
          <Link
            to={`${ROUTE_REGELUNGEN.url}/${visualisierung.Beispielvorhaben.URLBezeichnung}`}
            prefetch="viewport"
            className="text-link"
          >
            {visualisierung.Beispielvorhaben.Titel}
          </Link>
        </div>
      )}

      <div className="flex gap-16 max-sm:flex-col sm:gap-24">
        <div className="sm:w-1/2">
          <Link
            to={`${ROUTE_VISUALISATION.url}/${visualisationUrl}`}
            reloadDocument
            target="_blank"
            rel="noreferrer"
            state={{ image: visualisierung.Bild }}
            className={twJoin(
              "relative block aspect-square cursor-zoom-in overflow-hidden border border-blue-500",
              plausibleEvent,
            )}
          >
            <Image
              url={visualisierung.Bild.url}
              alternativeText={visualisierung.Bild.alternativeText}
              className="size-full object-cover"
            />
            <ZoomInOutlined
              className="absolute bottom-16 left-16 bg-blue-800 p-1 shadow-sm"
              fill="white"
            />
          </Link>

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
              label="Ressort:"
              value={visualisierung.Beispielvorhaben?.Ressort}
            />
          </div>
        </div>
        <div className="mb-12 sm:w-1/2">
          <BlocksRenderer
            className={"space-y-8"}
            content={visualisierung.Beschreibung}
          />
        </div>
      </div>
    </div>
  );
}
