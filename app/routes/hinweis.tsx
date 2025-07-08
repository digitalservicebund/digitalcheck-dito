import Background from "~/components/Background";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import { hinweis } from "~/resources/content/hinweis";

export default function Index() {
  return (
    <Background backgroundColor="blue" className="parent-bg-blue">
      <Container>
        <InfoBoxList heading={<Heading tagName="h1">{hinweis.title}</Heading>}>
          {hinweis.items.map((item, i) => (
            <InfoBox key={item.heading?.text || i} {...item} />
          ))}
        </InfoBoxList>
      </Container>
    </Background>
  );
}
