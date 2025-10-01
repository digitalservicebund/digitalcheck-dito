import { CheckCircleOutlined } from "@digitalservicebund/icons";
import { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import { documentation } from "~/resources/content/dokumentation";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD,
} from "~/resources/staticRoutes";
import { renderButtonContainer } from "~/utils/resourceUtils.tsx";

const { result } = prototypeDocumentation;
const { title } = result;

export default function DocumentationResult() {
  return (
    <>
      <MetaTitle prefix={ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title} />
      <div className="bg-blue-100 py-80 print:pb-0">
        <div className="px-16">
          <Container className="rounded-t-lg bg-blue-300 py-32">
            <div className="flex flex-col gap-16 sm:flex-row">
              <div className="flex size-36 flex-none items-center justify-center">
                <CheckCircleOutlined className="h-full w-full" />
              </div>
              <Header
                heading={{
                  tagName: "h1",
                  look: "ds-heading-02-reg",
                  markdown: title,
                  className: "mb-0",
                }}
              />
            </div>
          </Container>
          <Container className="rounded-b-lg bg-white">
            <InfoBox
              heading={{
                text: result.data.title,
                tagName: "h2",
              }}
              content={result.data.text}
            />
            <DetailsSummary
              title="Alle Eingaben"
              content={result.data.dummyOverview}
              className="mt-12"
            />
            <ButtonContainer
              buttons={[
                {
                  text: result.data.buttonBack,
                  look: "tertiary",
                  onClick: () =>
                    alert("Diese Funktion ist für den Test nicht verfügbar."),
                },
              ]}
              className="mt-40"
            />
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            <InfoBox
              heading={{
                text: "Dokumentation abstimmen",
                tagName: "h2",
              }}
            >
              Laden Sie die Dokumentation als Word-Datei herunterladen, um sie
              abzustimmen oder an den NKR zu senden.
            </InfoBox>
            <ButtonContainer
              buttons={[
                {
                  text: "Dokumentation herunterladen (Word-Datei)",
                  href: ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD.url,
                },
              ]}
              className="mt-40"
            />
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            <form method="post">
              <fieldset className="ds-stack ds-stack-24">
                <legend>
                  <Heading tagName="h2" text={result.form.formLegend} />
                </legend>
                <div className="flex items-start pb-[40px]">
                  <div className="ds-stack ds-stack-16 flex-grow">
                    <RichText
                      markdown={`
- Speichern Sie die fertige Dokumentation als PDF ab oder laden Sie sie hier herunter. 
- Senden Sie die **PDF-Datei per E-Mail** an folgende Adresse: nkr@bmj.bund.de. Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine **digital- und praxistaugliche Umsetzung**.
- Bei Interoperabilitätsbezug senden Sie eine Kopie der E-Mail mit der PDF-Datei an interoperabel@digitalservice.bund.de 
- Visuelle Darstellungen und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
- Damit ist der Digitalcheck für Sie beendet.
      `}
                    />
                  </div>
                </div>
              </fieldset>
            </form>
            <ButtonContainer
              buttons={[
                {
                  text: "Dokumentation herunterladen (PDF-Datei)",
                  href: ROUTE_PROTOTYPE_DOCUMENTATION_META.url,
                  look: "tertiary",
                },
              ]}
              className="mb-40"
            />
            <hr className="mb-32 border-t-[2px] border-gray-400" />
            <div className="ds-stack ds-stack-16 mt-40">
              <Heading tagName="h2" text={result.form.faqs.title} />
              {result.form.faqs.details.map((detail, index) => (
                <DetailsSummary
                  className={`plausible-event-name=Content.Content+Info.Accordion+FAQ${index + 1}`}
                  key={detail.label}
                  title={detail.label}
                  content={detail.text}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
      <Container className="my-80 space-y-32 py-0">
        <Heading tagName="h2">{documentation.nextSteps.title}</Heading>
        <NumberedList>
          {documentation.nextSteps.items.map((item) => (
            <NumberedList.Item
              className="space-y-16"
              key={item.headline.text}
              disabled={item.isDisabled}
            >
              <p className="ds-heading-03-reg">{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
              {"buttons" in item &&
                renderButtonContainer(item.buttons as ButtonLinkProps[])}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
    </>
  );
}
