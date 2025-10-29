import AccountTreeTwoToneIcon from "@digitalservicebund/icons/AccountTreeTwoTone";
import HubTwoToneIcon from "@digitalservicebund/icons/HubTwoTone";
import LightbulbTwoToneIcon from "@digitalservicebund/icons/LightbulbTwoTone";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import RichText from "~/components/RichText";
import { dedent } from "~/utils/dedentMultilineStrings";
import { ZFL_EMAIL, ZFL_PHONE } from "./constants";
import { ROUTE_ZFL_INVOLVEMENTS } from "./routes";
import MetaTitle from "./ZFLMeta";

export default function ZFLInvolvements() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_INVOLVEMENTS.title} />
      <Hero title={ROUTE_ZFL_INVOLVEMENTS.title} className="bg-white md:p-40" />

      <Container className="space-y-40 pt-0 pb-40 md:space-y-80 md:pb-80">
        <InfoBox
          visual={{
            type: "image",
            image: {
              url: "/zfl/Beteiligungen.png",
              alternativeText: "",
              size: "medium",
            },
          }}
          heading={{
            tagName: "h2",
            text: "Kompetenzen für praxisnahe und digitaltaugliche Regelungen nutzen",
          }}
          content={dedent`
            Ein interdisziplinäres Team mit Kompetenzen in Service Design, IT und Produktmanagement begleitet sie vertraulich und mit individuellem Fokus auf Ihr Vorhaben.

            Eine Zusammenarbeit in der frühen Phase Ihres Vorhabens entfaltet dabei den größten Effekt auf die Zielorientierung Ihrer Regelung.

            **Kontaktieren Sie uns, um eine Begleitung für Ihr Vorhaben anzufragen:**
            
            Telefon: ${ZFL_PHONE.markdown}
            
            E-Mail: ${ZFL_EMAIL.markdown}
          `}
        />
        <div className="space-y-40">
          <InfoBox
            heading={{
              tagName: "h2",
              text: "In diesen Punkten unterstützt Sie die Task Force",
            }}
            content="Durch Ihre Rechtsetzung-Expertise in Kombination mit Methoden aus der agilen Software-Entwicklung entstehen praxistaugliche und zukunftsfähige Gesetze, die die Potenziale der Digitalisierung bestmöglich ausschöpfen."
          />
          <div className="flex gap-32 max-md:flex-col">
            {[
              {
                title: "Sachverhalte visualisieren",
                content:
                  "Komplexe Sachverhalte durch Prozess-Visualisierungen strukturieren, interne und externe Abstimmung vereinfachen",
                icon: AccountTreeTwoToneIcon,
              },
              {
                title: "Umsetzung mitdenken",
                content:
                  "Betroffenen-Perspektive frühzeitig identifizieren, bestehende Umsetzungshürden beheben",
                icon: LightbulbTwoToneIcon,
              },
              {
                title: "Prozesse strukturieren",
                content:
                  "Methodische Unterstützung nutzen, Anleitungen für Praxis- und Digitaltauglichkeit erhalten",
                icon: HubTwoToneIcon,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-16 md:flex-col md:gap-32"
              >
                <item.icon className="fill-zfl-main80 size-40 flex-none md:size-80" />
                <div className="space-y-8">
                  <Heading
                    tagName="h3"
                    look="ds-heading-03-bold"
                    text={item.title}
                    className="md:pr-32"
                  />
                  <RichText markdown={item.content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="bg-[url('/images/trainings.jpg')] bg-cover bg-center">
        <Container className="md:py-80">
          <InfoBox
            look="highlight"
            className="bg-white"
            heading={{
              tagName: "h2",
              text: "Praxisbeispiel: Einsatz einer Task Force für das Stromsteuerrecht",
            }}
            content="„Die gründliche Analyse von Vollzugsprozessen hat uns geholfen, das Zusammenspiel zwischen den Regelungen und der Administration besser zu verstehen und so den digitalen Vollzug zu gestalten.“"
            buttons={[
              {
                text: "Mehr erfahren",
                href: "https://digitalcheck.bund.de/beispiele/regelungen/gesetz-zur-modernisierung-und-zum-buerokratieabbau-im-strom-und-energiesteuerrecht",
                look: "link",
                target: "_blank",
              },
            ]}
          />
        </Container>
      </div>
    </>
  );
}
