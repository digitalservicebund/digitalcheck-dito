import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";
import Badge, { BadgeProps } from "./Badge";
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

function InfoBoxIcon({ icon, size, className }: InfoBoxIconProps) {
  return (
    <div
      className={twMerge(
        `hidden sm:block [&>svg]:size-80 [&>svg]:fill-blue-500 *:${size}`,
        className,
      )}
    >
      {icon}
    </div>
  );
}

export type InfoBoxProps = {
  identifier?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  content?: string | BlocksContent;
  detailsSummary?: {
    title?: HeadingProps;
    items: DetailsSummaryProps[];
  };
  linkList?: LinkListProps;
  buttons?: ButtonProps[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
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
}: InfoBoxProps) => {
  return (
    <div
      id={identifier}
      data-testid="info-box-container"
      className={twMerge(
        "flex scroll-my-40 flex-col gap-32 sm:flex-row",
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
