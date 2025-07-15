import twMerge from "~/utils/tailwindMerge";
import Heading, { HeadingProps } from "./Heading";
import InfoBox, { InfoBoxProps } from "./InfoBox";

type InfoBoxListProps = {
  heading?: HeadingProps;
  items: InfoBoxProps[];
  separator?: boolean;
  className?: string;
};

function InfoBoxList({
  separator,
  heading,
  items,
  className,
}: Readonly<InfoBoxListProps>) {
  return (
    <section className="ds-stack ds-stack-8">
      {heading && <Heading tagName="h2" {...heading} />}
      <ul
        className={twMerge(
          "list-unstyled info-box ds-stack mt-32",
          separator ? "ds-stack-32" : "ds-stack-48",
          className,
        )}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={
              separator
                ? "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0"
                : ""
            }
          >
            <InfoBox {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InfoBoxList;
