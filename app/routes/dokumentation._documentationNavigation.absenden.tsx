import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { send } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION_SEND.title);
}

export default function DocumentationSend() {
  return (
    <>
      <Heading
        text={send.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={send.text} className="mb-40" />
    </>
  );
}
