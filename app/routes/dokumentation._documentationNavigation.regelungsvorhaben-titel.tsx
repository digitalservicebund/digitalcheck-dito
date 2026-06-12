import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import Select from "~/components/Select";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  defaultTitleValues,
  policyTitleSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const { info } = digitalDocumentation;

export function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useDocumentationNavigation();
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
      <div className="space-y-40">
        <Heading
          text={info.headline}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-40"
        />
        <form className="space-y-40" {...form.getFormProps()}>
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

          <Select
            scope={form.scope("bundesland")}
            options={info.inputBundesland.options}
            warningInsteadOfError
          >
            {info.inputBundesland.label}
          </Select>

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
            prinzips={prinzips}
          />
        </form>
      </div>
    </>
  );
}

export default function Route() {
  return <DocumentationTitle />;
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

export function TitelPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationTitle />
    </DocumentationPageShell>
  );
}
