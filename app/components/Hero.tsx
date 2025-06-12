import Background from "./Background";
import Badge from "./Badge";
import Container from "./Container";
import Heading from "./Heading";
import RichText from "./RichText";

type HeroProps = {
  badge?: string;
  children: string;
  text?: string;
};

export default function Hero({ children, badge, text }: HeroProps) {
  return (
    <Background backgroundColor="blue">
      <Container className="ds-stack ds-stack-16">
        {badge && <Badge>{badge}</Badge>}
        <Heading tagName="h1">{children}</Heading>
        {text && <RichText markdown={text} />}
      </Container>
    </Background>
  );
}
