import Heading from "~/components/Heading";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_INFO } from "~/resources/staticRoutes";

const { info } = digitalDocumentation;

export default function DocumentationInfo() {
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_INFO.title} />
      <Heading
        text={info.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={info.text} className="mb-40" />
      <form>
        <fieldset className="ds-stack ds-stack-24">
          <Input className="pb-4" name="title" label={info.inputTitle.label} />
        </fieldset>
      </form>
    </>
  );
}
