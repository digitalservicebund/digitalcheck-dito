import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { imprint } from "~/resources/content/impressum";
import { ROUTE_IMPRINT } from "~/resources/staticRoutes";

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_IMPRINT.title} />
      <Hero title={imprint.title} />

      <ContentWrapper>
        <RichText
          markdown={imprint.content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </ContentWrapper>
    </>
  );
}
