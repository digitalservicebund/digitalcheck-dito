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
import NewTabLink from "~/components/NewTabLink";
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
        <Hero title="Perspektiven aus der Praxis einbinden">
          <p>
            Dieser Leitfaden dient als praktisches Werkzeug, um wertvolle
            Erkenntnisse aus der Umsetzung zu gewinnen. Identifizieren Sie
            relevante Stakeholder und bereiten Sie Interviews strukturiert vor.
            So gelingt der Transfer von praktischer Erfahrung in praxistaugliche
            Regelungen.
          </p>

          <p>
            Die Inhalte sind auf Basis von den unten aufgeführten Quellen
            entstanden.
          </p>
        </Hero>

        <section className="container space-y-40">
          <Heading tagName="h2">
            Die Mehrwerte von Interviews mit Akteurinnen und Akteuren aus dem
            Vollzug
          </Heading>

          <div className="space-y-32 md:grid md:grid-cols-3 md:space-y-0 md:gap-x-40">
            <div className="space-y-16">
              <AnnouncementOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Erkenntnisse zur Umsetzungspraxis:**
                
                Sie liefern Erkenntnisse darüber, wie Regelungen im Vollzug tatsächlich wirken.
              `}
              />
            </div>

            <div className="space-y-16">
              <RuleOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Annahmen überprüfen:**
                
                Sie machen sichtbar, was funktioniert und was in der Praxis scheitert.
              `}
              />
            </div>

            <div className="space-y-16">
              <MergeTypeOutlined className="size-40 fill-yellow-500 md:size-80" />
              <RichText
                className="ds-label-01-reg"
                markdown={dedent`
                **Verbesserte Entscheidungsgrundlage:**
                
                Die Erkenntnisse helfen, Services, Prozesse und Regeln gezielt zu verbessern.
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
                Quantitative Interviews dienen der Überprüfung bestehender Annahmen. Sie arbeiten mit standardisierten Fragen und vorgegebenen Antwortoptionen, um vergleichbare und statistisch auswertbare Daten zu erheben. Geeignet zur Messung von Häufigkeiten und Verteilungen.
              `}
              />
            </AccordionItem>

            <AccordionItem headline="Qualitative Interviews">
              <RichText
                markdown={dedent`
               Qualitative Interviews dienen der Gewinnung neuer Erkenntnisse. Sie machen Erfahrungen, Perspektiven und Zusammenhänge sichtbar und ermöglichen ein vertieftes Verständnis der Praxis. Die Fragen sind offen, der Gesprächsverlauf flexibel.
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
          <p>
            Weiterführende Quelle:{" "}
            <NewTabLink to="https://www.orghandbuch.de/SharedDocs/faqs/Webs/OHB/DE/Methoden_Befragung/13_Durchfuehrung_muendliches_Interview.html">
              Orghandbuch des BMI 2026
            </NewTabLink>
          </p>
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
          <Heading tagName="h2">Genutzte Quellen</Heading>
          <RichText
            markdown={dedent`
            - Öffentliches Gestalten
            - Servicehandbuch
            - ....
          `}
          />
        </section>
      </main>
    </>
  );
}
