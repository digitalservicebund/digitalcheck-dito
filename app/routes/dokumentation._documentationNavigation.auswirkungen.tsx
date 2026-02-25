import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_AUSWIRKUNGEN } from "~/resources/staticRoutes";
import {
  auswirkungenSchema,
  defaultAuswirkungenValues,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";
import { setAuswirkungen } from "./dokumentation/documentationDataService";

const { auswirkungen } = digitalDocumentation.brandenburg;

export default function DocumentationAuswirkungen() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useSyncedForm({
    schema: auswirkungenSchema,
    defaultValues: defaultAuswirkungenValues,
    currentUrl,
    setDataCallback: setAuswirkungen,
    storedData: documentationData.auswirkungen,
    nextUrl,
  });

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_AUSWIRKUNGEN.title}`}
      />
      <Heading
        text={auswirkungen.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={auswirkungen.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <Textarea scope={form.scope("content")} warningInsteadOfError>
          {auswirkungen.textField.label}
        </Textarea>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton
          showSavingTip
        />
      </form>
    </>
  );
}
