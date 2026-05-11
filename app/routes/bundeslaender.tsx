import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import NewTabLink from "~/components/NewTabLink";
import Timeline from "~/components/Timeline";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { contact } from "~/resources/content/shared/contact";
import { assetPath } from "~/utils/assetPath";
import { features } from "~/utils/featureFlags";

export default function BundeslaenderInfoPage() {
  const enableBundeslaenderContent = useFeatureFlag(
    features.showBundeslaenderContent,
  );

  if (!enableBundeslaenderContent) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  return (
    <>
      <MetaTitle />
      <main>
        <Hero title="Gemeinsamer Digitalcheck für Bund und Länder"></Hero>
        <div className="bg-blue-300">
          <Container className="flex flex-col py-0 lg:flex-row">
            <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
              <p>
                Weniger Doppelstrukturen, mehr Kooperation: Die{" "}
                <NewTabLink to="https://bmds.bund.de/themen/staatsmodernisierung/modernisierungsagenda-bund">
                  Modernisierungsagenda Bund
                </NewTabLink>{" "}
                gibt im Handlungsfeld II Bessere Rechtsetzung vor, bestehende
                Instrumente, Werkzeuge und Methoden im Zentrum für Legistik zu
                konsolidieren und diese Angebote für Länder, Kommunen und
                Körperschaften nutzbar zu machen.
              </p>
              <p>
                Die{" "}
                <NewTabLink to="https://bmds.bund.de/themen/staatsmodernisierung/modernisierungsagenda-foederal">
                  Modernisierungsagenda Föderal{" "}
                </NewTabLink>
                hält fest, dass die bereits erarbeiteten Methoden des
                Digitalchecks weiterentwickelt, angewendet und von Bund und
                Ländern wechselseitig zur Verfügung gestellt werden sollen.
                Langfristig soll der Abbau von Doppelstrukturen im föderalen
                System gefördert werden.
              </p>
              <br></br>
              <p>
                In diesem Sinne hat der Bund bereits mit drei Bundesländern eine
                Kooperation zur Nutzung des Digitalcheck Bund gestartet.
              </p>
            </div>
            <div className="relative max-lg:mb-48 max-sm:hidden lg:w-1/2">
              <div className="flex h-full w-[630px] flex-col justify-center align-middle lg:w-[50vw] [&>img]:object-contain lg:[&>img]:h-[550px]">
                <Image
                  url={assetPath("/images/bundeslaender.png")}
                  alternativeText="Eine stilisierte Karte von Deutschland mit den Grenzen der Bundesländer auf blauem Hintergrund."
                />
              </div>
            </div>
          </Container>
        </div>
        <ContentWrapper compactTopSpacing>
          <div className="py-40">
            <Heading tagName="h2" className="pb-8">
              Angebot
            </Heading>
            <p>
              Durch eine Kooperation mit dem Bund können Sie den Digitalcheck
              für Ihr Bundesland direkt auf der Webseite des Digitalcheck Bund
              integrieren.
            </p>
            <br></br>
            <ul>
              <li>
                <b>Personalisierte Landingpage:</b> Die Webseite für Ihren
                Digitalcheck wird vom Team des Digitalcheck Bund aufgebaut,
                gewartet und basierend auf Ihren Vorstellungen umgesetzt.
              </li>
              <li>
                <b>Individuelle Inhalte:</b> Die inhaltliche Verantwortung liegt
                bei Ihnen. Sie erhalten einen Leitfaden, der Sie bei der
                Erstellung von verständlichen und barrierefreien Inhalten
                unterstützt. Die Inhalte können jederzeit aktualisiert werden.
              </li>
              <li>
                <b>Persönliche Unterstützung:</b> Das Team des Digitalcheck Bund
                steht Ihnen für Rückfragen und Anpassungen zur Verfügung. In
                gemeinsamen Gesprächen gehen wir auf Ihre Bedürfnisse ein.
              </li>
              <li>
                <b>Klare Prozesse für bessere Rechtsetzung:</b> Sie stellen
                Digitaltauglichkeit für Ihre Regelungsvorhaben auf Landesebene
                sicher. Damit tragen Sie zum gemeinsamen Ziel von Bund und
                Ländern bei, eine verständliche, praxistaugliche und
                wirkungsorientierte Gesetzgebung sicherzustellen.
              </li>
            </ul>
            <Image
              url={assetPath("/images/example-laender-page.png")}
              alternativeText="Ein Laptop auf hellblauem Hintergrund zeigt den grafischen Entwurf einer Webseite der hessischen Landesregierung."
              className="h-340 w-630 pt-40"
            ></Image>
          </div>
          <div className="py-40">
            <Heading tagName="h2">
              Prozess: Kooperation und Erstellung Ihrer Landingpage
            </Heading>
            <Timeline>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">Schritt 1: Kontakt aufnehmen</Heading>
                  <p>
                    Kontaktieren Sie uns bei Interesse direkt unter{" "}
                    {contact.bmdsEmail}.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">Schritt 2: Gemeinsamer Termin</Heading>
                  <p>
                    In einem gemeinsamen Termin besprechen wir gegenseitige
                    Anforderungen und Möglichkeiten.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">
                    Schritt 3: Kooperationsvereinbarung
                  </Heading>
                  <p>
                    Eine Kooperationsvereinbarung zwischen Ihrem Bundesland und
                    dem Bundesministerium für Digitales und Staatsmodernisierung
                    wird unterzeichnet.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">Schritt 4: Inhalte erstellen</Heading>
                  <p>
                    Sie erstellen die Inhalte, die auf Ihrer personalisierten
                    Landingpage abgebildet werden sollen. Dazu zählen bspw.
                    Informationen zum Prozess, den jeweiligen Ansprechpartnern
                    und den landesspezifischen Anforderungen.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">
                    Schritt 5: Erstellung der Unterseite
                  </Heading>
                  <p>
                    Das Team des Digitalcheck Bund legt eine neue Unterseite für
                    Ihr Bundesland an.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item bullet className="max-w-a11y w-full">
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-80 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3">Schritt 6: Freigabe</Heading>
                  <p>
                    Die Unterseite wird vor Veröffentlichung von Ihnen überprüft
                    und freigegeben.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
            </Timeline>
          </div>
        </ContentWrapper>
        <aside className="bg-blue-300" aria-labelledby="support-banner-heading">
          <Container className="ds-stack py-80">
            <InfoBox
              heading={{
                tagName: "h2",
                look: "ds-subhead font-bold",
                text: "Kontakt",
                id: "support-banner-heading",
              }}
            >
              <p>
                Sie haben Interesse an einer Kooperationsvereinbarung oder
                Rückfragen zum Prozess? Kontaktieren Sie uns unter{" "}
                {contact.bmdsEmail}.
              </p>
              <br></br>
              <p>Ansprechpartnerin: Katharina Berndt</p>
            </InfoBox>
          </Container>
        </aside>
      </main>
    </>
  );
}
