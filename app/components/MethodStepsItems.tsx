import { renderToString } from "react-dom/server";
import { ListItemProps } from "~/components/ListItem.tsx";
import { methods } from "~/resources/content/methoden.ts";

interface InfoItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const renderInfoItem = (info: InfoItem) => (
  <span key={info.text} className="mb-8 flex gap-4 last-of-type:mb-8">
    <info.icon className="mt-6 size-16" />
    <span>{info.text}</span>
  </span>
);

const MethodStepsItems = (showContent: boolean): ListItemProps[] =>
  methods.steps.items.map((item) => {
    const { buttons, info, text, headline, isSubstep, ...restOfItem } = item;

    return {
      ...restOfItem,
      background: isSubstep ? "blue" : undefined,
      hasBullet: isSubstep,
      content: showContent
        ? renderToString(
            <>
              {info?.map((infoItem) => renderInfoItem(infoItem))}
              <p>{text}</p>
            </>,
          )
        : undefined,
      headline: {
        ...headline,
        tagName: isSubstep ? "h3" : "h2",
        look: isSubstep ? "ds-heading-03-reg" : "ds-heading-02-bold",
      },
      ...(showContent && { buttons: buttons }), // only show buttons for variant with content
    };
  });

export default MethodStepsItems;
