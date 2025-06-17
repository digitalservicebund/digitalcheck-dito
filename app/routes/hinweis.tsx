import Background from "~/components/Background";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import InfoBoxList from "~/components/InfoBoxList";
import { hinweis } from "~/resources/content/hinweis";

export default function Index() {
  return (
    <Background backgroundColor="blue" className="parent-bg-blue">
      <Container>
        <InfoBoxList>
          <Heading>{hinweis.title}</Heading>
          <InfoBoxList.List>
            {hinweis.items.map((item, i) => (
              <InfoBoxList.Item key={item.heading?.text ?? i} {...item} />
            ))}
          </InfoBoxList.List>
        </InfoBoxList>
      </Container>
    </Background>
  );
}
