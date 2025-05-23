import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import RichText from "~/components/RichText";
import { privacy } from "~/resources/content/datenschutz";
import { ROUTE_PRIVACY } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_PRIVACY.title);
}

export default function Index() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: privacy.title,
            }}
          ></Header>
        </Container>
      </Background>
      <Container>
        <RichText markdown={privacy.content} />
      </Container>
    </>
  );
}
