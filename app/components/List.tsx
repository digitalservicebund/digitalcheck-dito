import twMerge from "~/utils/tailwindMerge";
import Heading, { type HeadingProps } from "./Heading";
import ListItem, { type ListItemProps } from "./ListItem";

// Common List Props
type BaseListProps = {
  identifier?: string;
  heading?: HeadingProps;
  items: ListItemProps[];
  className?: string;
};

function getKey(item: ListItemProps, index: number) {
  return (
    item.identifier ??
    (typeof item.label?.text === "string"
      ? item.label.text
      : index.toString()) ??
    (typeof item.headline?.text === "string"
      ? item.headline.text
      : index.toString()) ??
    (typeof item.content === "string" ? item.content : index.toString())
  );
}

const NumberedList = ({
  identifier,
  items,
  heading,
  className,
}: BaseListProps) => {
  return (
    <div
      className={twMerge(
        "ds-stack ds-stack-8 relative scroll-my-40",
        className,
      )}
      id={identifier}
    >
      {heading && <Heading className="max-sm:ds-heading-02-reg" {...heading} />}
      <ol
        className="list-unstyled ds-stack ds-stack-32 relative"
        aria-live="polite"
        aria-labelledby={identifier ? `${identifier}-heading` : undefined}
      >
        {items.map((item, index) => (
          <li
            key={getKey(item, index)}
            className="scroll-my-40 first:pt-0"
            aria-describedby={
              item.identifier ? `${item.identifier}-desc` : undefined
            }
            aria-posinset={index + 1}
            aria-setsize={items.length}
          >
            <ListItem
              {...item}
              numeric={index + 1}
              parentHasHeading={heading !== undefined}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

const BulletList = ({
  identifier,
  items,
  heading,
  className,
}: BaseListProps) => {
  return (
    <div
      className={twMerge(
        "ds-stack ds-stack-8 group relative scroll-my-40",
        className,
      )}
      id={identifier}
    >
      {heading && <Heading className="max-sm:ds-heading-02-reg" {...heading} />}
      <div className="bg-ds-mid-blue absolute top-32 bottom-0 left-[8px] w-[4px]">
        <div className="text-ds-mid-blue absolute -left-8 w-20 rotate-180 bg-white text-center text-xl leading-none">
          ▲
        </div>
        <div className="text-ds-mid-blue absolute bottom-0 -left-8 w-20 bg-white text-center text-xl leading-none group-[.rotate-arrow-bottom]:rotate-180">
          ▲
        </div>
      </div>
      <ul
        className="list-unstyled ds-stack ds-stack-32 relative"
        aria-live="polite"
        aria-labelledby={identifier ? `${identifier}-heading` : undefined}
      >
        {items.map((item, index) => (
          <li
            key={getKey(item, index)}
            className="scroll-my-40 first:mt-16"
            aria-describedby={
              item.identifier ? `${item.identifier}-desc` : undefined
            }
          >
            <ListItem
              {...item}
              numeric={undefined}
              parentHasHeading={heading !== undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { BulletList, NumberedList };
