import React from "react";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import { ContentAction } from "~/utils/contentTypes";
import type { Node } from "~/utils/paragraphUtils";
import twMerge from "~/utils/tailwindMerge";
import Badge, { type BadgeProps } from "./Badge";
import { BlocksRenderer } from "./BlocksRenderer";
import Button, { DownloadLinkButton, LinkButton } from "./Button";
import DetailsSummary, { DetailsSummaryProps } from "./DetailsSummary";
import Heading, { HeadingProps } from "./Heading";
import Image, { type ImageProps } from "./Image";
import RichText from "./RichText";

export type InfoImageProps = ImageProps & {
  size: "icon" | "small" | "medium" | "large";
};

type BaseInfoBoxProps = {
  identifier?: string;
  testId?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  content?: string | Node[];
  contentClassName?: string;
  /**
   * @deprecated Pass DetailsSummary in children
   */
  detailsSummary?: {
    title?: HeadingProps;
    items: DetailsSummaryProps[];
  };
  actions?: ContentAction[];
  className?: string;
  look?: "default" | "highlight" | "method";
};

type VisualProps =
  | {
      type: "icon";
      Icon: React.FC<React.SVGProps<SVGSVGElement>>;
      className?: string;
    }
  | { type: "image"; image: InfoImageProps }
  | { type: "component"; Component: React.ReactElement }
  | { type: "none" };

export type InfoBoxProps = BaseInfoBoxProps & {
  visual?: VisualProps;
  children?: React.ReactNode;
};

const imageSizes = {
  icon: "size-80",
  small: "size-[120px]",
  medium: "size-[280px]",
  large: "size-[280px] sm:size-[400px] md:size-[280px] lg:size-[400px]",
};

const InfoBox = ({
  identifier,
  testId,
  className,
  badge,
  heading,
  content,
  contentClassName,
  detailsSummary,
  actions,
  visual,
  look,
  children,
}: InfoBoxProps) => {
  return (
    <div
      id={identifier}
      data-testid={testId || "info-box-container"}
      className={twMerge(
        "flex scroll-my-40 flex-col gap-32 md:flex-row",
        // visual?.type === "image" ? "flex-col-reverse" : "flex-col",
        look === "highlight" && "rounded-lg bg-blue-100 px-16 py-40 sm:px-80",
        look === "method" &&
          "bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48",
        className,
      )}
    >
      {visual?.type === "icon" && (
        <visual.Icon
          className={twMerge(
            "hidden fill-blue-500 sm:block",
            imageSizes["icon"],
            visual.className,
          )}
        />
      )}
      {visual?.type === "image" && (
        <Image
          {...visual.image}
          className={twMerge(
            "flex-shrink-0 object-cover",
            imageSizes[visual.image.size],
            visual.image.className,
          )}
        />
      )}
      {visual?.type === "component" && visual.Component}
      <div
        data-testid="info-box-content"
        className="ds-stack ds-stack-16 flex-grow break-words"
      >
        {badge && <Badge className="self-start" {...badge} />}
        {heading && <Heading tagName="h3" {...heading} />}
        {content &&
          (typeof content === "string" ? (
            <RichText markdown={content} className={contentClassName} />
          ) : (
            <div className={contentClassName}>
              <BlocksRenderer content={content} />
            </div>
          ))}
        {children}
        {detailsSummary && (
          <div className="ds-stack ds-stack-8 mt-16">
            {detailsSummary.title && (
              <Heading {...detailsSummary.title} className="ds-label-02-bold" />
            )}
            {detailsSummary.items.map(({ title, ...details }) => (
              <DetailsSummary key={title} title={title} {...details} />
            ))}
          </div>
        )}

        {actions && actions.length > 0 && (
          <ButtonContainer className="mt-24">
            {actions.map((button) => {
              if ("linkTo" in button) {
                const { linkTo, text, ...rest } = button;
                if (button.download)
                  return (
                    <DownloadLinkButton
                      key={linkTo}
                      to={linkTo}
                      omitIcon
                      {...rest}
                    >
                      {text}
                    </DownloadLinkButton>
                  );
                return (
                  <LinkButton key={linkTo} to={linkTo} {...rest}>
                    {text}
                  </LinkButton>
                );
              }
              return (
                <Button type="button" key={button.text} {...button}>
                  {button.text}
                </Button>
              );
            })}
          </ButtonContainer>
        )}
      </div>
    </div>
  );
};

export default InfoBox;
