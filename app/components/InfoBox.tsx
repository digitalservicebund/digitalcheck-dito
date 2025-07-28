import { ReactNode } from "react";
import type { Node } from "~/utils/paragraphUtils";
import twMerge from "~/utils/tailwindMerge";
import Badge, { BadgeProps } from "./Badge";
import { BlocksRenderer } from "./BlocksRenderer";
import { ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import DetailsSummary, { DetailsSummaryProps } from "./DetailsSummary";
import Heading, { HeadingProps } from "./Heading";
import { ImageBoxSize } from "./ImageBox";
import LinkList, { LinkListProps } from "./LinkList";
import RichText from "./RichText";

export type InfoBoxIconProps = {
  className?: string;
  size: ImageBoxSize;
  icon: ReactNode;
};

export type InfoBoxProps = {
  identifier?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  content?: string | Node[];
  detailsSummary?: {
    title?: HeadingProps;
    items: DetailsSummaryProps[];
  };
  linkList?: LinkListProps;
  buttons?: ButtonProps[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  look?: "default" | "highlight" | "method";
};

const InfoBox = ({
  identifier,
  className,
  badge,
  heading,
  content,
  detailsSummary,
  linkList,
  buttons,
  Icon,
  look,
}: InfoBoxProps) => {
  return (
    <div
      id={identifier}
      data-testid="info-box-container"
      className={twMerge(
        "flex scroll-my-40 flex-col gap-32 sm:flex-row",
        look === "highlight" && "bg-ds-blue rounded-lg px-16 py-40 sm:px-80",
        look === "method" &&
          "bg-ds-blue px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48",
        className,
      )}
    >
      {Icon && <Icon className="hidden size-80 fill-blue-500 sm:block" />}

      <div
        data-testid="info-box-content"
        className="ds-stack ds-stack-16 break-words"
      >
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
