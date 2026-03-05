import DateRangeOutlined from "@digitalservicebund/icons/DateRangeOutlined";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
import ToC from "~/components/TableOfContentsInteractive";
import SidebarContainer from "~/layout/SidebarContainer";
import { interoperability } from "~/resources/content/interoperabel";
import { slugify } from "~/utils/utilFunctions";

export default function EuRechtTab() {
  const tableContent = [
    "Zusammenarbeit in der EU",
    "Zugang zu Diensten",
    "Teilen von Daten und Informationen",
    "Datenschutz",
    "Technologien",
  ];
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
        <SidebarContainer
          sidebar={
            <ToC title={"Inhalt"} selector="section[id]">
              <ToC.List className="list-unstyled list-none">
                {tableContent.map((aspect) => (
                  <ToC.Item
                    key={aspect}
                    href={`#${slugify(aspect)}`}
                    title={aspect}
                  />
                ))}
              </ToC.List>
            </ToC>
          }
        >
          {" "}
          <div className="px-8 py-16">
            <Heading>Angrenzendes EU-Recht</Heading>
            <p>
              Im Ökosystem der Interoperabilität spielen einige EU-Rechtsakte
              eine Rolle. So ist beispielsweise die Verordnung für ein
              interoperables Europa (EU) 2024/903 mit einem strategischen
              Leitfaden wie dem Europäischen Interoperabilitätsrahmen (EIF)
              verzahnt. Die folgende Übersicht fasst die zentralen Rechtsakte
              zusammen, die den digitalen Raum strukturieren und gibt Ihnen
              einen Überblick welche davon in Ihrem jeweiligen Regelungsbereich
              Relevanz haben könnten.
            </p>
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
                <DetailsSummary title="Mehr dazu erfahren" className="">
                  <p>
                    <b>Im Detail:</b> Verordnung (EU) 2024/903 des Europäischen
                    Parlaments und des Rates vom 13. März 2024 über Maßnahmen
                    für ein hohes Maß an Interoperabilität des öffentlichen
                    Sektors in der Union |{" "}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <u>EUR-LexWas</u>
                    </a>
                  </p>
                  <br></br>
                  <p>
                    der Hintergrund der Verordnug ist, finden sie auf der
                    <a href="https://digitalcheck.bund.de/interoperabel">
                      <u> Hauptseite</u>
                    </a>{" "}
                    in dieser Sektion. Weitere Informationen finden Sie auf dem
                    <a href="www.google.de" target="_blank" rel="noreferrer">
                      <u> Interoperable Europe Portal</u>
                    </a>{" "}
                    der Europäischen Kommission
                  </p>
                </DetailsSummary>
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
        </SidebarContainer>
      </div>
    </>
  );
}
