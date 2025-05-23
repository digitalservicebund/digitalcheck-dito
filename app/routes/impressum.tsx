import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import RichText from "~/components/RichText";
import { imprint } from "~/resources/content/impressum";
import { ROUTE_IMPRINT } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_IMPRINT.title);
}

export default function Index() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: imprint.title,
            }}
          ></Header>
        </Container>
      </Background>
      <Container>
        <RichText markdown={imprint.content} />
      </Container>
    </>
  );
}
