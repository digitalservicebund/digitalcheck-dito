import Container from "~/components/Container";
import Hero from "~/components/Hero";
import { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import { fundamentalsNKR } from "~/resources/content/grundlage-normenkontrollrat";
import { ROUTE_FUNDAMENTALS_NKR } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_NKR.title);
}

export default function FundamentalsMethods() {
  const items: InfoBoxProps[] = fundamentalsNKR.summary.items.map((item) => {
    return {
      ...item,
      heading: { ...item.heading, tagName: "h2", look: "ds-heading-03-reg" },
      visual: { type: "icon", Icon: item.visual.Icon },
      contentClassName: "ds-stack-24 [&>ul]:space-y-24",
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
