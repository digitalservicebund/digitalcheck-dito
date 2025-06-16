import Container from "~/components/Container";
import Hero from "~/components/Hero";
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
      <Hero title={imprint.title} />

      <Container>
        <RichText markdown={imprint.content} />
      </Container>
    </>
  );
}
