import { dokumentation_regelungsvorhabenTitel } from "@/config/routes";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import { useNavigationContext } from "~/contexts/DocumentationNavigationContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  defaultTitleValues,
  policyTitleSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl } = useNavigationContext();
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
      <MetaTitle
        prefix={`Dokumentation: ${dokumentation_regelungsvorhabenTitel.title}`}
      />
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
