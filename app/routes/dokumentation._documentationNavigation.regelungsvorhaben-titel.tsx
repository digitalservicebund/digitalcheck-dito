import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import { policyTitleSchema } from "~/routes/dokumentation/documentationDataSchema";
import {
  getDocumentationData,
  setPolicyTitle,
} from "~/routes/dokumentation/documentationDataService";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { info } = digitalDocumentation;

const DEFAULT_VALUES = {
  title: "",
};

export default function DocumentationTitle() {
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema: policyTitleSchema,
    defaultValues: DEFAULT_VALUES,
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: (policyTitle) => {
      setPolicyTitle(policyTitle);
    },
    onSubmitSuccess: async () => {
      if (nextUrl) {
        await navigate(nextUrl);
      }
    },
  });

  useEffect(() => {
    if (!form.dirty()) {
      const documentationData = getDocumentationData();

      form.resetForm(
        documentationData.policyTitle === null
          ? DEFAULT_VALUES
          : documentationData.policyTitle,
      );

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
