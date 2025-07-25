import Container from "~/components/Container";
import InfoBoxList from "~/components/InfoBoxList";
import { hinweis } from "~/resources/content/hinweis";

export default function Index() {
  return (
    <div className="parent-bg-blue">
      <Container>
        <InfoBoxList
          heading={{ text: hinweis.title, tagName: "h1" }}
          items={hinweis.items}
        />
      </Container>
    </div>
  );
}
