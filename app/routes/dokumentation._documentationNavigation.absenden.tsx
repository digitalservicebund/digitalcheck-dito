import { useOutletContext } from "react-router";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import downloadDocumentation from "~/utils/documentationCreationService/documentCreation";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { send } = digitalDocumentation;

export default function DocumentationSend() {
  const { previousUrl, prinzips } = useOutletContext<NavigationContext>();
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_SEND.title} />
      <Heading
        text={send.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={send.text} className="mb-40" />

      <Button onClick={() => downloadDocumentation(prinzips)}>
        Dokumentation herunterladen
      </Button>

      <DocumentationActions previousUrl={previousUrl} />
    </>
  );
}
