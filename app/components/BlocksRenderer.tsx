import { nestListInListItems } from "~/utils/blocksRendererUtils";
import { type Node } from "~/utils/paragraphUtils";
import { isExternalUrl } from "~/utils/utilFunctions";
import CustomLink from "./CustomLink";

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

      if (node.type === "link" && node.url) {
        const externalUrl = isExternalUrl(node.url);

        // NOTE: In strapi a url has to start with "/", "#" will not be registered as valid url
        // So if you want to use anchor tags you would have to define them like this:
        // "/#anchor-tag"
        // Here we remove the first "/" so it will become -> "#anchor-tag"
        const url = externalUrl ? node.url : node.url.replace("/", "");

        return (
          <CustomLink
            key={index}
            to={url}
            className="text-link inline-flex"
            target={externalUrl ? "_blank" : undefined}
          >
            <RecursiveRenderer content={node.children} />
          </CustomLink>
        );
      }

      return (
        <Element key={index}>
          <RecursiveRenderer content={node.children} modifiers={modifiers} />
        </Element>
      );
    }
    return node.text;
  });
}

type BlocksRendererProps = {
  content: Node[];
  modifiers?: Modifiers;
  className?: string;
  id?: string;
};

export function BlocksRenderer({
  content,
  modifiers,
  className,
  id,
}: Readonly<BlocksRendererProps>) {
  const contentWithCorectlyNestedLists = nestListInListItems(content);
  return (
    <div className={className} id={id}>
      <RecursiveRenderer
        content={contentWithCorectlyNestedLists}
        modifiers={modifiers}
      />
    </div>
  );
}
