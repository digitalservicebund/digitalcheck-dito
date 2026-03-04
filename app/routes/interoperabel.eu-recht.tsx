import DateRangeOutlined from "@digitalservicebund/icons/DateRangeOutlined";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
import { interoperability } from "~/resources/content/interoperabel";

export default function EuRechtTab() {
  return (
    <>
      <div className="space-y-40">
        Digitaltauglichkeit erarbeiten
        <figure>
          <Image
            className="border-b-ds-gray-400 h-[500px] w-[848px] rounded-xs border-b px-8 py-16"
            url={interoperability.andDigitalReadiness.image.url} // Platzhalter Bild
            alternativeText="Platzhalter Bild"
          />
          <figcaption className="px-8 py-16">
            Bildunterschrift in 1-2 Zeilen (nicht der ALT-Text)
          </figcaption>
        </figure>
        <div className="px-8 py-16">
          <Heading>Angrenzendes EU-Recht</Heading>
          <p>
            Im Ökosystem der Interoperabilität spielen einige EU-Rechtsakte eine
            Rolle. So ist beispielsweise die Verordnung für ein interoperables
            Europa (EU) 2024/903 mit einem strategischen Leitfaden wie dem
            Europäischen Interoperabilitätsrahmen (EIF) verzahnt. Die folgende
            Übersicht fasst die zentralen Rechtsakte zusammen, die den digitalen
            Raum strukturieren und gibt Ihnen einen Überblick welche davon in
            Ihrem jeweiligen Regelungsbereich Relevanz haben könnten.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-40 px-8 py-16">
        <Heading tagName="h2">Zusammenarbeit in der EU</Heading>
        <div className="flex flex-col gap-40">
          <div>
            <InfoBox
              className="bg-white"
              heading={{
                tagName: "h3",
                text: "Verordnung für ein interoperables Europa",
              }}
              badge={{
                look: "hint",
                text: "Verordnung",
                Icon: DateRangeOutlined, //TODO: Change Icon Name
              }}
            ></InfoBox>
            <DetailsSummary title="Mehr dazu erfahren"></DetailsSummary>
          </div>
          <div>
            <InfoBox
              className="bg-white"
              heading={{
                tagName: "h3",
                text: "Europäischer Interoperabilitätsrahmen (EIF)",
              }}
              badge={{
                look: "hint",
                text: "Verordnung",
                Icon: DateRangeOutlined, //TODO: Change Icon Name
              }}
            ></InfoBox>
            <DetailsSummary title="Mehr dazu erfahren"></DetailsSummary>
          </div>
        </div>
      </div>
    </>
  );
}
