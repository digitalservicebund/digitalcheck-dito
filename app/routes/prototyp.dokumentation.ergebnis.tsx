import {
  CheckCircleOutlined,
  FileDownloadOutlined,
} from "@digitalservicebund/icons";

import Background from "~/components/Background";
import Box from "~/components/Box";
import Button from "~/components/Button.tsx";
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
  ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE,
  ROUTE_PROTOTYPE_DOCUMENTATION_META,
  ROUTE_PROTOTYPE_DOCUMENTATION_RESULT,
  ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import constructMetaTitle from "~/utils/metaTitle";

const { result } = prototypeDocumentation;
const { title } = result;

export function meta() {
  return constructMetaTitle(ROUTE_PROTOTYPE_DOCUMENTATION_RESULT.title);
}

export default function DocumentationResult() {
  return (
    <>
      <Background backgroundColor="blue" className="py-40 print:pb-0">
        <div className="px-16">
          <Container className="rounded-t-lg py-32" backgroundColor="midBlue">
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
          <Container className="rounded-b-lg" backgroundColor="white">
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
            <Button
              className="mt-40"
              text={result.data.buttonBack}
              look="tertiary"
              href={ROUTE_PROTOTYPE_DOCUMENTATION_META.url}
            />
            <hr className="mt-40 mb-32 border-t-[2px] border-gray-400" />
            <Box
              heading={{
                text: "Dokumentation speichern",
                tagName: "h2",
              }}
              content={{
                markdown: dedent`
                Laden Sie die Dokumentation als PDF herunter, um sie intern abzustimmen oder direkt an den NKR zu senden.
                
                Sie können alternativ einen Zwischenstand speichern, um später weiterzuarbeiten.`,
              }}
            />
            <ButtonContainer
              buttons={[
                {
                  text: result.data.buttonDownload,
                  href: ROUTE_PROTOTYPE_DOCUMENTATION_STATIC_PDF.url,
                },
                {
                  text: "Zwischenstand speichern",
                  href: ROUTE_PROTOTYPE_DOCUMENTATION_INTERMEDIATE_SAVE.url,
                  look: "ghost",
                  iconLeft: <FileDownloadOutlined />,
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
                    <RichText markdown={result.form.instructions} />
                  </div>
                </div>
              </fieldset>
            </form>
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
      </Background>
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
