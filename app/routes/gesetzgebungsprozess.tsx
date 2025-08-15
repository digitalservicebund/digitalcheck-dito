import Hero from "~/components/Hero";
import SVGWithMinimap from "~/components/SVGWithMiniMap";
import { features } from "~/resources/features";
import useFeatureFlag from "~/utils/featureFlags";

export default function Gesetzgebungsprozess() {
  const enableGesetzgebungsprozessOverview = useFeatureFlag(
    features.enableGesetzgebungsprozessOverview,
  );

  if (!enableGesetzgebungsprozessOverview) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  return (
    <>
      <Hero title="Der Digitalcheck im Gesetzgebungsprozess"></Hero>

      <SVGWithMinimap
        className="mt-40 mb-80"
        svgSrc="/images/regelungen-description.svg"
      />
    </>
  );
}
