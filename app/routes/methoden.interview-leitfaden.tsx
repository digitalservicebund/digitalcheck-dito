import {
  AnnouncementOutlined,
  MergeTypeOutlined,
  RuleOutlined,
  SocialDistanceOutlined,
} from "@digitalservicebund/icons";
import { data } from "react-router";
import AccordionItem from "~/components/AccordionItem";
import { LinkButton } from "~/components/Button";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import {
  ROUTE_METHODS_INTERVIEW_METHODS,
  ROUTE_METHODS_INTERVIEW_METHODS_STEPS,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";
import getFeatureFlag from "~/utils/featureFlags.server";

export function loader() {
  if (!getFeatureFlag("showInterviewLeitfaden")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }
}

export default function InterviewMethods() {
  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_INTERVIEW_METHODS.title} />
      <main className="mb-80 space-y-80">
        <Hero title="Nehmen Sie die Praxis-Perspektive für Ihr Vorhaben ein">
          <p>
            Erkenntnisse aus der Umsetzung und der direkte Einbezug der
            Betroffenen verbessern die Wirksamkeit Ihres Vorhaben. Aber wie
            gelangen Sie an die Erkenntnisse? Und wie gelingt der Transfer in
            die Regelung? Dieser Leitfaden unterstützt Sie beim praktischen
            Vorgehen. Er zeigt Ihnen, wie Sie relevante Stakeholder
            identifizieren und Interviews strukturiert vorbereiten.
          </p>

          <p>
            Die Inhalte sind auf Basis von den unten aufgeführten Quellen
            entstanden.
          </p>
        </Hero>

        <section className="container space-y-40">
          <Heading tagName="h2">
            Warum die Praxisperspektive Ihre Regelungen verbessert
          </Heading>

          <div className="space-y-32 md:grid md:grid-cols-3 md:space-y-0 md:gap-x-40">
            <div className="space-y-16">
              <AnnouncementOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Wirkung des Vorhabens erhöhen:**
                
                Erkenntnisse zur Umsetzungspraxis machen transparent, wie Regelungen im Vollzug wirken und umgesetzt werden.
              `}
              />
            </div>

            <div className="space-y-16">
              <RuleOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Fehler vermeiden:**
                
                Durch Prüfung von Annahmen wird sichtbar, was in der Praxis funktioniert - und was nicht.
              `}
              />
            </div>

            <div className="space-y-16">
              <MergeTypeOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Potentiale heben:**

                Auf Basis Ihres Vorhabens helfen die Erkenntnisse dabei, Services, Prozesse und Regeln gezielt zu verbessern.
              `}
              />
            </div>
          </div>
        </section>

        <section className="container space-y-40">
          <div className="space-y-8">
            <Heading tagName="h3">Interview-Methoden im Überblick</Heading>
            <p>
              Damit Regelungen wirksam und praxisgerecht gestaltet werden
              können, bedarf es einer fundierten Informationsgrundlage. Der
              systematische Einbezug von Akteurinnen und Akteuren aus der
              Umsetzung ermöglicht es, Erfahrungen und Perspektiven aus der
              Praxis zu berücksichtigen. Zur Erhebung dieses Wissens können – je
              nach Zielsetzung – unterschiedliche Interviewtypen eingesetzt
              werden:
            </p>
          </div>

          <div>
            <AccordionItem headline="Quantitative Interviews">
              <RichText
                markdown={dedent`
                Quantitative Interviews dienen der Überprüfung bestehender Annahmen.
                
                Sie arbeiten mit standardisierten Fragen und vorgegebenen Antwortoptionen, um vergleichbare und statistisch auswertbare Daten zu erheben. Geeignet zur Messung von Häufigkeiten und Verteilungen.
              `}
              />
            </AccordionItem>

            <AccordionItem headline="Qualitative Interviews">
              <RichText
                markdown={dedent`
               Qualitative Interviews dienen der Gewinnung neuer Erkenntnisse.
               
               Sie machen Erfahrungen, Perspektiven und Zusammenhänge sichtbar und ermöglichen ein vertieftes Verständnis der Praxis. Die Fragen sind offen, der Gesprächsverlauf flexibel.
              `}
              />
            </AccordionItem>
          </div>

          <div className="space-y-8">
            <Heading tagName="h4">Qualitative Interview-Formen</Heading>
            <p>
              Je nach Projektphase und Informationsbedarf eignen sich
              unterschiedliche Interviewformen:
            </p>
          </div>

          <div>
            {/* Not shown for now */}
            {/* <AccordionItem headline="Freies Interview">
              <RichText
                markdown={dedent`
                - **Konzept:** Keine vorformulierten Fragen, lediglich ein grober Leitfaden als Gedankenstütze. Das Gespräch folgt dem Gedankengang der befragten Person.
                - **Einsatz:** Ideal für die Voruntersuchung, wenn noch wenig Wissen über das Feld vorliegt oder sensible Themen (Kritik, Optimierungspotenziale) identifiziert werden sollen.
                - **Kernnutzen:** Maximaler Erkenntnisgewinn durch volle Flexibilität.
              `}
              />
            </AccordionItem> */}

            <AccordionItem headline="Standardisiertes Leitfaden-Interview">
              <RichText
                markdown={dedent`
             Das Interview folgt einem festen, vorab definierten Fragenkatalog. Abweichungen sind nicht vorgesehen. Es eignet sich, wenn relevante Informationen bereits bekannt sind und systematisch erhoben werden sollen.
              `}
              />
            </AccordionItem>

            <AccordionItem headline="Halb-standardisiertes Leitfaden-Interview">
              <RichText
                markdown={dedent`
                Ein Interviewleitfaden gibt die Themen vor, lässt aber Spielraum in Reihenfolge und Formulierung der Fragen. Das Format ermöglicht gezielte Vertiefungen und neue Erkenntnisse bei gleichzeitig überschaubarem Auswertungsaufwand.
              `}
              />
            </AccordionItem>
          </div>
        </section>

        <section className="container">
          <InfoBox
            look="highlight"
            heading={{
              text: "Akteurinnen und Akteure identifizieren und Interviews vorbereiten ",
              tagName: "h2",
            }}
            visual={{
              Icon: SocialDistanceOutlined,
              type: "icon",
            }}
          >
            <RichText
              markdown={dedent`
                In dem nachfolgenden Abschnitt finden Sie eine Anleitung wie sie relevante Akteurinnen und Akteure aus dem Vollzug identifizieren und den Leitfaden erstellen.
              `}
            />
            <LinkButton
              to={ROUTE_METHODS_INTERVIEW_METHODS_STEPS.url}
              look="tertiary"
              className="self-start"
            >
              Zur Anleitung
            </LinkButton>
          </InfoBox>
        </section>

        <hr className="container border-gray-400" />

        <section className="container space-y-8">
          <Heading tagName="h2">Relevante Quellen</Heading>
          <RichText
            markdown={dedent`
            - [Öffentliches Gestalten](https://www.oeffentliches-gestalten.de/)
            - [Servicehandbuch](https://www.digitale-verwaltung.de/SharedDocs/downloads/Webs/DV/DE/servicehandbuch.pdf?__blob=publicationFile&v=5#page=18)
            - [Servicestandard – Handbuch](https://servicestandard.gov.de/handbuch/#aus-der-praxis/)
          `}
          />
        </section>
      </main>
    </>
  );
}
