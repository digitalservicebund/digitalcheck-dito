import Container from "~/components/Container";
import Hero from "~/components/Hero";
import { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import MetaTitle from "~/components/Meta";
import { fundamentalsDigitalReadiness } from "~/resources/content/grundlage-digitaltauglichkeit";
import { ROUTE_FUNDAMENTALS_DIGITAL_READINESS } from "~/resources/staticRoutes";

export default function FundamentalsMethods() {
  const items: InfoBoxProps[] = fundamentalsDigitalReadiness.summary.items.map(
    (item) => {
      return {
        ...item,
        visual: { type: "icon", Icon: item.visual.Icon },
      };
    },
  );

  return (
    <>
      <MetaTitle prefix={ROUTE_FUNDAMENTALS_DIGITAL_READINESS.title} />
      <main>
        <Hero
          title={fundamentalsDigitalReadiness.title}
          subtitle={fundamentalsDigitalReadiness.subtitle}
        />
        <Container className="py-80">
          <InfoBoxList
            heading={{ text: fundamentalsDigitalReadiness.summary.title }}
            items={items}
            separator
          />
        </Container>
        {/* <div className="bg-blue-100">
        <Container className="ds-stack ds-stack-40 py-80">
          <InfoBox
            heading={{
              text: fundamentalsDigitalReadiness.policyMaking.heading.text,
              tagName: "h2",
            }}
            content={fundamentalsDigitalReadiness.policyMaking.content}
          />
          <InfoBox
            heading={{
              text: fundamentalsDigitalReadiness.phases.heading.text,
            }}
            content={fundamentalsDigitalReadiness.phases.content}
          />
          <ImageBox
            image={fundamentalsDigitalReadiness.phasesImage.img}
            plausibleEventName={
              fundamentalsDigitalReadiness.phasesImage.plausibleEventName
            }
            border
          />
        </Container>
      </div> */}
      </main>
    </>
  );
}
