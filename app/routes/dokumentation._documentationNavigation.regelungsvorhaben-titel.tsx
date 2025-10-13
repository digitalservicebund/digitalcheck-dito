import { useForm } from "@rvf/react-router";
import { useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Heading from "~/components/Heading";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import { createOrUpdateDocumentationStep } from "~/routes/dokumentation/documentationDataService";
import { useResetForm } from "~/routes/dokumentation/documentationDataServiceHook";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { info } = digitalDocumentation;

const schema = z.object({
  title: z.string().min(1, { message: info.inputTitle.error }),
});

const DEFAULT_VALUES = {
  title: "",
};

export default function DocumentationTitle() {
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

  useResetForm({ currentUrl, form, defaultValues: DEFAULT_VALUES });

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_TITLE.title} />
      <Heading
        text={info.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-40"
      />
      <form {...form.getFormProps()} className="space-y-80">
        <fieldset>
          <InputNew scope={form.scope("title")}>
            {info.inputTitle.label}
          </InputNew>
        </fieldset>

        <DocumentationActions previousUrl={previousUrl} submit />
      </form>
    </>
  );
}
