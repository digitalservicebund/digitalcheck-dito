import { nestListInListItems } from "~/utils/blockRendererUtils";
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

export function RecursiveRenderer({
  content,
  modifiers,
}: {
  content: Node[];
  modifiers?: Partial<Record<keyof Node, React.ComponentType<{ node: Node }>>>;
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

export function BlocksContentRenderer({
  content,
  modifiers,
}: Readonly<{
  content: Node[];
  modifiers?: Partial<Record<keyof Node, React.ComponentType<{ node: Node }>>>;
}>) {
  const contentWithCorectlyNestedLists = nestListInListItems(content);
  return (
    <RecursiveRenderer
      content={contentWithCorectlyNestedLists}
      modifiers={modifiers}
    />
  );
}
