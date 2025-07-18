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
  className?: string;
};

export default function Hero({
  children,
  title,
  subtitle,
  className,
}: Readonly<HeroProps>) {
  const cssClasses = twMerge(
    BACKGROUND_COLORS[backgroundColor],
    backgroundColor === "darkBlue" && "text-white",
  );

  return (
    <div className={twMerge("bg-blue-100", className)}>
      <Container className="ds-stack ds-stack-16">
        <Heading tagName="h1">{title}</Heading>
        {subtitle && (
          <RichText markdown={subtitle} className="ds-subhead mt-16" />
        )}
        {children}
      </Container>
    </div>
  );
}
