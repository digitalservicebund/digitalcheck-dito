import { useParams } from "react-router";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";

const { principlePages } = digitalDocumentation;

export default function NewDocumentationPrincipleAspects() {
  const { aspect } = useParams();

  return (
    <>
      <MetaTitle prefix={aspect} />
      <div className="space-y-40">{aspect}</div>
    </>
  );
}
