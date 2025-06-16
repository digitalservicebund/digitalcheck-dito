import { ReactNode } from "react";
import { BackgroundColor } from ".";
import Background from "./Background";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundColor?: BackgroundColor;
};

export default function Hero({
  children,
  title,
  subtitle,
  backgroundColor = "blue",
}: Readonly<HeroProps>) {
  return (
    <Background backgroundColor={backgroundColor}>
      <Container className="ds-stack ds-stack-16">
        <Heading tagName="h1">{title}</Heading>
        {subtitle && (
          <RichText markdown={subtitle} className="ds-subhead mt-16" />
        )}
        {children}
      </Container>
    </Background>
  );
}
