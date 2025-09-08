import React from "react";
import twMerge from "~/utils/tailwindMerge";
import Button, { type ButtonLinkProps, type ButtonProps } from "./Button";

type ButtonContainerProps = {
  className?: string;
  /**
   * @deprecated Use children instead.
   */
  buttons?: (ButtonLinkProps | ButtonProps)[];
  children?: React.ReactNode;
};

const ButtonContainer = ({
  buttons,
  className,
  children,
}: ButtonContainerProps) => {
  return (
    <div className={twMerge("flex flex-wrap gap-16", className)}>
      {buttons?.map((button) => (
        <Button key={button.text ?? button.href} {...button} />
      ))}
      {children}
    </div>
  );
};

export default ButtonContainer;
