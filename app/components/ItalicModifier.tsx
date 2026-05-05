import { type Node } from "~/utils/paragraphUtils";

export default function ItalicModifier({ node }: Readonly<{ node: Node }>) {
  return <i>{node.text}</i>;
}
