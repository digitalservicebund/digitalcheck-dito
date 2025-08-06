import Container from "~/components/Container";
import Hero from "~/components/Hero";
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
      <Hero title={accessibility.title} />

      <Container>
        <RichText
          markdown={accessibility.content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </Container>
    </>
  );
}
