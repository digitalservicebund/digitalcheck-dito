import {
  ChecklistRtl,
  SimCardDownloadTwoTone,
  TipsAndUpdatesOutlined,
  ViewListTwoTone,
} from "@digitalservicebund/icons";
import { DownloadLinkButton } from "~/components/Button";
import Container from "~/components/Container.tsx";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import { Feature, FeatureList } from "~/components/FeatureList.tsx";
import Heading from "~/components/Heading.tsx";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox.tsx";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import NumberedList from "~/components/NumberedList.tsx";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { supportBanner } from "~/resources/content/shared/support-banner";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_TEMPLATE_WORD,
} from "~/resources/staticRoutes";
import { DocumentationContinueActions } from "~/routes/dokumentation/DocumentationContinueActions.tsx";

const { start } = digitalDocumentation;

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION.title} />
      <main>
        <Hero title={start.title} subtitle={start.subtitle}>
          <div className="mt-40 space-y-40">
            <DocumentationContinueActions />
            <noscript>
              <InlineNotice
                look="warning"
                heading={
                  <Heading tagName="h2">{start.noscript.headline}</Heading>
                }
                className="mb-40"
              >
                <RichText markdown={start.noscript.content} />
              </InlineNotice>
            </noscript>

            <div className="space-y-8">
              <RichText markdown={start.alternative.text} />

              <DownloadLinkButton
                to={ROUTE_DOCUMENTATION_TEMPLATE_WORD.url}
                look="link"
              >
                {start.alternative.buttonText}
              </DownloadLinkButton>
            </div>
          </div>
        </Hero>

        <ContentWrapper className={"space-y-80"}>
          <section className="space-y-40">
            <Heading tagName="h2">Vorteile der Online-Dokumentation</Heading>
            <FeatureList>
              <Feature>
                <ViewListTwoTone className="fill-ds-feature size-80" />
                <p>
                  Sie werden <strong>Schritt für Schritt</strong> geführt und
                  setzen eigene <strong>Schwerpunkte</strong>. Beispiele
                  erleichtern das Erfassen der Digitaltauglichkeit.
                </p>
              </Feature>
              <Feature>
                <SimCardDownloadTwoTone className="fill-ds-feature size-80" />
                <p>
                  Bearbeiten Sie die Dokumentation{" "}
                  <strong>flexibel im Formular</strong> oder speichern Sie sie
                  als <strong>Word-Datei</strong>. Abschließend senden Sie die
                  Angaben an den NKR.
                </p>
              </Feature>
              <Feature>
                <ChecklistRtl className="fill-ds-feature size-80" />
                <p>
                  <strong>Vorgegebene Schwerpunkte</strong> entsprechen den
                  Anforderungen der Digitaltauglichkeit und erleichtern die{" "}
                  <strong>Prüfung</strong> durch den NKR.
                </p>
              </Feature>
            </FeatureList>
          </section>
          <section className="space-y-40">
            <Heading tagName="h2">So funktioniert es</Heading>
            <NumberedList>
              <NumberedList.Item className={"space-y-8"}>
                <p className="ds-heading-03-reg">
                  Bearbeiten Sie die Dokumentation online
                </p>
                <p>
                  Sie durchlaufen einen geführten Prozess, der auf den fünf
                  Prinzipien für digitaltaugliche Gesetzgebung basiert.
                  Alternativ können Sie die Dokumentation als Word-Datei
                  herunterladen und bearbeiten.
                </p>
              </NumberedList.Item>
              <NumberedList.Item className={"space-y-8"}>
                <p className="ds-heading-03-reg">
                  Senden Sie die ausgefüllte Dokumentation an den NKR
                </p>
                <p>
                  Exportieren Sie Ihre Eingaben als Word-Datei und schicken Sie
                  sie zu jedem Zeitpunkt per E-Mail an den NKR.
                </p>
              </NumberedList.Item>
            </NumberedList>
          </section>
        </ContentWrapper>
        <div className="bg-blue-100 py-80 max-lg:px-16">
          <Container className="bg-white">
            <InfoBox
              visual={{
                type: "icon",
                Icon: TipsAndUpdatesOutlined,
                className: "fill-blue-300",
              }}
              heading={{
                tagName: "h2",
                text: "Hilfreiche Tipps zum Ausfüllen der Dokumentation",
                look: "ds-heading-03-reg",
              }}
            >
              <p>
                <strong>Aufwand sparen:</strong> Fassen Sie zusammengehörige
                Regelungen in einer Dokumentation zusammen.
              </p>
              <p>
                <strong>Zweite Meinung nutzen:</strong> Teilen Sie
                Zwischenstände mit Kollegen und Kolleginnen, um Feedback
                einzuholen.
              </p>
              <p>
                <strong>Visualisierung einbeziehen:</strong> Verwenden Sie
                bestehende Visualisierungen mit den fünf Prinzipien als
                Grundlage und senden Sie sie am Ende mit an den NKR.
              </p>
            </InfoBox>
          </Container>
        </div>
      </main>
      <SupportBanner {...supportBanner} />
    </>
  );
}
