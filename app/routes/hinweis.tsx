import Background from "~/components/Background";
import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox";
import { hinweis } from "~/resources/content/hinweis";

export default function Index() {
  return (
    <Background backgroundColor="blue">
      <Container>
        <InfoBox
          heading={{
            tagName: "h1",
            text: hinweis.title,
          }}
          items={hinweis.items}
          separator={false}
        />
      </Container>
    </Background>
  );
}
