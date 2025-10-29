import FactCheckOutlinedIcon from "@digitalservicebund/icons/FactCheckOutlined";
import WidgetsOutlinedIcon from "@digitalservicebund/icons/WidgetsOutlined";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import { dedent } from "~/utils/dedentMultilineStrings";
import { Contact } from "./components/Contact";
import { ROUTE_ZFL_BEGLEITUNGEN, ROUTE_ZFL_TRAININGS } from "./routes";
import MetaTitle from "./ZFLMeta";

export default function ZFLIndex() {
  return (
    <>
      <MetaTitle />
      <Hero
        title="Bessere Rechtsetzung in allen Phasen Ihres Vorhabens"
        subtitle="Das Zentrum für Legistik unterstützt Sie bei der Ausarbeitung von Regelungen. Sie stellen damit sicher, dass Ihr Vorhaben betroffenenzentriert, praxistauglich und digital umsetzbar ist."
        className="bg-zfl-main20"
      />

      <div className="bg-yellow-500">
        <Container className="py-8">
          Das Angebot befindet sich aktuell im Aufbau und wird schrittweise mit
          Ihnen zusammen weiterentwickelt.
        </Container>
      </div>

      <Container className="py-40 md:py-80">
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
            text: "Vorteile des Angebots für Sie",
          }}
          content={dedent`
            - Operative Hilfe beim Visualisieren
            - Unterstützung beim Erheben der Betroffenen-Bedürfnisse und Umsetzungshürden
            - Konkrete Formulierungsbeispiele und praktische Vorlagen
            - Vereinheitlichung von Checks und Arbeitshilfen
            - Praxisnahe Schulungen
            - Vernetzung und Austausch untereinander

            Gut zu wissen: Das Zentrum für Legistik ist ein Bestandteil des Handlungsfelds „Bessere Rechtsetzung“ in der Modernisierungsagenda.
          `}
        />
      </Container>

      <div className="bg-blue-100">
        <Container className="py-40 md:py-80">
          <InfoBoxList
            heading={{
              tagName: "h2",
              text: "Bereits verfügbare Angebote",
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
                  text: "Interdisziplinäre Expertise für Ihr Regelungsvorhaben",
                },
                content:
                  "Wir begleiten Sie mit einem interdisziplinärem Kompetenzteam. Sie erhalten dadurch ein umfassendes Verständnis von Umsetzungsprozessen und gestalten Ihr Vorhaben praxisnah und bürokratiearm.",
                buttons: [
                  {
                    text: "Mehr Informationen zu interdisziplinären Kompetenzteams",
                    href: ROUTE_ZFL_BEGLEITUNGEN.href,
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
                  "Neue Methoden und Werkzeuge für die Rechtsetzung in umsetzungsorientierten Schulungen kennenlernen.",
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
        <Container className="py-40 md:py-80">
          <Contact className="bg-zfl-main20" />
        </Container>
      </div>
    </>
  );
}
