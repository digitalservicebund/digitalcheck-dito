import { renderToString } from "react-dom/server";
import type { ListItemProps } from "~/components/ListItem.tsx";
import { methods } from "~/resources/content/methoden.ts";
import type { ContentRenderer } from "~/routes/methoden._index.tsx";
import { slugify } from "./utilFunctions";

/**
 * Maps method step data to ListItemProps, optionally rendering content.
 * Used by /methoden and /grundlagen/methoden
 *
 * @param showContent Boolean flag to determine if content should be rendered.
 * @param renderContentFn Optional function to render the content for an item.
 * Required if showContent is true.
 * @returns An array of ListItemProps.
 */
export const methodStepsItems = (
  showContent: boolean,
  renderContentFn?: ContentRenderer,
): ListItemProps[] =>
  methods.steps.items.map((item) => {
    const { buttons, info, text, headline, isSubstep, ...restOfItem } = item;

    return {
      ...restOfItem,
      backgroundColorClass: isSubstep ? "bg-blue-100" : undefined,
      hasBullet: isSubstep,
      className: isSubstep ? "mb-24" : undefined,
      content:
        showContent && renderContentFn
          ? renderToString(renderContentFn(info, text))
          : undefined,
      headline: {
        ...headline,
        id: slugify(headline.text),
        tagName: isSubstep ? "h3" : "h2",
        look: isSubstep ? "ds-heading-03-bold" : "ds-heading-02-reg",
      },
      ...(showContent && { buttons: buttons }),
    };
  });
