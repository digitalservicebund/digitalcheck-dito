import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { participation } = digitalDocumentation;

export default function DocumentationParticipation() {
  const { previousRoute } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_PARTICIPATION.title} />
      <Heading
        text={participation.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={participation.textIntro} className="mb-20" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Textarea
            name="explanation"
            label={participation.textFieldParticipationLabel}
          />
        </fieldset>
      </form>
      <RichText markdown={participation.textResults} className="mt-40 mb-20" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Textarea
            name="explanation"
            label={participation.textFieldResultsLabel}
          />
        </fieldset>

        <DocumentationActions previousRoute={previousRoute.url} submit />
      </form>
    </>
  );
}
