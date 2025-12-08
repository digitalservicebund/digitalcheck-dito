import { ContactPhoneOutlined } from "@digitalservicebund/icons";
import { Link } from "react-router";
import AccordionItem from "~/components/AccordionItem";
import { LinkButton } from "~/components/Button";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import NewTabLink from "~/components/NewTabLink";
import RichText from "~/components/RichText";
import TabGroupWithUrlState from "~/components/Tabs/TabsWithUrlState";
import Timeline from "~/components/Timeline";
import { interoperability } from "~/resources/content/interoperabel";
import {
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import { getTabAnchorLink } from "~/utils/tabs";

export default function Interoperability() {
  return (
    <>
      <MetaTitle prefix={ROUTE_INTEROPERABILITY.title} />
      <Hero
        title={interoperability.headline}
        subtitle={interoperability.content}
      />

      <div className="bg-blue-300">
        <Container className="flex flex-col py-0 lg:h-[626px] lg:flex-row">
          <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
            <Heading
              tagName="h2"
              text={interoperability.andDigitalReadiness.headline}
              className="mb-8"
            />
            <RichText markdown={interoperability.andDigitalReadiness.content} />
          </div>
          <div className="relative max-lg:mb-48 max-sm:hidden lg:w-1/2">
            <div className="flex h-full w-[630px] flex-col justify-center bg-[#9FB6C6] align-middle lg:w-[50vw] [&>img]:object-contain lg:[&>img]:h-[550px]">
              <Image
                url={interoperability.andDigitalReadiness.image.url}
                alternativeText={
                  interoperability.andDigitalReadiness.image.alternativeText
                }
              />
            </div>
          </div>
        </Container>
        <div className="sm:hidden">
          <Image
            url={interoperability.andDigitalReadiness.image.url}
            alternativeText={
              interoperability.andDigitalReadiness.image.alternativeText
            }
          />
        </div>
      </div>
      <ContentWrapper>
        <TabGroupWithUrlState>
          <TabGroupWithUrlState.TabList>
            <TabGroupWithUrlState.Tab>Überblick</TabGroupWithUrlState.Tab>
            <TabGroupWithUrlState.Tab>Hintergrund</TabGroupWithUrlState.Tab>
            <TabGroupWithUrlState.Tab>Häufige Fragen</TabGroupWithUrlState.Tab>
          </TabGroupWithUrlState.TabList>
          <TabGroupWithUrlState.TabPanels>
            <TabGroupWithUrlState.TabPanel className="mb-80">
              <div className="space-y-40">
                <Heading tagName="h2">Überblick</Heading>

                <div className="space-y-8">
                  <Heading tagName="h3">Koordination ist der Schlüssel</Heading>
                  <p>
                    Damit ein digitales Europa ohne Grenzen Wirklichkeit wird,
                    müssen die Mitgliedsstaaten verbindlich koordiniert
                    zusammenarbeiten. Die Verordnung soll Insellösungen
                    verhindern und schafft deshalb einen gemeinsamen Rahmen für
                    die Zusammenarbeit. Seit Anfang 2025 sind die
                    Mitgliedsstaaten verpflichtet, Anforderungen an die
                    Interoperabilität zu berücksichtigen.
                  </p>
                </div>

                <div className="space-y-8">
                  <Heading tagName="h3">
                    Was bedeutet das für die Erarbeitung von Regelungen?
                  </Heading>
                  <p>
                    Für Sie bedeutet das, dass sie grenzüberschreitende
                    Auswirkungen eines Regelungsvorhaben einschätzen sollten,
                    bevor Regelungen geschrieben werden. Denn nur wenn Sie die
                    Interoperabilität von Anfang an mitdenken, schaffen Sie die
                    rechtliche Grundlage für Behörden, um europaweit Daten
                    auszutauschen und funktionierende, grenzüberschreitende
                    Verwaltungsleistungen anzubieten. Abschließend dokumentieren
                    Sie in einem Fragebogen auf dem{" "}
                    <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
                      interoperable Europe-Portal
                    </NewTabLink>
                    , wie sich die Regelungsinhalte sich auf die
                    Interoperabilität auswirken.
                  </p>
                </div>

                <div className="space-y-8">
                  <Heading tagName="h4" className="font-bold">
                    Fragen sie sich:
                  </Heading>
                  <ul>
                    <li>
                      Können nach der aktuellen Rechtslage andere
                      EU-Bürger:innen ein digitales Angebot in diesem
                      Zusammenhang nutzen?
                    </li>
                    <li>Was ist nötig, um das zu ermöglichen?</li>
                  </ul>
                </div>

                <Heading tagName="h3">Der Ablauf im Überblick</Heading>
                <Timeline>
                  <Timeline.Item bullet>
                    <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                      <Heading tagName="h4" className="ds-heading-03-reg">
                        Führen Sie die Vorprüfung durch
                      </Heading>
                      <p>
                        Finden Sie in der{" "}
                        <Link className="text-link" to={ROUTE_PRECHECK.url}>
                          Vorprüfung
                        </Link>{" "}
                        in 6 Fragen heraus, ob Sie in Ihrem Regelungsvorhaben
                        Aspekte der digitalen Umsetzung und EU-Anforderungen an
                        Interoperabilität beachten müssen.
                      </p>
                      <p>
                        Wenn Sie EU-Anforderungen an Interoperabilität beachten
                        müssen, meldet sich das Digitalcheck-Team bei Ihnen für
                        kostenlose, vertrauliche Unterstützung.
                      </p>
                    </Timeline.ItemContent>
                  </Timeline.Item>

                  <Timeline.Item bullet>
                    <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                      <Heading tagName="h4" className="ds-heading-03-reg">
                        Erarbeiten Sie die Regelung
                      </Heading>
                      <p>
                        Erarbeiten Sie Ihre Regelung anhand der{" "}
                        <Link
                          className="text-link"
                          to={ROUTE_METHODS_PRINCIPLES.url}
                        >
                          Fünf Prinzipien für digitaltaugliche Gesetzgebung
                        </Link>
                        . Diese enthalten die Anforderungen an die
                        Interoperabilität. So stellen Sie sicher, dass Ihre
                        Regelung sowohl digitaltauglich als auch interoperabel
                        ist. Kostenlose, vertrauliche Unterstützung erhalten Sie
                        vom Digitalcheck-Team.
                      </p>
                    </Timeline.ItemContent>
                  </Timeline.Item>

                  <Timeline.Item bullet>
                    <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                      <Heading tagName="h4" className="ds-heading-03-reg">
                        Reichen Sie die Interoperabilitäts-Bewertung ein
                      </Heading>
                      <p>
                        Sie dokumentieren in einem Fragebogen auf dem{" "}
                        <Link
                          className="text-link"
                          to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission"
                        >
                          interoperable Europe-Portal
                        </Link>
                        , wie sich die Regelungsinhalte sich auf die
                        Interoperabilität auswirken.
                      </p>
                    </Timeline.ItemContent>
                  </Timeline.Item>
                </Timeline>

                <LinkButton to={ROUTE_PRECHECK.url}>
                  Anforderungen prüfen
                </LinkButton>

                <Heading className="mt-80" tagName="h2">
                  Die Interoperabilitäts-Bewertung
                </Heading>
                <p>
                  Die{" "}
                  <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
                    Interoperabilitäts-Bewertung
                  </NewTabLink>{" "}
                  ist wie auch die Digitalcheck-Dokumentation ein formeller,
                  letzter Schritt, in dem Sie einige Fragen zu Inhalten der
                  Regelung beantworten. Es geht darum, darzulegen, wie sich Ihre
                  Regelung auf die EU-weite Interoperabilität auswirkt. Der
                  wesentliche Inhalt besteht aus fünf Fragen. Die Bewertung
                  fragt nach sogenannten „
                  {/* TODO: helper function for links */}
                  <Link
                    className="text-link"
                    to={getTabAnchorLink(2, "verbindliche-anforderungen")}
                    reloadDocument
                  >
                    {" "}
                    {/* TODO: add link */}
                    verbindlichen Anforderungen
                  </Link>
                  “ und prüft deren Einfluss auf die{" "}
                  <Link
                    className="text-link"
                    to={getTabAnchorLink(
                      2,
                      "vier-ebenen-der-interoperabilitaet",
                    )}
                    reloadDocument
                  >
                    {" "}
                    {/* TODO: add link */}
                    vier Ebenen der Interoperabilität
                  </Link>
                  .
                </p>
                <LinkButton
                  look="tertiary"
                  to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission"
                  target="_blank"
                >
                  Zur Interoperabilitäts-Bewertung
                </LinkButton>

                <InfoBox
                  look="highlight"
                  heading={{
                    text: "Unterstützung durch das Team des Digitalcheck",
                  }}
                  visual={{ Icon: ContactPhoneOutlined, type: "icon" }}
                >
                  <p>
                    Das Digitalcheck-Team unterstützt Sie dabei, eine
                    digitaltaugliche interoperable Umsetzung zu garantieren – im
                    gesamten Prozess: bei der Klärung von Fragen zur
                    Interoperabilität, beim Ausfüllen der Bewertung und
                    insbesondere beim Identifizieren sogenannter „verbindlicher
                    Anforderungen“ und deren Auswirkungen auf die vier Ebenen
                    der Interoperabilität.
                  </p>
                  <p>
                    <strong>Rufen Sie uns an:</strong>{" "}
                    <Link className="text-link" to="tel:+4915140767839">
                      0151 4076 7839
                    </Link>{" "}
                    Schreiben Sie uns - egal ob Legist oder Institution:
                    <Link
                      className="text-link"
                      to="mailto:interoperabel@digitalservice.bund.de"
                    >
                      interoperabel@digitalservice.bund.de
                    </Link>
                  </p>
                </InfoBox>
              </div>
            </TabGroupWithUrlState.TabPanel>
            <TabGroupWithUrlState.TabPanel className="mb-80">
              <div className="space-y-40">
                <Heading tagName="h2">Hintergrund</Heading>
                <div className="space-y-8">
                  <Heading tagName="h3">
                    Das Ziel der Verordnung für ein interoperables Europa
                  </Heading>
                  <p>
                    Das Ziel der{" "}
                    <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903">
                      Verordnung für ein interoperables Europa (EU 2024/903)
                    </NewTabLink>{" "}
                    ist es, digitale öffentliche Dienste zu verbessern. Die
                    Dienste einzelner Mitgliedstaaten sollen miteinander
                    kompatibel sein. Dafür braucht es gemeinsame Standards, um
                    Daten zwischen den Mitgliedstaaten auszutauschen. Um
                    digitale Potenziale und Hindernisse zu berücksichtigen,
                    müssen öffentliche Stellen die Interoperabilität neuer
                    Dienste berücksichtigen.
                  </p>
                  <DetailsSummary title="Welche positiven Effekte sollen dadurch erreicht werden?">
                    <div className="space-y-8">
                      <p>
                        Regelungen, die Interoperabilität berücksichtigen,
                        erleichtern den Datenaustausch und die Wiederverwendung
                        von Lösungen, indem sie bürokratische Hürden abbauen.
                        Dies spart Kosten und Zeit für Bürgerinnen und Bürger,
                        Unternehmen und Verwaltungen. Bis 2030 soll eine
                        verbesserte Interoperabilität öffentliche Verwaltungen
                        enger vernetzen und transeuropäische digitale Dienste
                        fördern.
                      </p>
                      <p>Quellen:</p>
                      <ul>
                        <li>
                          <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903">
                            EUR Lex - Verordnung für ein interoperables Europa
                            (EU 2024/903)
                          </NewTabLink>
                        </li>
                        <li>
                          <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
                            Interoperable Europe Portal - FAQs
                          </NewTabLink>
                        </li>
                      </ul>
                    </div>
                  </DetailsSummary>
                </div>

                <div className="space-y-8">
                  <Heading tagName="h3">
                    So stehen Interoperabilität und Digitaltauglichkeit
                    zueinander
                  </Heading>
                  <Image
                    className="max-w-a11y w-full py-16"
                    url="/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit-old.png"
                    alternativeText="Zusammenhang zwischen Digitaltauglichkeit und EU-Interoperabilität. Zwei sich überschneidende Kreise. In der Schnittmenge sind EU-weite digitale Verwaltungsdienste"
                  />
                  <p>
                    Es gibt eine große Schnittmenge zwischen der
                    EU-Interoperabilität und Digitaltauglichkeit. Daher sind die{" "}
                    <strong>
                      Aspekte der Interoperabilität in die Prinzipien für
                      digitaltaugliche Gesetzgebung integriert
                    </strong>{" "}
                    worden.
                  </p>
                  <p>
                    Da sich die Interoperabilitäts-Verordnung auf digitale
                    Verwaltungsdienste bezieht,{" "}
                    <strong>
                      hat jedes Vorhaben mit Interoperabilitätsbezug auch
                      Digitalbezug
                    </strong>
                    . Umgekehrt gilt das nicht zwingend.
                  </p>
                  <p>
                    Mit Hilfe der <strong>Vorprüfung</strong> können Sie
                    feststellen, ob Ihre Regelung die Anforderungen an
                    Interoperabilität erfüllt.
                  </p>
                  <p>
                    Hier gelangen Sie zur{" "}
                    <Link className="text-link" to={ROUTE_PRECHECK.url}>
                      Vorprüfung
                    </Link>
                    .
                  </p>
                </div>

                <div className="space-y-8">
                  <Heading tagName="h3">
                    Das soll mit Interoperabilitäts-Bewertungen erreicht werden
                  </Heading>
                  <p>
                    Die{" "}
                    <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
                      Interoperabilitäts-Bewertung
                    </NewTabLink>{" "}
                    ist wie auch die Digitalcheck-Dokumentation ein formeller,
                    letzter Schritt, in dem Sie einige Fragen zu Inhalten der
                    Regelung beantworten.
                  </p>
                  <p>
                    Wichtig ist, dass Sie die Interoperabilität von Anfang an
                    mitdenken. So schaffen Sie die rechtliche Grundlage für
                    Behörden, um europaweit Daten auszutauschen und
                    funktionierende, grenzüberschreitende Verwaltungsleistungen
                    anzubieten.
                  </p>
                  <p>
                    Dabei helfen Ihnen die{" "}
                    <Link
                      className="text-link"
                      to={ROUTE_METHODS_PRINCIPLES.url}
                    >
                      5 Prinzipien für digitaltaugliche, interoperable
                      Regelungen
                    </Link>
                    . Auch{" "}
                    <Link
                      className="text-link"
                      to={ROUTE_EXAMPLES_VISUALISATIONS.url}
                    >
                      Prozessvisualisierungen
                    </Link>{" "}
                    sind hilfreich, z.B. um grenzüberschreitende Datenflüsse zu
                    identifizieren. Die Vorgehensweise ist also ganz ähnlich zur
                    bekannten Arbeit an digitaltauglichen Regelungen.
                  </p>
                  <p>
                    Die Interoperabilitäts-Bewertung ist schließlich ein
                    Online-Formular auf{" "}
                    <NewTabLink to="https://interoperable-europe.ec.europa.eu/">
                      interoperable Europe-Portal
                    </NewTabLink>{" "}
                    in dem Sie darzulegen, wie sich Ihre Regelung auf die
                    EU-weite Interoperabilität auswirkt: Der wesentliche Inhalt
                    besteht aus fünf Fragen. Die Bewertung fragt nach
                    sogenannten „
                    <Link
                      className="text-link"
                      to={getTabAnchorLink(2, "verbindliche-anforderungen")}
                      reloadDocument
                    >
                      verbindlichen Anforderungen
                    </Link>
                    “ und prüft deren Einfluss auf die{" "}
                    <Link
                      className="text-link"
                      to={getTabAnchorLink(
                        2,
                        "vier-ebenen-der-interoperabilitaet",
                      )}
                      reloadDocument
                    >
                      vier Ebenen der Interoperabilität
                    </Link>
                    .
                  </p>
                  <DetailsSummary title="Wie sind die Inhalte der Interoperabilitäts-Bewertung?">
                    <ol>
                      <li>
                        Allgemeine Angaben
                        <ul>
                          <li>Angaben zur einreichenden Stelle</li>
                          <li>Betreffende Initiative, Projekt oder Maßnahme</li>
                        </ul>
                      </li>
                      <li>
                        Anforderungen
                        <ul>
                          <li>Bewertete verbindliche Anforderungen</li>
                          <li>
                            Festgestellte Auswirkungen auf die
                            grenzüberschreitende Interoperabilität
                          </li>
                        </ul>
                      </li>
                      <li>
                        Ergebnisse
                        <ul>
                          <li>
                            Lösungen für ein interoperables Europa, die genutzt
                            werden sollen
                          </li>
                          <li>
                            andere einschlägige Interoperabilitätslösungen,
                            einschließlich Maschine-Maschine-Schnittstellen
                            (Sofern zutreffend)
                          </li>
                          <li>
                            Verbleibende Hindernisse für die
                            grenzüberschreitende Interoperabilität
                          </li>
                        </ul>
                      </li>
                    </ol>
                  </DetailsSummary>
                </div>

                <div>
                  <p className="mb-24">
                    Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns
                    unter:{" "}
                    <Link
                      to="mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20digitalcheck.bund.de"
                      className="ds-link-01-bold"
                    >
                      interoperabel@digitalservice.bund.de
                    </Link>{" "}
                    oder rufen Sie uns an unter{" "}
                    <Link to="tel:+4915140767839" className="ds-link-01-bold">
                      0151/40 76 78 39
                    </Link>
                    .
                  </p>

                  <p>Weitere Quellen:</p>
                  <ul>
                    <li>
                      <NewTabLink to="https://ec.europa.eu/isa2/eif_en/">
                        European Commission - European Interoperability
                        Framework
                      </NewTabLink>
                    </li>
                    <li>
                      <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
                        Interoperable Europe Portal - FAQs
                      </NewTabLink>
                    </li>
                  </ul>
                </div>

                <div className="space-y-8">
                  <Heading tagName="h3" id="verbindliche-anforderungen">
                    Verbindliche Anforderungen: In diesen Fällen ist eine
                    Interoperabilitätsbewertung verpflichtend
                  </Heading>
                  <p>
                    Eine Interoperabilitäts-Bewertung muss für Regelungen
                    durchgeführt werden, wenn:
                  </p>
                  <ul>
                    <li>
                      eine (neue) verbindliche Anforderung definiert wird,
                    </li>
                    <li>
                      ein oder mehrere transeuropäische digitale öffentliche
                      Dienste betroffen sind, das heißt
                      <ul>
                        <li>
                          eine digitale Umsetzung vorgesehen oder davon
                          betroffen ist
                        </li>
                        <li>
                          ein Austausch von Daten und Informationen zwischen
                          Verwaltungen der EU-Mitgliedstaaten vorgesehen ist
                        </li>
                        <li>
                          die Anforderung von einer öffentlichen Stelle oder
                          einer Einrichtung der Union festgelegt werden.
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <DetailsSummary title="Was ist eine verbindliche Anforderung?">
                    <div className="space-y-8">
                      <p>
                        Eine <strong>verbindliche Anforderung</strong> ist eine
                        verpflichtende Regel. Das kann z.B. eine Definition, ein
                        Standard, eine Richtlinie, ein Verbot oder eine
                        Beschränkung sein. Eine exakte Definition finden Sie in
                        der{" "}
                        <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903">
                          Verordnung in der Präambel, Erwägungsgrund 18
                        </NewTabLink>
                        .
                      </p>
                      <p>
                        Falls sich eine Berichtspflicht an die Europäische
                        Kommission ergibt, dann unterstützt Sie das
                        Digitalcheck-Team dabei, die Interoperabilitätsbewertung
                        durchzuführen, sie zu dokumentieren und den Bericht
                        einzureichen.
                      </p>
                      <p>Weitere Quellen:</p>
                      <ul>
                        <li>
                          <NewTabLink to="https://ec.europa.eu/isa2/eif_en/">
                            European Commission - European Interoperability
                            Framework
                          </NewTabLink>
                        </li>
                        <li>
                          <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
                            Interoperable Europe Portal - FAQs
                          </NewTabLink>
                        </li>
                      </ul>
                    </div>
                  </DetailsSummary>
                  <ImageZoomable
                    image={{
                      url: "/images/kriterien-interoperabilitaetsbewertung-entscheidungsbaum.png",
                      alternativeText:
                        "Ein Entscheidungsdiagramm zur Bestimmung der Verpflichtung zur Interoperabilitätsbewertung. Es beginnt mit der Frage, ob es sich um eine verbindliche Anforderung handelt. Je nach Antwort folgen verschiedene Entscheidungsstufen: Offenheit für Änderungen, Verpflichtung, digitale öffentliche Dienstleistungen, betroffene Akteure und Notwendigkeit des Austauschs in Netzwerken oder Informationssystemen. Wenn alle Bedingungen erfüllt sind, führt der Prozess zur verpflichtenden Interoperabilitätsbewertung. Andernfalls ist sie nicht verpflichtend.",
                    }}
                  />
                </div>

                <div className="space-y-8">
                  <Heading tagName="h3" id="vier-ebenen-der-interoperabilitaet">
                    Die vier Ebenen der Interoperabilität
                  </Heading>
                  <p>
                    Der{" "}
                    <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail">
                      Europäische Interoperabilitäts-Rahmen (EIF)
                    </NewTabLink>{" "}
                    definiert vier Ebenen der Interoperabilität, die bei der
                    Gesetzgebung berücksichtigt werden müssen:
                  </p>
                  <ul>
                    <li>
                      <strong>Rechtliche Interoperabilität</strong>: Gesetze
                      sollten die Grundlage für grenzüberschreitenden
                      Datenaustausch schaffen. Regelungen sollten sich dabei
                      nicht gegenseitig widersprechen, sondern gegenseitige
                      Anerkennung sicherstellen und dafür sorgen, dass
                      rechtliche Rahmenbedingungen jeweils zusammen passen.
                    </li>
                    <li>
                      <strong>Organisatorische Interoperabilität</strong>:
                      Gesetze sollten die Zusammenarbeit zwischen den
                      Verwaltungsstellen fördern, indem sie gemeinsame
                      Geschäftsprozesse und Modelle festlegen. Dies beinhaltet
                      die Koordination von Aufgaben und die Klärung der Rollen.
                    </li>
                    <li>
                      <strong>Semantische Interoperabilität</strong>: Gesetze
                      sollten die Verwendung gemeinsamer Vokabulare und
                      Datenformate vorschreiben, um sicherzustellen, dass die
                      Bedeutung der ausgetauschten Daten von allen Systemen die
                      gleiche ist.
                    </li>
                    <li>
                      <strong>Technische Interoperabilität</strong>: Technische
                      Standards, Schnittstellen und Komponenten sollten
                      aufeinander abgestimmt sein, damit Datenaustausch zwischen
                      Diensten in Europa ermöglichen.
                    </li>
                  </ul>
                </div>
                <Image
                  className="max-w-a11y w-full py-16"
                  url="/images/ebenen-der-interoperabilitaet.jpg"
                  alternativeText="Die Grafik veranschaulicht die vier Ebenen der Interoperabilität mit Symbolen und kurzen Erklärungen. Die rechtliche Interoperabilität (dunkelblau, Waage-Icon) definiert die gesetzlichen Grundlagen für den Datenaustausch. Die organisatorische Interoperabilität (hellblau, vernetzte Personen) beschreibt die organisatorischen Prozesse. Die semantische Interoperabilität (graublau, Sprechblasen) stellt sicher, dass Daten und Begriffe einheitlich verstanden werden. Die technische Interoperabilität (hellgrau, Zahnräder) umfasst die technischen Systeme und Standards, die für den Datenaustausch erforderlich sind."
                />
              </div>
            </TabGroupWithUrlState.TabPanel>
            <TabGroupWithUrlState.TabPanel className="mb-80">
              <>
                <Heading
                  tagName="h2"
                  text={interoperability.faq.headline}
                  className="mb-8"
                />
                <RichText
                  markdown={interoperability.faq.content}
                  className="mb-40"
                />
                <div>
                  {interoperability.faq.items.map((item) => (
                    <AccordionItem key={item.headline} headline={item.headline}>
                      <RichText markdown={item.content} />
                    </AccordionItem>
                  ))}
                </div>
              </>
            </TabGroupWithUrlState.TabPanel>
          </TabGroupWithUrlState.TabPanels>
        </TabGroupWithUrlState>
      </ContentWrapper>

      <div className="px-[clamp(1rem, 5vw, 3rem)] bg-blue-100 py-48">
        <Container>
          <Container overhangingBackground className="bg-white">
            <Heading
              tagName="h2"
              text={interoperability.resources.headline}
              className="mb-8"
            />
            <p>{interoperability.resources.subtitle}</p>
            {interoperability.resources.groups.map((group) => (
              <div key={group.title} className="mt-10 p-24 pl-0">
                <div className="mb-10 flex items-center">
                  <group.icon className="mr-10 size-32" />
                  <Heading
                    tagName="h3"
                    look="ds-label-01-bold"
                    text={group.title}
                  />
                </div>
                <p className="mb-20">{group.subtitle}</p>
                <RichText markdown={group.content} />
              </div>
            ))}
          </Container>
        </Container>
      </div>
    </>
  );
}
