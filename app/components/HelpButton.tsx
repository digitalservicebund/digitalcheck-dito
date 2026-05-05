import { HelpOutlineOutlined } from "@digitalservicebund/icons";
import { ReactNode, useEffect } from "react";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
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

  useEffect(() => {
    if (title && children) {
      registerSection({ id: sectionId, title, content: children });
    }
  }, [sectionId, title, children, registerSection]);

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
