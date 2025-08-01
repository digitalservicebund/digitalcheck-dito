import Container from "~/components/Container";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox";
import InfoBox, { type InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList.tsx";
import SupportBanner from "~/components/SupportBanner";
import { basicsDigitalReadiness } from "~/resources/content/grundlage-digitaltauglichkeit";
import { supportBanner } from "~/resources/content/shared/support-banner";
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

  const items: InfoBoxProps[] = basicsDigitalReadiness.summary.items.map(
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
        title={basicsDigitalReadiness.title}
        subtitle={basicsDigitalReadiness.subtitle}
      />

      <Container className="py-80">
        <InfoBoxList
          heading={{ text: basicsDigitalReadiness.summary.title }}
          items={items}
          separator
        />
      </Container>
      <div className="bg-blue-100">
        <Container className="ds-stack ds-stack-40 py-80">
          <InfoBox
            heading={{
              text: basicsDigitalReadiness.policyMaking.heading.text,
              tagName: "h2",
            }}
            content={basicsDigitalReadiness.policyMaking.content}
          />
          <InfoBox
            heading={{
              text: basicsDigitalReadiness.phases.heading.text,
            }}
            content={basicsDigitalReadiness.phases.content}
          />
          <ImageBox
            image={basicsDigitalReadiness.phasesImage.img}
            plausibleEventName={
              basicsDigitalReadiness.phasesImage.plausibleEventName
            }
            border
            size="LARGE"
          />
        </Container>
      </div>
      <SupportBanner {...supportBanner} />
    </>
  );
}
