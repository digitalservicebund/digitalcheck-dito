import { HelpOutlineOutlined } from "@digitalservicebund/icons";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { features } from "~/utils/featureFlags";

export default function HelpButton({
  sectionId,
}: Readonly<{ sectionId: string }>) {
  const { openPanel } = useHelpPanel();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  if (!simplifiedFlow) return null;

  return (
    <button
      type="button"
      aria-label="Hilfe anzeigen"
      className="inline-flex items-center text-blue-800 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
      onClick={() => openPanel(sectionId)}
    >
      <HelpOutlineOutlined className="h-20 w-20" />
    </button>
  );
}
