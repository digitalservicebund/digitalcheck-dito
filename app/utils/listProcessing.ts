import { renderToString } from "react-dom/server";
import type { ListItemProps } from "~/components/ListItem.tsx";
import { methods } from "~/resources/content/methoden.ts";
import type { ContentRenderer } from "~/routes/methoden._index.tsx";

export const methodStepsItems = (
  showContent: boolean,
  renderContentFn?: ContentRenderer,
): ListItemProps[] =>
  methods.steps.items.map((item) => {
    const { buttons, info, text, headline, isSubstep, ...restOfItem } = item;

    return {
      ...restOfItem,
      background: isSubstep ? "blue" : undefined,
      hasBullet: isSubstep,
      content:
        showContent && renderContentFn
          ? renderToString(renderContentFn(info, text))
          : undefined,
      headline: {
        ...headline,
        tagName: isSubstep ? "h3" : "h2",
        look: isSubstep ? "ds-heading-03-reg" : "ds-heading-02-bold",
      },
      ...(showContent && { buttons: buttons }),
    };
  });
