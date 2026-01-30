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
                Diese Methode dient dazu, bekannte Annahmen statistisch zu untermauern und vergleichbare Daten zu generieren.
                - **Struktur:** Ein strikt standardisierter Fragenkatalog mit meist vorgegebenen Antwortmöglichkeiten.
                - **Ziel:** Ermittlung von Häufigkeiten und Verteilungen (z. B. „Wie oft tritt ein bestimmtes Problem in der Praxis auf?“).
                - **Vorteil:** Die Ergebnisse sind objektiv messbar und lassen sich statistisch präzise auswerten.
              `}
              />
            </AccordionItem>

            <AccordionItem headline="Qualitative Interviews">
              <RichText
                markdown={dedent`
                Hier steht das Verstehen von Zusammenhängen und Hintergründen im Vordergrund.
                - **Struktur:** Offene Fragen lassen Raum für individuelle Erfahrungen und unterschiedliche Perspektiven.
                - **Ziel:** Exploration neuer Erkenntnisse und tiefergehender Kontexte.
                - **Vorteil:** Flexibilität im Gespräch erlaubt es, auch unvorhergesehene Themen detailliert zu beleuchten.
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

            <AccordionItem headline="Standardisiertes Interview">
              <RichText
                markdown={dedent`
                - **Konzept:** Ein fester Fragenkatalog wird ohne Abweichungen abgearbeitet. Wortlaut und Reihenfolge sind für alle Befragten identisch.
                - **Einsatz:** Zur Erhebung detaillierter, vergleichbarer Daten, wenn die relevanten Aspekte bereits bekannt sind.
                - **Kernnutzen:** Hohe Vergleichbarkeit der Ergebnisse. Eignet sich primär zur Gewinnung quantitativ auswertbarer Informationen.
              `}
              />
            </AccordionItem>

            <AccordionItem headline="Halb-standardisiertes Interview">
              <RichText
                markdown={dedent`
                - **Konzept:** Ein vorbereiteter Leitfaden sichert die Vollständigkeit der Themen, lässt aber Raum für individuelle Nachfragen und situative Anpassungen.
                - **Einsatz:** Für die Aufgabenerhebung und zur Vertiefung bereits gewonnener Informationen.
                - **Kernnutzen:** Es bietet genug Struktur für eine effiziente Auswertung, ist aber flexibel genug, um neuen Spuren im Gespräch nachzugehen.
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
