import { twJoin } from "tailwind-merge";
import { type ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import DetailsSummary, { type DetailsSummaryProps } from "./DetailsSummary";
import Heading, { type HeadingProps } from "./Heading";
import Image, { type ImageProps } from "./Image";
import LinkList, { LinkListProps } from "./LinkList";
import RichText from "./RichText";

export type InfoBoxItemProps = {
  identifier?: string;
  label?: HeadingProps;
  headline?: HeadingProps;
  image?: ImageProps;
  content?: string;
  detailsSummary?: {
    title?: HeadingProps;
    items: DetailsSummaryProps[];
  };
  linkList?: LinkListProps;
  buttons?: ButtonProps[];
  separator?: boolean;
};

const InfoBoxItem = ({
  identifier,
  label,
  headline,
  image,
  content,
  detailsSummary,
  linkList,
  buttons,
  separator,
}: InfoBoxItemProps) => {
  return (
    <li
      id={identifier}
      className={twJoin(
        "flex max-w-none scroll-my-40 flex-row items-center justify-center max-[499px]:flex-col",
        separator &&
          "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0",
      )}
    >
      {image && (
        <Image
          {...image}
          {...{
            className:
              "max-[499px]:mb-16 max-[499px]:w-[144px] max-[499px]:h-[144px] h-[168px] w-[168px]" +
              " self-baseline",
          }}
        />
      )}
      <div
        className={twJoin(
          "ds-stack ds-stack-16 w-full break-words",
          image && "min-[500px]:ml-16",
        )}
      >
        {label && <Heading {...label} />}
        {headline && <Heading tagName="h3" {...headline} />}
        {content && <RichText markdown={content} />}

        {detailsSummary && (
          <div className="ds-stack ds-stack-8 mt-16">
            {detailsSummary.title && (
              <Heading {...detailsSummary.title} className="ds-label-02-bold" />
            )}
            {detailsSummary.items &&
              detailsSummary.items.map((details) => (
                <DetailsSummary key={details.title} {...details} />
              ))}
          </div>
        )}
        {linkList && <LinkList {...linkList} />}

        {buttons && buttons.length > 0 && <ButtonContainer buttons={buttons} />}
      </div>
    </li>
  );
};

export default InfoBoxItem;
