import Container from "~/components/Container";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox";
import InfoBox, { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import { fundamentalsDigitalReadiness } from "~/resources/content/grundlage-digitaltauglichkeit";
import { features } from "~/resources/features";
import { ROUTE_FUNDAMENTALS_DIGITAL_READINESS } from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_FUNDAMENTALS_DIGITAL_READINESS.title);
}

export default function FundamentalsMethods() {
  const showPage = useFeatureFlag(features.enableNewLandingPage);

  if (!showPage) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

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
      <div className="bg-blue-100">
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
      </div>
    </>
  );
}
