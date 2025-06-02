import { twJoin } from "tailwind-merge";
import Badge, { LabelProps } from "./Badge";
import Heading, { type HeadingProps } from "./Heading";
import InfoBoxItem, { type InfoBoxItemProps } from "./InfoBoxItem";

type InfoBoxProps = {
  identifier?: string;
  label?: LabelProps;
  heading?: HeadingProps;
  separator?: boolean;
  items: InfoBoxItemProps[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const InfoBox = ({
  identifier,
  items,
  label,
  heading,
  Icon,
  separator = true,
}: InfoBoxProps) => {
  return (
    <section className="flex flex-col gap-16">
      {Icon && <Icon className="hidden size-80 fill-blue-500 sm:block" />}
      <div className="ds-stack ds-stack-8 scroll-my-40" id={identifier}>
        {label && (
          <Badge className="self-start" principleNumber={label.principleNumber}>
            {label.children}
          </Badge>
        )}
        {heading && <Heading className="ds-heading-02-reg" {...heading} />}
        <ul
          className={twJoin(
            "list-unstyled info-box ds-stack mt-32",
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
