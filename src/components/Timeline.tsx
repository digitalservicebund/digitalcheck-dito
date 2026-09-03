import type { BadgeProps } from "@/components/Badge.tsx";
import { LinkButton } from "@/components/Button.tsx";
import type { HeadingProps } from "@/components/Heading.tsx";
import Heading from "@/components/Heading.tsx";
import type { ImageProps } from "@/components/Image.tsx";
import ImageZoomable from "@/components/ImageZoomable.tsx";
import RichText from "@/components/RichText.tsx";
import { twJoin } from "tailwind-merge";

import ButtonContainer from "@/components/ButtonContainer.tsx";
import type { ContentLink } from "@/utils/contentTypes";
import twMerge from "@/utils/tailwindMerge";
import type React from "react";
import type { ReactNode } from "react";

type BulletListProps = React.PropsWithChildren<{
  className?: string;
}> &
  React.HTMLProps<HTMLUListElement>;

function Bullet() {
  return (
    <div
      className={
        "mt-4 flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-800 outline-4 outline-white"
      }
      role="none"
    ></div>
  );
}

function BulletWrapper({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div role="none" className="w-20 shrink-0 md:w-40">
      {children}
    </div>
  );
}

function YearBadge({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <span className="kern-badge ml-10 w-fit -translate-x-1/2 border border-blue-800 bg-white outline-4 outline-white">
      <span className="kern-label">{children}</span>
    </span>
  );
}

export type TimelineItemContentProps = {
  backgroundClasses?: string;
  badge?: BadgeProps;
  headline?: HeadingProps;
  parentHasHeading?: boolean;
  content?: string;
  children?: ReactNode;
  image?: ImageProps;
  links?: ContentLink[];
};

export function TimelineItemContent({
  backgroundClasses,
  badge,
  links,
  content,
  headline,
  image,
  parentHasHeading,
  children,
}: Readonly<TimelineItemContentProps>) {
  return (
    <div className={twJoin("flex flex-col gap-16", backgroundClasses)}>
      {badge && (
        <div>
          <span className="kern-badge kern-badge--small border-0 bg-[#F3F4F7]">
            <span className="kern-label font-normal">{badge.text}</span>
          </span>
        </div>
      )}
      {headline && (
        <Heading tagName={parentHasHeading ? "h3" : "h2"} {...headline} />
      )}
      {content && <RichText markdown={content} />}
      {children}
      {image && <ImageZoomable image={image} className="max-w-a11y" />}
      {links && links.length > 0 && (
        <ButtonContainer>
          {links.map((link) => {
            const { to, text, externalLink = false, ...rest } = link;
            return (
              <LinkButton
                key={to}
                href={to}
                iconRight={externalLink ? "kern-icon--open-in-new" : undefined}
                {...rest}
              >
                {text}
              </LinkButton>
            );
          })}
        </ButtonContainer>
      )}
    </div>
  );
}

type TimelineItemProps = React.PropsWithChildren<{
  bullet?: boolean;
  year?: string;
  className?: string;
}> &
  React.HTMLProps<HTMLLIElement>;

function TimelineItem({
  children,
  bullet,
  year,
  className,
  ...restProps
}: TimelineItemProps) {
  return (
    <li
      className="flex scroll-my-40 flex-row items-start gap-16 first:mt-16"
      {...restProps}
    >
      <BulletWrapper>
        {year ? <YearBadge>{year}</YearBadge> : bullet && <Bullet />}
      </BulletWrapper>
      {children && <div className={className}>{children}</div>}
    </li>
  );
}

function Timeline({ className, children, ...restProps }: BulletListProps) {
  return (
    <div className={twMerge("relative scroll-my-40", className)}>
      <div className="absolute top-0 bottom-0 left-9.5 w-1 bg-blue-800"></div>
      <ul className="list-unstyled relative space-y-40" {...restProps}>
        {children}
      </ul>
    </div>
  );
}

Timeline.Item = TimelineItem;
Timeline.ItemContent = TimelineItemContent;

export default Timeline;
