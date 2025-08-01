import Container from "~/components/Container";
import Hero from "~/components/Hero";
import { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import { fundamentalsNKR } from "~/resources/content/grundlage-normenkontrollrat";
import { features } from "~/resources/features";
import { ROUTE_FUNDAMENTALS_NKR } from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_NKR.title);
}

export default function FundamentalsMethods() {
  const showPage = useFeatureFlag(features.enableNewLandingPage);

  if (!showPage) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  const items: InfoBoxProps[] = fundamentalsNKR.summary.items.map((item) => {
    return {
      ...item,
      heading: { ...item.heading, tagName: "h2", look: "ds-heading-03-reg" },
      visual: { type: "icon", Icon: item.visual.Icon },
    };
  });

  return (
    <>
      <Hero title={fundamentalsNKR.title} subtitle={fundamentalsNKR.subtitle} />

      <Container className="py-80">
        <InfoBoxList items={items} separator className="mt-0" />
      </Container>
    </>
  );
}
