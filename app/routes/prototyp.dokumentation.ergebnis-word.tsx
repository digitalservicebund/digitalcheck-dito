import { CheckCircleOutlined } from "@digitalservicebund/icons/index";
import Box from "~/components/Box";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import { NumberedList } from "~/components/List";
import RichText from "~/components/RichText";
import { documentation } from "~/resources/content/dokumentation";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import {
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_WORD,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { result } = prototypeDocumentation;
const { title } = result;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export default function DocumentationResult() {
  return (
    <>
      <div className="bg-blue-100 py-40 print:pb-0">
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
            <Box
              heading={{
                text: result.data.title,
                tagName: "h2",
              }}
              content={{ markdown: result.data.text }}
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
            <Box
              heading={{
                text: "Dokumentation abstimmen",
                tagName: "h2",
              }}
              content={{
                markdown:
                  "Laden Sie die Dokumentation als Word-Datei herunterladen, um sie abzustimmen oder an den NKR zu senden.",
              }}
            />
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
      <Container>
        <NumberedList
          heading={{
            tagName: "h2",
            text: documentation.nextSteps.title,
          }}
          items={documentation.nextSteps.items}
        />
      </Container>
      <FeedbackForm
        className="relative left-1/2 w-screen -translate-x-1/2"
        {...result.feedbackForm}
      />
    </>
  );
}
