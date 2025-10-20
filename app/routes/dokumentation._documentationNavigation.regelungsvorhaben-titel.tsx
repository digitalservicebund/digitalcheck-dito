import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import {
  defaultTitleValues,
  policyTitleSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { setPolicyTitle } from "~/routes/dokumentation/documentationDataService";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useForm({
    schema: policyTitleSchema,
    defaultValues: defaultTitleValues,
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
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
    const unsubscribe = form.subscribe.value(setPolicyTitle);

    if (documentationData.policyTitle && !form.dirty("title")) {
      form.resetForm(documentationData.policyTitle);
      form.setDirty("title", true);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      form.validate();
    }

    return () => unsubscribe();
  }, [currentUrl, form, documentationData]);

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
