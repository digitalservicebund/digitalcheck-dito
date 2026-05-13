import { useField } from "@rvf/react";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import {
  defaultTitleValues,
  policyHeaderSchema,
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
    schema: policyHeaderSchema,
    defaultValues: defaultTitleValues,
    currentUrl,
    setDataCallback: setPolicyTitle,
    storedData: documentationData.policyTitle,
    nextUrl,
  });

  const publicationStatusField = useField(form.scope("publicationStatus"));
  const publicationDateField = useField(form.scope("publicationDate"));
  const publicationLinkField = useField(form.scope("publicationLink"));

  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_TITLE.title}`} />
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
            <HelpButton
              sectionId="title"
              title="Hinweis zu Titel des Regelungsvorhabens"
            >
              Geben Sie hier den offiziellen Titel Ihres Regelungsvorhabens ein.
              Dieser Titel wird in der fertigen Dokumentation verwendet.
            </HelpButton>
          </Input>
          <Input scope={form.scope("organization")} warningInsteadOfError>
            Ministerium / Organisation
          </Input>
          <legend className="ds-heading-03-reg mb-16">
            Wann soll der Referentenentwurf vorraussichtlich veröffentlicht
            werden?
            <HelpButton
              sectionId="veröffentlichung"
              title="Hinweis zur Veröffentlichung des Regelungsvorhabens"
            ></HelpButton>
          </legend>
          <div className="space-y-24">
            <div>
              <label className="flex items-center gap-12">
                <input
                  type="radio"
                  name="publicationStatus"
                  value="planned"
                  {...publicationStatusField.getInputProps({
                    type: "radio",
                    onChange: () => publicationLinkField.setValue(""),
                  })}
                  className="ds-radio"
                />
                <span>Die Veröffentlichung ist geplant am...</span>
              </label>
              {publicationStatusField.value() === "planned" && (
                <div className="mt-16 ml-28">
                  <Input scope={form.scope("publicationDate")}>
                    Voraussichtliches Veröffentlichungsdatum
                  </Input>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-12">
                <input
                  type="radio"
                  name="publicationStatus"
                  value="published"
                  {...publicationStatusField.getInputProps({
                    type: "radio",
                    onChange: () => publicationDateField.setValue(""),
                  })}
                  className="ds-radio"
                />
                <span>Er ist bereits veröffentlicht</span>
              </label>
              {publicationStatusField.value() === "published" && (
                <div className="mt-16 ml-28">
                  <Input scope={form.scope("publicationLink")}>
                    Bitte Link zum Referentenentwurf einfügen
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
