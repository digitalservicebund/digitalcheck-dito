import {
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  ContactSupportOutlined as ContactSupportOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  WarningAmber as WarningAmberIcon,
} from "@digitalservicebund/icons";
import type React from "react";
import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

// We can't set border-[${borderColor}] in the template because it causes inconsistent behavior in Storybook.
// Therefore, it's set in the config.
const lookConfig = {
  success: {
    backgroundColor: "bg-ds-green-100",
    borderColor: "border-ds-success",
    IconComponent: CheckCircleOutlinedIcon,
  },
  info: {
    backgroundColor: "bg-ds-blue-300",
    borderColor: "border-ds-blue-700",
    IconComponent: InfoOutlinedIcon,
  },
  warning: {
    backgroundColor: "bg-ds-yellow-200",
    borderColor: "border-ds-yellow-700",
    IconComponent: WarningAmberIcon,
  },
  missingOrIncomplete: {
    backgroundColor: "bg-ds-yellow-200",
    borderColor: "border-ds-yellow-700",
    IconComponent: LightbulbOutlinedIcon,
  },
  support: {
    backgroundColor: "bg-ds-yellow-200",
    borderColor: "border-ds-yellow-700",
    IconComponent: ContactSupportOutlinedIcon,
  },
  tips: {
    backgroundColor: "bg-ds-gray-100",
    borderColor: "border-ds-gray-600",
    IconComponent: LightbulbOutlinedIcon,
  },
};

type InlineNoticeProps = ComponentProps<"div"> & {
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
  ...rest
}: InlineNoticeProps) => {
  const { backgroundColor, borderColor, IconComponent } = lookConfig[look];

  return (
    <div
      {...rest}
      className={twJoin(
        "max-w-a11y scroll-my-40 space-y-8 p-16",
        backgroundColor,
        "border-2 border-l-8",
        borderColor,
        className,
      )}
      id={identifier}
    >
      <div className="flex flex-row items-center gap-4">
        {showIcon && <IconComponent className="mr-4 flex-none self-start" />}
        <div className="ds-label-01-bold *:ds-label-01-bold">{heading}</div>
      </div>
      {children && (
        <div className="leading-[26px] tracking-[0.16px]">{children}</div>
      )}
    </div>
  );
};

export default InlineNotice;
