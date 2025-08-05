import twMerge from "~/utils/tailwindMerge";
import Button, { type ButtonLinkProps, type ButtonProps } from "./Button";

type ButtonContainerProps = {
  className?: string;
  buttons: (ButtonLinkProps | ButtonProps)[];
};

const ButtonContainer = ({ buttons, className }: ButtonContainerProps) => {
  return (
    <div className={twMerge("flex flex-wrap gap-16", className)}>
      {buttons.map((button) => (
        <Button key={button.text ?? button.href} {...button} />
      ))}
    </div>
  );
};

export default ButtonContainer;
