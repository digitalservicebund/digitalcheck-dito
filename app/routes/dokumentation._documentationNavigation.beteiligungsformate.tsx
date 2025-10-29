import { useForm } from "@rvf/react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import TextareaNew from "~/components/TextareaNew";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import {
  defaultParticipationValues,
  participationSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import { setParticipation } from "./dokumentation/documentationDataService";

const { participation } = digitalDocumentation;

export default function DocumentationParticipation() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useForm({
    schema: participationSchema,
    defaultValues: defaultParticipationValues,
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    onBeforeSubmit: async () => {
      // bypass submission
      if (nextUrl) await navigate(nextUrl);
    },
    handleSubmit: async () => {
      if (nextUrl) await navigate(nextUrl);
    },
  });

  useEffect(() => {
    const unsubscribe = form.subscribe.value(setParticipation);

    if (
      documentationData.participation &&
      !form.dirty("formats") &&
      !form.dirty("results")
    ) {
      form.resetForm(documentationData.participation);
      form.setDirty("formats", true);
      form.setDirty("results", true);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      form.validate();
    }
    return () => unsubscribe();
  }, [currentUrl, form, documentationData]);

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_PARTICIPATION.title} />
      <Heading
        text={participation.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={participation.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <fieldset className="space-y-16">
          <legend>
            <InfoBox
              heading={{
                tagName: "h2",
                look: "ds-heading-03-reg",
                text: participation.formats.heading,
              }}
              content={participation.formats.content}
            />
          </legend>
          <TextareaNew
            description={participation.formats.textField.description}
            placeholder={participation.formats.textField.placeholder}
            scope={form.scope("formats")}
            warningInsteadOfError
          >
            {participation.formats.textField.label}
          </TextareaNew>
        </fieldset>

        <fieldset>
          <legend>
            <Heading
              tagName="h2"
              look="ds-heading-03-reg"
              text={participation.results.heading}
              className="mb-16"
            />
          </legend>
          <TextareaNew
            description={participation.results.textField.description}
            scope={form.scope("results")}
            warningInsteadOfError
          >
            {participation.results.textField.label}
          </TextareaNew>
        </fieldset>

        {/*TODO: Do not place text inside a form (a11y)*/}
        <InlineNotice
          look="tips"
          heading={<Heading tagName="h2">{participation.tip.heading}</Heading>}
          className="mt-40 mb-80"
        >
          <RichText markdown={participation.tip.content} />
        </InlineNotice>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton={true}
        />
      </form>
    </>
  );
}
