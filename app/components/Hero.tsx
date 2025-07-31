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
