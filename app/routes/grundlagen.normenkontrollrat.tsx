import {
  FactCheckTwoTone,
  FileCopyTwoTone,
  InsertDriveFileTwoTone,
} from "@digitalservicebund/icons";
import Container from "~/components/Container";
import { Feature, FeatureList } from "~/components/FeatureList.tsx";
import Hero from "~/components/Hero";
import InfoBox, { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { fundamentalsNKR } from "~/resources/content/grundlage-normenkontrollrat";
import { ROUTE_FUNDAMENTALS_NKR } from "~/resources/staticRoutes";

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
      <MetaTitle prefix={ROUTE_FUNDAMENTALS_NKR.title} />
      <Hero title={fundamentalsNKR.title} subtitle={fundamentalsNKR.subtitle} />

      <Container className="space-y-40 py-40 md:py-80">
        <InfoBoxList
          items={items}
          separator
          className="ds-stack-80 mt-0 [&>li]:pb-80"
        />

        <section className="space-y-40">
          <h3 className="ds-body-01-reg">
            Der NKR <strong>betrachtet unter anderem</strong> in diesem Kontext:
          </h3>

          <FeatureList>
            <Feature>
              <FactCheckTwoTone className="size-40 fill-blue-700" />
              <RichText
                className="md:row-span-3 md:grid md:grid-rows-subgrid"
                markdown={fundamentalsNKR.NKRConsiderations.items[0]}
              />
            </Feature>
            <Feature>
              <InsertDriveFileTwoTone className="size-40 fill-blue-700" />
              <RichText
                className="md:row-span-3 md:grid md:grid-rows-subgrid"
                markdown={fundamentalsNKR.NKRConsiderations.items[1]}
              />
            </Feature>
            <Feature>
              <FileCopyTwoTone className="size-40 fill-blue-700" />
              <RichText
                className="md:row-span-3 md:grid md:grid-rows-subgrid"
                markdown={fundamentalsNKR.NKRConsiderations.items[2]}
              />
            </Feature>
          </FeatureList>
        </section>
      </Container>

      <div className="bg-blue-100">
        <Container className="space-y-32 py-40 md:space-y-40 md:py-80">
          <InfoBox
            heading={{ text: fundamentalsNKR.visualization.infoBox1.heading }}
          >
            <RichText
              markdown={fundamentalsNKR.visualization.infoBox1.content}
            />
          </InfoBox>

          <InfoBox
            className="bg-white"
            look="highlight"
            heading={{
              text: fundamentalsNKR.visualization.infoBox2.heading,
              className: "ds-subhead",
            }}
          >
            <RichText
              markdown={fundamentalsNKR.visualization.infoBox2.content}
            />
          </InfoBox>
        </Container>
      </div>
    </>
  );
}
