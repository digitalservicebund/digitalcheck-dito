import { useForm } from "@rvf/react-router";
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
import { participationSchema } from "~/routes/dokumentation/documentationDataSchema";
import {
  getDocumentationData,
  setParticipation,
} from "~/routes/dokumentation/documentationDataService";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { participation } = digitalDocumentation;

const DEFAULT_VALUES = {
  formats: "",
  results: "",
};

export default function DocumentationParticipation() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema: participationSchema,
    defaultValues: DEFAULT_VALUES,
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    onBeforeSubmit: async ({ unvalidatedData }) => {
      setParticipation(unvalidatedData);

      // bypass submission
      if (nextUrl) await navigate(nextUrl);
    },
    handleSubmit: (participation) => {
      setParticipation(participation);
    },
    onSubmitSuccess: async () => {
      if (nextUrl) await navigate(nextUrl);
    },
  });

  useEffect(() => {
    if (!form.dirty()) {
      const documentationData = getDocumentationData();

      form.resetForm(
        documentationData.participation === null
          ? DEFAULT_VALUES
          : documentationData.participation,
      );

      form.setDirty(true);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (documentationData) form.validate();
    }
  }, [currentUrl, form]);

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
      <InfoBox
        heading={{
          tagName: "h2",
          look: "ds-heading-03-reg",
          text: participation.formats.heading,
        }}
        content={participation.formats.content}
      />
      <form {...form.getFormProps()}>
        <fieldset className="mb-40">
          <TextareaNew
            description={participation.formats.textField.description}
            scope={form.scope("formats")}
          >
            {participation.formats.textField.label}
          </TextareaNew>
        </fieldset>
        {/*TODO: Do not place text inside a form (a11y)*/}
        <Heading
          tagName="h2"
          look="ds-heading-03-reg"
          text={participation.results.heading}
          className="mb-16"
        />
        <fieldset>
          <TextareaNew
            description={participation.results.textField.description}
            scope={form.scope("results")}
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

        <DocumentationActions previousUrl={previousUrl} submit />
      </form>
    </>
  );
}
