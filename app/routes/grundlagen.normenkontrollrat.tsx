import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox, { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import RichText from "~/components/RichText";
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
      contentClassName: "ds-stack-24 [&>ul]:space-y-24",
    };
  });

  return (
    <>
      <Hero title={fundamentalsNKR.title} subtitle={fundamentalsNKR.subtitle} />

      <Container className="space-y-40 py-40 md:py-80">
        <InfoBoxList items={items} separator className="mt-0" />

        <section className="space-y-40">
          <h3 className="ds-body-01-reg">
            <RichText markdown={fundamentalsNKR.NKRConsiderations.title} />
          </h3>

          <div className="grid gap-x-40 gap-y-32 md:grid-cols-3 md:gap-y-16">
            {fundamentalsNKR.NKRConsiderations.items.map((item, i) => (
              <div
                key={`item${i}`}
                className="md:row-span-4 md:grid md:grid-rows-subgrid"
              >
                <item.icon className="mb-16 h-40 w-40 fill-blue-800" />

                <RichText
                  className="md:row-span-3 md:grid md:grid-rows-subgrid [&>ul]:row-span-2 [&>ul]:grid [&>ul]:grid-rows-subgrid"
                  markdown={item.content}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>

      <div className="bg-blue-100">
        <Container className="space-y-32 py-40 md:space-y-40 md:py-80">
          <InfoBox
            heading={{ text: fundamentalsNKR.visualization.infoBox1.heading }}
            content={fundamentalsNKR.visualization.infoBox1.content}
          />
          <InfoBox
            className="bg-white"
            look="highlight"
            heading={{
              text: fundamentalsNKR.visualization.infoBox2.heading,
              className: "ds-subhead",
            }}
            content={fundamentalsNKR.visualization.infoBox2.content}
          />
        </Container>
      </div>
    </>
  );
}
