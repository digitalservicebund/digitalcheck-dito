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

/**
 * Ensures that sub-list nodes are nested under their preceding list-item nodes.
 *
 * Example transformation:
 * Input:
 * [
 *   { type: "list", children: [
 *     { type: "list-item", children: [...] },
 *     { type: "list", children: [...] },
 *     { type: "list-item", children: [...] }
 *   ]},
 *   ...
 * ]
 *
 * Output:
 * [
 *   { type: "list", children: [
 *     {
 *       type: "list-item",
 *       children: [
 *         ...,
 *         { type: "list", children: [...] },
 *       ]
 *     },
 *     { type: "list-item", children: [...] }
 *   ]},
 *   ...
 * ]
 */
function nestListInListItems(nodes: Node[]) {
  const result: Node[] = [];
  let currentListItem: Node | null = null;

  nodes.forEach((node) => {
    const processedNode = {
      ...node,
      children: node.children ? nestListInListItems(node.children) : undefined,
    };

    if (
      processedNode.type === "list" &&
      currentListItem?.type === "list-item"
    ) {
      // Nest list under previous list item
      currentListItem.children = currentListItem.children || [];
      currentListItem.children.push(processedNode);
      currentListItem = null;
    } else {
      result.push(processedNode);
      currentListItem =
        processedNode.type === "list-item" ? processedNode : null;
    }
  });

  return result;
}
