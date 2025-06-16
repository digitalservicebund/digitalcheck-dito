import Background from "./Background";
import Badge from "./Badge";
import { ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  children: string;
  subtitle?: string;
  buttons?: ButtonProps[];
};

export default function Hero({
  children,
  badge,
  subtitle,
  buttons,
}: Readonly<HeroProps>) {
  return (
    <Background backgroundColor="blue">
      <Container className="ds-stack ds-stack-16">
        {badge && <Badge>{badge}</Badge>}
        <Heading tagName="h1">{children}</Heading>
        {subtitle && <RichText markdown={subtitle} className="ds-subhead" />}
        {buttons && buttons.length > 0 && <ButtonContainer buttons={buttons} />}
      </Container>
    </Background>
  );
}
