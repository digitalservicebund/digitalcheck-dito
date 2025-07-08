import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { twJoin } from "tailwind-merge";
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
  Icon: React.SVGProps<SVGSVGElement>;
};

function InfoBoxIcon({ Icon, size, className }: InfoBoxIconProps) {
  return (
    <div
      className={twMerge(
        `hidden sm:block [&>svg]:size-80 [&>svg]:fill-blue-500 *:${size}`,
        className,
      )}
    >
      <Icon />
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
  icon?: InfoBoxIconProps;
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
  icon,
}: InfoBoxProps) => {
  return (
    <div
      id={identifier}
      data-testid="info-box-container"
      className={twJoin(
        "flex scroll-my-40 flex-col gap-32 sm:flex-row",
        className,
      )}
    >
      {icon && <InfoBoxIcon {...icon} />}
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
