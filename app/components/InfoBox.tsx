import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import twMerge from "~/utils/tailwindMerge";
import { ImageBoxSize } from "./ImageBox";

export type InfoBoxIconProps = {
  className?: string;
  size: ImageBoxSize;
  content: ReactNode;
};

function InfoBoxIcon({ content, size, className }: InfoBoxIconProps) {
  return (
    <div
      className={twMerge(
        `hidden sm:block [&>svg]:size-80 [&>svg]:fill-blue-500 *:${size}`,
        className,
      )}
    >
      {content}
    </div>
  );
}

export type InfoBoxProps = {
  identifier?: string;
  children: ReactNode;
  className?: string;
  icon?: InfoBoxIconProps;
};

const InfoBox = ({ identifier, children, className, icon }: InfoBoxProps) => {
  return (
    <div
      id={identifier}
      data-testid="info-box-container"
      className={twJoin(
        "flex scroll-my-40 flex-col gap-32 sm:flex-row",
        className,
      )}
    >
      {icon && <InfoBoxIcon {...icon} />}
      <div
        data-testid="info-box-content"
        className="ds-stack ds-stack-16 break-words"
      >
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
