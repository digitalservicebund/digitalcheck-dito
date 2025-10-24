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
        title="Bessere Rechtsetzung in allen Phasen Ihres Vorhabens"
        subtitle="Das Zentrum für Legistik unterstützt Sie bei der Ausarbeitung von Regelungen. Sie stellen damit sicher, dass Ihr Vorhaben betroffenenzentriert, praxistauglich und digital umsetzbar ist."
        className="bg-zfl-main20"
      />

      <div className="bg-yellow-500">
        <Container className="py-8">
          Das Zentrum für Legistik befindet sich aktuell im Aufbau.
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
            text: "Ihre Vorteile",
          }}
          content={dedent`
            Bereits heute für Sie nutzbar:

            - Operative Hilfe beim Visualisieren
            - Unterstützung beim Erheben der Betroffenen-Bedürfnisse
            - Zugriff auf Formulierungsbeispiele
            - Praxisnahe Schulungen

            Das Angebot wird zusammen mit Ihnen schrittweise weiterentwickelt. Im Fokus stehen dabei die Schaffung einer einheitlichen Begleitung in unterschiedlichen Vorhaben-Phasen, die Vermittlung von Kompetenzen und die Möglichkeiten zum Austausch und aktiver Beteiligung. 
            
            Gut zu wissen: Das Zentrum für Legistik ist ein Bestandteil des Handlungsfelds „Bessere Rechtsetzung“ in der Modernisierungsagenda.
          `}
        />
      </Container>

      <div className="bg-blue-100">
        <Container className="py-40 md:py-80">
          <InfoBoxList
            heading={{
              tagName: "h2",
              text: "Unterstützung für Sie",
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
        <Container className="py-40 md:py-80">
          <Contact className="bg-zfl-main20" />
        </Container>
      </div>
    </>
  );
}
