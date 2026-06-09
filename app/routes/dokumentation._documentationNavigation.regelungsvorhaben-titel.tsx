import { dokumentation_regelungsvorhabenTitel } from "@/config/routes";
import { useField } from "@rvf/react";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  defaultTitleValues,
  policyHeaderSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useSyncedForm } from "./dokumentation/documentationDataHook";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const { info } = digitalDocumentation;

export default function DocumentationTitle() {
  const { currentUrl, nextUrl, previousUrl } = useDocumentationNavigation();
  const { documentationData, setPolicyTitle } = useDocumentationDataService();

  const form = useSyncedForm({
    schema: policyHeaderSchema,
    defaultValues: defaultTitleValues,
    currentUrl,
    setDataCallback: setPolicyTitle,
    storedData: documentationData.policyTitle,
    nextUrl,
  });

  const publicationStatusField = useField(form.scope("publicationStatus"));

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${dokumentation_regelungsvorhabenTitel.title}`}
      />
      <div className="space-y-40">
        <Heading
          text={"Ihr Regelungsvorhaben"}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-40"
        />
        <form {...form.getFormProps()} className="space-y-32">
          <Input scope={form.scope("title")} warningInsteadOfError>
            {info.inputTitle.label}
          </Input>
          <Input scope={form.scope("organization")} warningInsteadOfError>
            Ministerium / Organisation
          </Input>
          <legend className="ds-heading-03-reg mb-16">
            Wann soll der Referentenentwurf voraussichtlich auf der Webseite
            Ihres Ministeriums veröffentlicht werden?
            <HelpButton
              sectionId="veröffentlichung"
              title="Hinweis zur Veröffentlichung des Regelungsvorhabens"
            ></HelpButton>
          </legend>
          <div className="space-y-24">
            <div>
              <RadioGroup
                scope={form.scope("publicationStatus")}
                options={[
                  {
                    label: "Die Veröffentlichung ist geplant am...",
                    value: "planned",
                  },
                  {
                    label: "Der Referentenentwurf ist bereits veröffentlicht",
                    value: "published",
                  },
                ]}
                warningInsteadOfError
              />

              {publicationStatusField.value() === "planned" && (
                <div className="mt-16 ml-28">
                  <Input
                    description="Eine ungefähre Angabe (Monat) ist ausreichend."
                    scope={form.scope("publicationDate")}
                  >
                    Voraussichtliches Veröffentlichungsdatum
                  </Input>
                </div>
              )}

              {publicationStatusField.value() === "published" && (
                <div className="mt-16 ml-28">
                  <Input scope={form.scope("publicationLink")}>
                    Link zum Referentenentwurf
                  </Input>
                </div>
              )}
            </div>
          </div>
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

// Astro page export
import { DocumentationPageShell } from "@/components/dokumentation/DocumentationPageShell";
import RadioGroup from "~/components/RadioGroup.tsx";
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
