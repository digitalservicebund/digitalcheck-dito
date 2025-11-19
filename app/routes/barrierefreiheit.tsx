import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { accessibility } from "~/resources/content/barrierefreiheit";
import { ROUTE_A11Y } from "~/resources/staticRoutes";

export default function Accessibility() {
  return (
    <>
      <MetaTitle prefix={ROUTE_A11Y.title} />
      <Hero title={accessibility.title} subtitle={accessibility.subtitle} />

      <ContentWrapper>
        <RichText
          markdown={accessibility.content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </ContentWrapper>
    </>
  );
}
