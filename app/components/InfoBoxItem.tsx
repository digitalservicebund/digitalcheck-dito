import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { twJoin } from "tailwind-merge";
import Badge, { BadgeProps } from "./Badge";
import { type ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import DetailsSummary, { type DetailsSummaryProps } from "./DetailsSummary";
import Heading, { type HeadingProps } from "./Heading";
import ImageBox, { ImageBoxProps } from "./ImageBox";
import LinkList, { LinkListProps } from "./LinkList";
import RichText from "./RichText";

export type InfoBoxItemProps = {
  identifier?: string;
  badge?: BadgeProps;
  headline?: HeadingProps;
  imageBox?: ImageBoxProps;
  content?: string | BlocksContent;
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
  badge,
  headline,
  imageBox,
  content,
  detailsSummary,
  linkList,
  buttons,
  separator,
}: InfoBoxItemProps) => {
  const isBigImage = imageBox?.size === "MEDIUM" || imageBox?.size === "LARGE";

  return (
    <li
      id={identifier}
      className={twJoin(
        "scroll-my-40",
        separator &&
          "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0",
        imageBox && "flex flex-col gap-32 sm:flex-row",
        imageBox && isBigImage && "flex-col-reverse",
      )}
    >
      {imageBox && <ImageBox {...imageBox} background />}

      <div className={twJoin("ds-stack ds-stack-16 break-words")}>
        {badge && <Badge className="self-start" {...badge} />}
        {headline && <Heading tagName="h3" {...headline} />}
        {content &&
          (typeof content === "string" ? (
            <RichText markdown={content} />
          ) : (
            <BlocksRenderer content={content} />
          ))}

        {detailsSummary && (
          <div className="ds-stack ds-stack-8 mt-16">
            {detailsSummary.title && (
              <Heading {...detailsSummary.title} className="ds-label-02-bold" />
            )}
            {detailsSummary.items.map((details) => (
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
