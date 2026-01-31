import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_ERFORDERLICHKEIT } from "~/resources/staticRoutes";
import {
  defaultErforderlichkeitValues,
  erforderlichkeitSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";
import { setErforderlichkeit } from "./dokumentation/documentationDataService";

const { erforderlichkeit } = digitalDocumentation.brandenburg;

export default function DocumentationErforderlichkeit() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useSyncedForm({
    schema: erforderlichkeitSchema,
    defaultValues: defaultErforderlichkeitValues,
    currentUrl,
    setDataCallback: setErforderlichkeit,
    storedData: documentationData.erforderlichkeit,
    nextUrl,
  });

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_ERFORDERLICHKEIT.title}`}
      />
      <Heading
        text={erforderlichkeit.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={erforderlichkeit.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <Textarea scope={form.scope("content")} warningInsteadOfError>
          {erforderlichkeit.textField.label}
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
