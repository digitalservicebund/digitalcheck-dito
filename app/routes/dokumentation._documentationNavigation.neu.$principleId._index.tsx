import { ArrowForward, CheckCircleRounded } from "@digitalservicebund/icons";
import { Link, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { principlePages } = digitalDocumentation;

export default function NewDocumentationPrinciple() {
  const { nextUrl, previousUrl, prinzip } = useOutletContext<
    NavigationContext & { prinzip: PrinzipWithAspekteAndExample }
  >();

  const nextLinkMap = {
    [principlePages.radioOptions[0]]: {
      url: "schwerpunkte",
      description:
        "Erläutern Sie, wie Sie die Schwerpunkte des Prinzips erfüllt haben",
    },
    [principlePages.radioOptions[1]]: {
      url: "nein",
      description: "Erläutern Sie, wieso Sie das Prinzip nicht erfüllen",
    },
    [principlePages.radioOptions[2]]: {
      url: nextUrl,
      description: "Weiter zum nächsten Prinzip",
    },
  };

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <div className="space-y-40">
        <Heading tagName="h2" look="ds-heading-03-reg">
          {principlePages.question}
        </Heading>

        <ul className="list-unstyled max-w-a11y space-y-40">
          {principlePages.radioOptions.map((option) => (
            <li key={option}>
              <Link
                to={nextLinkMap[option].url ?? nextUrl}
                className="grid grid-flow-col grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-16 rounded border border-blue-400 bg-blue-200 p-16"
              >
                <CheckCircleRounded className="fill-ds-green-700 row-span-2 size-36" />
                <span>
                  <strong>{option}</strong>
                </span>
                <span>{nextLinkMap[option].description}</span>
                <ArrowForward className="row-span-2 size-36 fill-blue-800" />
              </Link>
            </li>
          ))}
        </ul>

        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
        />

        {/* <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("id")} />
          <RadioGroup
            label={
              <Heading tagName="h2" look="ds-heading-03-reg">
                {principlePages.question}
              </Heading>
            }
            scope={form.scope("answer")}
            options={principlePages.radioOptions.map((option) => ({
              value: option,
              label: option,
            }))}
            warningInsteadOfError
          />

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
          />
        </form> */}
      </div>
    </>
  );
}
