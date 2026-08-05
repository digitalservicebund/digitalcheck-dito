import DetailsSummary from "@/components/DetailsSummary";
import InfoBox from "@/components/InfoBox";
import customTwMerge from "@/utils/tailwindMerge";
import type { ReactNode } from "react";

type SectionInlineComponentProps = {
  batchTitle: string;
  batchIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  infoBoxTitle: string;
  className?: string;
  children: ReactNode;
};

export function ContentInlineComponent({
  batchTitle,
  batchIcon,
  infoBoxTitle,
  className,
  children,
}: Readonly<SectionInlineComponentProps>) {
  return (
    <div className={customTwMerge(className, "space-y-16")}>
      <InfoBox
        className="bg-white"
        heading={{
          tagName: "h3",
          text: infoBoxTitle,
        }}
        badge={{
          look: "hint",
          text: batchTitle,
          Icon: batchIcon,
        }}
      ></InfoBox>
      <DetailsSummary title="Mehr dazu erfahren">{children}</DetailsSummary>
    </div>
  );
}
