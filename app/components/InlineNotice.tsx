import CheckCircleOutlinedIcon from "@digitalservicebund/icons/CheckCircleOutlined";
import ContactSupportOutlinedIcon from "@digitalservicebund/icons/ContactSupportOutlined";
import InfoOutlinedIcon from "@digitalservicebund/icons/InfoOutlined";
import LightbulbOutlinedIcon from "@digitalservicebund/icons/LightbulbOutlined";
import WarningAmberIcon from "@digitalservicebund/icons/WarningAmber";
import React from "react";
import { twJoin } from "tailwind-merge";

// We can't set border-[${borderColor}] in the template because it causes inconsistent behavior in Storybook.
// Therefore, it's set in the config.
const lookConfig = {
  success: {
    backgroundColor: "bg-green-100",
    borderColor: "border-[#005E34]",
    IconComponent: CheckCircleOutlinedIcon,
  },
  info: {
    backgroundColor: "bg-blue-300",
    borderColor: "border-blue-700",
    IconComponent: InfoOutlinedIcon,
  },
  warning: {
    backgroundColor: "bg-yellow-200",
    borderColor: "border-[#E5CE5C]",
    IconComponent: WarningAmberIcon,
  },
  support: {
    backgroundColor: "bg-yellow-200",
    borderColor: "border-[#E5CE5C]",
    IconComponent: ContactSupportOutlinedIcon,
  },
  tips: {
    backgroundColor: "bg-gray-100",
    borderColor: "border-[#B8BDC3]",
    IconComponent: LightbulbOutlinedIcon,
  },
};

type InlineNoticeProps = {
  identifier?: string;
  look: keyof typeof lookConfig;
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
  heading?: React.ReactNode;
};

const InlineNotice = ({
  identifier,
  look,
  className,
  showIcon = true,
  children,
  heading,
}: InlineNoticeProps) => {
  const { backgroundColor, borderColor, IconComponent } = lookConfig[look];

  return (
    <div
      className={twJoin(
        "ds-stack ds-stack-8 max-w-a11y scroll-my-40 p-16",
        backgroundColor,
        "border-2 border-l-8",
        borderColor,
        className,
      )}
      id={identifier}
    >
      <div className="ds-label-01-bold flex flex-row items-center gap-[4px]">
        {showIcon && <IconComponent className="mr-4 flex-none" />}
        {heading}
      </div>
      <div className="leading-[26px] tracking-[0.16px]">{children}</div>
    </div>
  );
};

export default InlineNotice;
