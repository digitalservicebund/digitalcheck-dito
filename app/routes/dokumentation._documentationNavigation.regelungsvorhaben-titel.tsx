import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { info } = digitalDocumentation;

export default function DocumentationInfo() {
  const { previousRoute } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_TITLE.title} />
      <Heading
        text={info.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-40"
      />
      <form>
        <fieldset>
          <Input name="title" label={info.inputTitle.label} />
        </fieldset>

        <DocumentationActions previousRoute={previousRoute.url} submit />
      </form>
    </>
  );
}
