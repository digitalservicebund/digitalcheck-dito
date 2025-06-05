import { twJoin } from "tailwind-merge";
import Badge, { BadgeProps } from "./Badge";
import Heading, { type HeadingProps } from "./Heading";
import InfoBoxItem, { type InfoBoxItemProps } from "./InfoBoxItem";

export type InfoBoxProps = {
  identifier?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  separator?: boolean;
  items: InfoBoxItemProps[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const InfoBox = ({
  identifier,
  items,
  badge,
  heading,
  Icon,
  separator = true,
}: InfoBoxProps) => {
  return (
    <section className="flex flex-row gap-16">
      {Icon && <Icon className="hidden size-80 fill-blue-500 sm:block" />}
      <div className="ds-stack ds-stack-8 w-full scroll-my-40" id={identifier}>
        {badge && <Badge {...badge} />}
        {heading && <Heading className="ds-heading-02-reg" {...heading} />}
        <ul
          className={twJoin(
            "list-unstyled info-box ds-stack",
            separator ? "ds-stack-32" : "ds-stack-48",
          )}
        >
          {items.map((item, index) => (
            <InfoBoxItem
              separator={separator}
              {...item}
              key={item.identifier ?? index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InfoBox;
