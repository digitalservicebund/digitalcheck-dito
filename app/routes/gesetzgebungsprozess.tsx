import Hero from "~/components/Hero";
import SVGWithMinimap from "~/components/SVGWithMiniMap";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { features } from "~/utils/featureFlags.ts";

export default function Gesetzgebungsprozess() {
  const enableGesetzgebungsprozessOverview = useFeatureFlag(
    features.showGesetzgebungsprozessOverview,
  );

  if (!enableGesetzgebungsprozessOverview) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  return (
    <main>
      <Hero title="Der Digitalcheck im Gesetzgebungsprozess"></Hero>

      <SVGWithMinimap
        className="mt-40 mb-80"
        svgSrc="/images/regelungen-description.svg"
      />
    </main>
  );
}
