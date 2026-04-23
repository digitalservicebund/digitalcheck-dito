import { HelpOutlineOutlined } from "@digitalservicebund/icons";
import { type ReactNode, useEffect } from "react";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { features } from "~/utils/featureFlags";
import customTwMerge from "~/utils/tailwindMerge";

type HelpButtonProps = {
  sectionId: string;
  className?: string;
  title?: string;
  children?: ReactNode;
};

export default function HelpButton({
  sectionId,
  className,
  title,
  children,
}: Readonly<HelpButtonProps>) {
  const { openPanel, registerSection } = useHelpPanel();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  useEffect(() => {
    if (title && children) {
      return registerSection({ id: sectionId, title, content: children });
    }
  }, [sectionId, title, children, registerSection]);

  if (!simplifiedFlow) return null;

  return (
    <>
      &nbsp;
      <button
        type="button"
        aria-label="Hilfe anzeigen"
        className={customTwMerge(
          "inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800",
          "h-20 w-20 fill-blue-800",
          "translate-y-4",
          className,
        )}
        onClick={() => openPanel(sectionId)}
      >
        <HelpOutlineOutlined className="h-full w-full" />
      </button>
    </>
  );
}
