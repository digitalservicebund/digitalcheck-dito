import { useForm } from "@rvf/react-router";
import { useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import TextareaNew from "~/components/TextareaNew";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import { createOrUpdateDocumentationStep } from "~/routes/dokumentation/documentationDataService";
import { useResetForm } from "~/routes/dokumentation/documentationDataServiceHook";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { participation } = digitalDocumentation;

const schema = z.object({
  formats: z
    .string()
    .min(1, { message: participation.formats.textField.errorMessage }),
  results: z
    .string()
    .min(1, { message: participation.results.textField.errorMessage }),
});

type Schema = z.infer<typeof schema>;

const DEFAULT_VALUES: Schema = {
  formats: "",
  results: "",
};

export default function DocumentationParticipation() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema,
    defaultValues: DEFAULT_VALUES,
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: (data) => {
      createOrUpdateDocumentationStep(currentUrl, data);
    },
    onSubmitSuccess: async () => {
      if (nextUrl) {
        await navigate(nextUrl);
      }
    },
  });

  useResetForm<Schema>({ currentUrl, form, defaultValues: DEFAULT_VALUES });

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
