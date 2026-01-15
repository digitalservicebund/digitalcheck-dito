import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  preline?: ReactNode;
  className?: string;
};

export default function Hero({
  children,
  title,
  subtitle,
  className,
}: Readonly<HeroProps>) {
  return (
    <div className={twMerge("bg-blue-100", className)}>
      <Container className="ds-stack ds-stack-16 pb-48">
        <Heading tagName="h1">{title}</Heading>
        {subtitle && (
          <RichText markdown={subtitle} className="ds-subhead mt-16" />
        )}
        {children}
      </Container>
    </div>
  );
}

/**
 * An alternative Hero component that works with the
 * breakout-grid utility.
 */
export function BreakoutHero({
  preline,
  children,
  title,
  subtitle,
  className,
}: Readonly<HeroProps>) {
  return (
    <div className={twMerge("breakout bg-blue-100 pt-40 pb-48", className)}>
      {preline}
      <Heading tagName="h1">{title}</Heading>
      {subtitle && (
        <RichText markdown={subtitle} className="ds-subhead mt-16" />
      )}
      {children}
    </div>
  );
}
