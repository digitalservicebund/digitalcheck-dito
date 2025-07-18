import type { Node } from "./paragraphUtils";

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
export function nestListInListItems(nodes: Node[]) {
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
