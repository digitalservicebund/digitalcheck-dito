import { Node } from "~/utils/paragraphUtils";

export default function ItalicModifier({ node }: { node: Node }) {
  return <i>{node.text}</i>;
}
