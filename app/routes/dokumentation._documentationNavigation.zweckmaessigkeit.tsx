import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_ZWECKMAESSIGKEIT } from "~/resources/staticRoutes";
import {
  defaultZweckmaessigkeitValues,
  zweckmaessigkeitSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";
import { setZweckmaessigkeit } from "./dokumentation/documentationDataService";

const { zweckmaessigkeit } = digitalDocumentation.brandenburg;

export default function DocumentationZweckmaessigkeit() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useSyncedForm({
    schema: zweckmaessigkeitSchema,
    defaultValues: defaultZweckmaessigkeitValues,
    currentUrl,
    setDataCallback: setZweckmaessigkeit,
    storedData: documentationData.zweckmaessigkeit,
    nextUrl,
  });

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_ZWECKMAESSIGKEIT.title}`}
      />
      <Heading
        text={zweckmaessigkeit.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={zweckmaessigkeit.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <Textarea scope={form.scope("content")} warningInsteadOfError>
          {zweckmaessigkeit.textField.label}
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
