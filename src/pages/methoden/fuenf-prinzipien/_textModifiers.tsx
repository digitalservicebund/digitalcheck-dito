import type { Node } from "@/utils/paragraphUtils";

function ItalicModifier({ node }: Readonly<{ node: Node }>) {
  if (node.bold) return <strong className={"italic"}>{node.text}</strong>;
  return <i>{node.text}</i>;
}

function BoldModifier({ node }: Readonly<{ node: Node }>) {
  return <strong>{node.text}</strong>;
}

export const textModifiers = { italic: ItalicModifier, bold: BoldModifier };
