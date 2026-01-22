import { Node } from "~/utils/paragraphUtils.ts";

export function getTextFromNodes(nodes: Node[]) {
  const found = nodes.reduce((acc, node) => {
    return (
      acc +
      (node.text ?? "") +
      node.children?.reduce((acc, child) => {
        return acc + (child.text ?? "");
      }, "")
    );
  }, "");

  if (found === "") throw new Error("empty node");
  return found;
}
