import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import {
  defaultParticipationValues,
  participationSchema,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";
import { setParticipation } from "./dokumentation/documentationDataService";

const { participation } = digitalDocumentation;

export default function DocumentationParticipation() {
  const { currentUrl, nextUrl, previousUrl } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const form = useSyncedForm({
    schema: participationSchema,
    defaultValues: defaultParticipationValues,
    currentUrl,
    setDataCallback: setParticipation,
    storedData: documentationData.participation,
    nextUrl,
  });

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_PARTICIPATION.title} />
      <Heading
        text={participation.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={participation.textIntro} className="gap-40" />

      <form className="space-y-40" {...form.getFormProps()}>
        <fieldset className="space-y-16">
          <legend>
            <InfoBox
              heading={{
                tagName: "h2",
                look: "ds-heading-03-reg",
                text: participation.formats.heading,
              }}
              content={participation.formats.content}
            />
          </legend>
          <Textarea
            description={participation.formats.textField.description}
            placeholder={participation.formats.textField.placeholder}
            scope={form.scope("formats")}
            warningInsteadOfError
          >
            {participation.formats.textField.label}
          </Textarea>
        </fieldset>

        <fieldset>
          <legend>
            <Heading
              tagName="h2"
              look="ds-heading-03-reg"
              text={participation.results.heading}
              className="mb-16"
            />
          </legend>
          <Textarea
            description={participation.results.textField.description}
            scope={form.scope("results")}
            warningInsteadOfError
          >
            {participation.results.textField.label}
          </Textarea>
        </fieldset>

        <InlineNotice
          look="tips"
          heading={<Heading tagName="h2">{participation.tip.heading}</Heading>}
          className="mt-40"
        >
          <RichText markdown={participation.tip.content} />
        </InlineNotice>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton={true}
        />
      </form>
    </>
  );
}
