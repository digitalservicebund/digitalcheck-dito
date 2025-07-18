import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";
import { BACKGROUND_COLORS } from ".";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundColor?: "blue" | "darkBlue";
};

export default function Hero({
  children,
  title,
  subtitle,
  backgroundColor = "blue",
}: Readonly<HeroProps>) {
  const cssClasses = twMerge(
    BACKGROUND_COLORS[backgroundColor],
    backgroundColor === "darkBlue" && "text-white",
  );

  return (
    <div className={cssClasses}>
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
