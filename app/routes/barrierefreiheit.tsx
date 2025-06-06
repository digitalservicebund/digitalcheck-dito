import Background from "~/components/Background";
import Container from "~/components/Container";
import Header from "~/components/Header";
import RichText from "~/components/RichText";
import { accessibility } from "~/resources/content/barrierefreiheit";
import { ROUTE_A11Y } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_A11Y.title);
}

export default function Accessibility() {
  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: accessibility.title,
            }}
          ></Header>
        </Container>
      </Background>
      <Container>
        <RichText markdown={accessibility.content} />
      </Container>
    </>
  );
}
