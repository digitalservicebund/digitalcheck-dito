import type { Node } from "~/utils/paragraphUtils";

const getElement = (node: Node): keyof JSX.IntrinsicElements => {
  switch (node.type) {
    case "paragraph":
      return "p";
    case "list":
      return node.format === "ordered" ? "ol" : "ul";
    case "listItem":
      return "li";
    default:
      return "div";
  }
};

export function BlocksContentRenderer({
  content,
  modifiers,
}: {
  content: Node[];
  modifiers?: Partial<Record<keyof Node, (node: Node) => React.ReactNode>>;
}) {
  return content.map((node: Node, index) => {
    for (const [condition, element] of Object.entries(modifiers || {})) {
      if (condition in node && node[condition as keyof Node]) {
        return element(node);
      }
    }
    if (node.children) {
      const Element = getElement(node);
      return (
        <Element key={index}>
          <BlocksContentRenderer
            content={node.children}
            modifiers={modifiers}
          />
        </Element>
      );
    }
    return node.text;
  });
}
