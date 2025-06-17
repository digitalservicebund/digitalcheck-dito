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

export type InfoBoxProps = {
  identifier?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  imageBox?: ImageBoxProps;
  content?: string | BlocksContent;
  detailsSummary?: {
    title?: HeadingProps;
    items: DetailsSummaryProps[];
  };
  linkList?: LinkListProps;
  buttons?: ButtonProps[];
  separator?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const InfoBox = ({
  identifier,
  badge,
  heading,
  imageBox,
  content,
  detailsSummary,
  linkList,
  buttons,
  separator,
  Icon,
}: InfoBoxProps) => {
  const isBigImage = imageBox?.size === "MEDIUM" || imageBox?.size === "LARGE";

  return (
    <div
      id={identifier}
      className={twJoin(
        "flex scroll-my-40 flex-col gap-32 sm:flex-row",
        separator &&
          "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0",
        imageBox && isBigImage && "flex-col-reverse",
      )}
    >
      {Icon && <Icon className="hidden size-80 fill-blue-500 sm:block" />}
      {imageBox && <ImageBox {...imageBox} background />}

      <div className={twJoin("ds-stack ds-stack-16 break-words")}>
        {badge && <Badge className="self-start" {...badge} />}
        {heading && <Heading tagName="h3" {...heading} />}
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
    </div>
  );
};

export default InfoBox;
