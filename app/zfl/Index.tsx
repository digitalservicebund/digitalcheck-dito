import FactCheckOutlinedIcon from "@digitalservicebund/icons/FactCheckOutlined";
import WidgetsOutlinedIcon from "@digitalservicebund/icons/WidgetsOutlined";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import { dedent } from "~/utils/dedentMultilineStrings";
import { Contact } from "./components/Contact";
import { ROUTE_ZFL_TASK_FORCES, ROUTE_ZFL_TRAININGS } from "./routes";
import MetaTitle from "./ZFLMeta";

export default function ZFLIndex() {
  return (
    <>
      <MetaTitle />
      <Hero
        title="Bessere Rechtsetzung in allen Regelungsphasen"
        subtitle={dedent`
          Das Zentrum für Legistik unterstützt Legistinnen und Legisten dabei, praxis- und digitaltaugliches Recht einfach zu erarbeiten.

          Sie erhalten zum Beispiel operative Unterstützung beim Visualisieren, Unterstützung beim Erheben der Betroffenen-Bedürfnisse und Zugriff auf Formulierungsbeispiele. Darüber stehen Ihnen praxisnahe Schulungen und Vorlagen zur Auswahl.
        `}
        className="bg-zfl-main20"
      />

      <div className="bg-yellow-500">
        <Container className="py-8">
          Hier ensteht das Zentrum für Legistik.
        </Container>
      </div>

      <Container className="py-80">
        <InfoBox
          visual={{
            type: "image",
            image: {
              url: "/zfl/Oval.png",
              alternativeText: "",
              size: "medium",
            },
          }}
          heading={{
            tagName: "h2",
            text: "Darum geht es",
          }}
          content={dedent`
            Unser Ziel ist eine moderne, wirksame und praxisnahe Rechtsetzung. Das gelingt durch Regelungen, die betroffenenzentriert, praxistauglich und digital umsetzbar sind.

            Dies ist ein wichtiger Baustein dafür, einen wirksamen und leistungsfähigen Staat ermöglichen. Daher ist das Zentrum für Legistik ein Teil des Handlungsfelds „Bessere Rechtsetzung“ in der Modernisieungsagenda.
          `}
        />
      </Container>

      <div className="bg-blue-100">
        <Container className="py-80">
          <InfoBoxList
            heading={{
              tagName: "h2",
              text: "So unterstützen wir Sie bereits heute",
            }}
            items={[
              {
                look: "highlight",
                className: "bg-white",
                visual: {
                  type: "icon",
                  Icon: WidgetsOutlinedIcon,
                  className: "fill-blue-300",
                },
                heading: {
                  tagName: "h3",
                  text: "Task Forces für Ihr Vorhaben nutzen",
                },
                content:
                  "Spezialisierte Kompetenzteams begleiten Sie bei Ihrem Vorhaben.",
                buttons: [
                  {
                    text: "Mehr Informationen zu Task Forces",
                    href: ROUTE_ZFL_TASK_FORCES.href,
                    look: "link",
                  },
                ],
              },
              {
                look: "highlight",
                className: "bg-white",
                visual: {
                  type: "icon",
                  Icon: FactCheckOutlinedIcon,
                  className: "fill-blue-300",
                },
                heading: {
                  tagName: "h3",
                  text: "In Schulungen praktisches Wissen erlangen",
                },
                content:
                  "Neue Wege durch umsetzungsorientierte Kurz-Schulungen sowie umfassende Module kennenlernen.",
                buttons: [
                  {
                    text: "Mehr Informationen zu Schulungen",
                    href: ROUTE_ZFL_TRAININGS.href,
                    look: "link",
                  },
                ],
              },
            ]}
          />
        </Container>
      </div>

      <div>
        <Container className="py-80">
          <Contact className="bg-zfl-main20" />
        </Container>
      </div>
    </>
  );
}
