import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Heading from "~/components/Heading";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import {
  createOrUpdateDocumentationStep,
  getDocumentationStep,
} from "~/routes/dokumentation/documentationDataService";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { info } = digitalDocumentation;

const schema = z.object({
  title: z.string().min(1, { message: info.inputTitle.error }),
});

type Schema = z.infer<typeof schema>;

export default function DocumentationTitle() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema: schema,
    defaultValues: {
      title: "",
    },
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: (data) => {
      createOrUpdateDocumentationStep(currentUrl, data);
    },
    onSubmitSuccess: async () => {
      await navigate(nextUrl);
    },
  });

  useEffect(() => {
    if (!form.dirty()) {
      const documentationStepData = getDocumentationStep(currentUrl);

      if (documentationStepData === null) {
        form.resetForm({
          title: "",
        });
      } else {
        form.resetForm(documentationStepData.items as Schema);
      }

      form.setDirty(true);
    }
  }, [currentUrl, form]);

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
