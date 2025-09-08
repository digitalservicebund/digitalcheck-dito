import { twJoin } from "tailwind-merge";
import Badge, { BadgeProps } from "~/components/Badge.tsx";
import type { ButtonProps } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading, { HeadingProps } from "~/components/Heading.tsx";
import type { ImageProps } from "~/components/Image.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";
import RichText from "~/components/RichText.tsx";

import React from "react";
import twMerge from "~/utils/tailwindMerge";

type BulletListProps = React.PropsWithChildren<{
  className?: string;
}> &
  React.HTMLProps<HTMLUListElement>;

function Bullet() {
  return (
    <div
      className={
        "mt-10 flex size-[20px] shrink-0 items-center justify-center rounded-full bg-blue-900"
      }
      role="none"
    ></div>
  );
}

function BulletWrapper({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div role="none" className="w-[20px] shrink-0 md:w-[40px]">
      {children}
    </div>
  );
}

export type TimelineItemContentProps = {
  backgroundClasses?: string;
  badge?: BadgeProps;
  headline?: HeadingProps;
  parentHasHeading?: boolean;
  content?: string;
  image?: ImageProps;
  buttons?: ButtonProps[];
};

export function TimelineItemContent({
  backgroundClasses,
  badge,
  buttons,
  content,
  headline,
  image,
  parentHasHeading,
}: Readonly<TimelineItemContentProps>) {
  return (
    <div className={twJoin("flex flex-col gap-16", backgroundClasses)}>
      {badge && <Badge look="gray" {...badge} />}
      {headline && (
        <Heading tagName={parentHasHeading ? "h3" : "h2"} {...headline} />
      )}
      {content && <RichText markdown={content} />}
      {image && <ImageZoomable image={image} className="max-w-a11y" />}
      {buttons && buttons.length > 0 && <ButtonContainer buttons={buttons} />}
    </div>
  );
}

type TimelineItemProps = React.PropsWithChildren<{
  bullet?: boolean;
  className?: string;
}> &
  React.HTMLProps<HTMLLIElement>;

function TimelineItem({
  children,
  bullet,
  className,
  ...restProps
}: TimelineItemProps) {
  return (
    <li
      className="flex scroll-my-40 flex-row items-start gap-16 first:mt-16"
      {...restProps}
    >
      <BulletWrapper>{bullet && <Bullet />}</BulletWrapper>
      <div className={className}>{children}</div>
    </li>
  );
}

function Timeline({ className, children, ...restProps }: BulletListProps) {
  return (
    <div
      className={twMerge(
        "ds-stack ds-stack-8 group relative scroll-my-40",
        className,
      )}
    >
      <div className="absolute top-32 bottom-0 left-[8px] w-[4px] bg-blue-300"></div>
      <ul
        className="list-unstyled ds-stack ds-stack-32 relative"
        {...restProps}
      >
        {children}
      </ul>
    </div>
  );
}

Timeline.Item = TimelineItem;
Timeline.ItemContent = TimelineItemContent;

export default Timeline;
