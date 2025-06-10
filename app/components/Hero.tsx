import Background from "./Background";
import Badge from "./Badge";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  heading: string;
  text?: string;
};

export default function Hero({ heading, badge, text }: HeroProps) {
  return (
    <Background backgroundColor="blue">
      <Container className="ds-stack ds-stack-16">
        {badge && <Badge>{badge}</Badge>}
        <Heading tagName="h1">{heading}</Heading>
        {text && <RichText markdown={text} />}
      </Container>
    </Background>
  );
}
