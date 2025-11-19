import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { privacy } from "~/resources/content/datenschutz";
import { ROUTE_PRIVACY } from "~/resources/staticRoutes";

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_PRIVACY.title} />
      <Hero title={privacy.title} />

      <ContentWrapper>
        <RichText
          markdown={privacy.content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </ContentWrapper>
    </>
  );
}
