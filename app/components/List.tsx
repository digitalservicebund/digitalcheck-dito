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
    (typeof item.badge?.text === "string"
      ? item.badge.text
      : index.toString()) ??
    (typeof item.headline?.text === "string"
      ? item.headline.text
      : index.toString()) ??
    (typeof item.content === "string" ? item.content : index.toString())
  );
}
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
      <div className="absolute top-32 bottom-0 left-[8px] w-[4px] bg-blue-300"></div>
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

export { BulletList };
