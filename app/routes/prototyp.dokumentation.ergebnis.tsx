import { CheckCircleOutlined } from "@digitalservicebund/icons";

import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { NumberedList } from "~/components/List";
import SupportBanner from "~/components/SupportBanner";
import { documentation } from "~/resources/content/dokumentation";
import { prototypeDocumentation } from "~/resources/prototyp-dokumentation";
import { ROUTE_PROTOTYPE_DOCUMENTATION_RESULT } from "~/resources/staticRoutes";
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
            {/*<div className="mt-32 print:hidden">*/}
            {/*  <ResultForm*/}
            {/*    result={result}*/}
            {/*    answers={answers}*/}
            {/*    setVorhabenTitle={setVorhabenTitle}*/}
            {/*  />*/}
            {/*</div>*/}
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
      <SupportBanner />
    </>
  );
}
