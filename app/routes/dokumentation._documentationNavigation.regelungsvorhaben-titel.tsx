import { useOutletContext } from "react-router";
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
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useSyncedForm({
    schema: policyTitleSchema,
    defaultValues: defaultTitleValues,
    currentUrl,
    setDataCallback: setPolicyTitle,
    storedData: documentationData.policyTitle,
    nextUrl,
  });

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_TITLE.title} />
      <Heading
        text={info.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-40"
      />
      <form {...form.getFormProps()}>
        <InputNew scope={form.scope("title")} warningInsteadOfError>
          {info.inputTitle.label}
        </InputNew>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton={true}
        />
      </form>
    </>
  );
}
