import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import {
  defaultTitleValues,
  policyTitleSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData, setPolicyTitle } = useDocumentationDataService();

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
      <MetaTitle prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_TITLE.title}`} />
      <div className="space-y-40">
        <Heading
          text={info.headline}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-40"
        />
        <form {...form.getFormProps()}>
          <Input scope={form.scope("title")} warningInsteadOfError>
            {info.inputTitle.label}
            <HelpButton
              sectionId="title"
              title="Hinweis zu Titel des Regelungsvorhabens"
            >
              Geben Sie hier den offiziellen Titel Ihres Regelungsvorhabens ein.
              Dieser Titel wird in der fertigen Dokumentation verwendet.
            </HelpButton>
          </Input>

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
          />
        </form>
      </div>
    </>
  );
}
