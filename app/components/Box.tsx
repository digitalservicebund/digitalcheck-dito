import { useId } from "react";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import twMerge from "~/utils/tailwindMerge";
import Badge, { BadgeProps } from "./Badge";
import Button, { ButtonLinkProps, ButtonProps } from "./Button";
import Heading, { type HeadingProps } from "./Heading";
import RichText, { type RichTextProps } from "./RichText";

export type BoxProps = {
  identifier?: string;
  badge?: BadgeProps;
  heading?: HeadingProps;
  content?: RichTextProps;
  className?: string;
  buttons?: (ButtonLinkProps | ButtonProps)[];
};

/**
 * @deprecated Use InfoBox instead
 */
const Box = ({
  identifier,
  badge,
  heading,
  content,
  buttons,
  className,
}: BoxProps) => {
  const generatedId = useId();
  const headingId = heading?.id ?? generatedId;
  const labelId = `${headingId}-label`;
  return (
    <div
      className={twMerge("box ds-stack ds-stack-16 scroll-my-40", className)}
      id={identifier}
    >
      <div className="ds-stack ds-stack-8">
        {badge && <Badge {...badge} />}
        {heading && (
          <Heading
            tagName="h2"
            id={headingId}
            {...heading}
            aria-labelledby={`${labelId} ${headingId}`}
          />
        )}
        {content && <RichText {...content} />}
      </div>
      {buttons && buttons.length > 0 && (
        <ButtonContainer>
          {buttons.map((button) => (
            <Button key={button.text ?? button.href} {...button} />
          ))}
        </ButtonContainer>
      )}
    </div>
  );
};

export default Box;
