import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SUMMARY } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { summary } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION_SUMMARY.title);
}

export default function DocumentationInfo() {
  return (
    <>
      <Heading
        text={summary.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={summary.text} className="mb-40" />
    </>
  );
}
