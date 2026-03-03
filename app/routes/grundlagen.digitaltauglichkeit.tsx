import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { fundamentalsDigitalReadiness } from "~/resources/content/grundlage-digitaltauglichkeit";
import { ROUTE_FUNDAMENTALS_DIGITAL_READINESS } from "~/resources/staticRoutes";

export default function FundamentalsMethods() {
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
            separator
          >
            {fundamentalsDigitalReadiness.summary.items.map((item, i) => (
              <InfoBox
                key={item.heading.text ?? i}
                heading={item.heading}
                visual={{ type: "icon", Icon: item.visual.Icon }}
              >
                <RichText markdown={item.content} />
              </InfoBox>
            ))}
          </InfoBoxList>
        </Container>
        {/* <div className="bg-blue-100">
        <Container className="ds-stack ds-stack-40 py-80">
          <InfoBox
            heading={{
              text: fundamentalsDigitalReadiness.policyMaking.heading.text,
              tagName: "h2",
            }}
          >
            <RichText markdown={fundamentalsDigitalReadiness.policyMaking.content} />
          </InfoBox>
          <InfoBox
            heading={{
              text: fundamentalsDigitalReadiness.phases.heading.text,
            }}
          >
            <RichText markdown={fundamentalsDigitalReadiness.phases.content} />
          </InfoBox>
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
