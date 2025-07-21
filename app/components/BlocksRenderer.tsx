import { nestListInListItems } from "~/utils/blocksRendererUtils";
import { type Node } from "~/utils/paragraphUtils";

const getElement = (node: Node): keyof JSX.IntrinsicElements => {
  switch (node.type) {
    case "paragraph":
      return "p";
    case "list":
      return node.format === "ordered" ? "ol" : "ul";
    case "list-item":
      return "li";
    default:
      return "div";
  }
};

// Maps Node properties to React components that can render them. Each component receives the full node as a prop.
// E.g. { underline: UnderlineComponent } will render UnderlineComponent for nodes that have the underline property.
type Modifiers = {
  [K in keyof Node]?: React.ComponentType<{ node: Node }>;
};

export function RecursiveRenderer({
  content,
  modifiers,
}: {
  content: Node[];
  modifiers?: Modifiers;
}) {
  return content.map((node: Node, index) => {
    for (const [condition, ModifiedNode] of Object.entries(modifiers || {})) {
      if (condition in node && node[condition as keyof Node]) {
        return <ModifiedNode key={index} node={node} />;
      }
    }
    if (node.children) {
      const Element = getElement(node);
      return (
        <Element key={index}>
          <RecursiveRenderer content={node.children} modifiers={modifiers} />
        </Element>
      );
    }
    return node.text;
  });
}

export function BlocksRenderer({
  content,
  modifiers,
}: Readonly<{
  content: Node[];
  modifiers?: Modifiers;
}>) {
  const contentWithCorectlyNestedLists = nestListInListItems(content);
  return (
    <RecursiveRenderer
      content={contentWithCorectlyNestedLists}
      modifiers={modifiers}
    />
  );
}
