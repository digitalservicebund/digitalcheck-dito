import Container from "~/components/Container";
import Hero from "~/components/Hero";
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
      <Hero title={privacy.title} />

      <Container>
        <RichText
          markdown={privacy.content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </Container>
    </>
  );
}
