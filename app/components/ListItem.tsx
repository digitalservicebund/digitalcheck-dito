import { twJoin } from "tailwind-merge";
import type { ImageProps } from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import twMerge from "~/utils/tailwindMerge";
import Badge from "./Badge";
import { type ButtonProps } from "./Button";
import ButtonContainer from "./ButtonContainer";
import Heading, { type HeadingProps } from "./Heading";
import RichText from "./RichText";

export type ListItemProps = {
  identifier?: string;
  label?: HeadingProps;
  headline?: HeadingProps;
  spacer?: boolean | HeadingProps;
  content?: string;
  buttons?: ButtonProps[];
  backgroundColorClass?: string;
  parentHasHeading?: boolean;
  isDisabled?: boolean;
  readonly numeric?: number;
  hasBullet?: boolean;
  image?: ImageProps;
  className?: string;
};

const ListItem = ({
  identifier,
  label,
  headline,
  spacer,
  content,
  buttons,
  numeric,
  hasBullet,
  parentHasHeading,
  isDisabled,
  image,
  className,
  backgroundColorClass,
}: ListItemProps) => {
  const backgroundColorClassNames = backgroundColorClass
    ? `px-80 pt-40 pb-48 max-sm:px-16 max-sm:py-32 ${backgroundColorClass}`
    : "mt-4";
  const textColor = isDisabled ? "text-gray-800" : "";
  const responsiveWidth = numeric ? "w-[40px]" : "w-[40px] max-sm:w-[20px]";

  return (
    <div
      id={identifier}
      className={twMerge(
        "flex flex-row items-center justify-center",
        className,
      )}
    >
      <div className={twJoin("ds-stack ds-stack-16 w-full break-words")}>
        {spacer && (
          <div
            className={twJoin(
              "-mb-12!",
              numeric && "border-t-2 border-gray-400 pb-16",
            )}
          >
            {spacer !== true && (
              <div
                className={twJoin(
                  "flex flex-row items-start gap-16",
                  numeric && "mt-32",
                )}
              >
                <span
                  className={twJoin("shrink-0", responsiveWidth)}
                  role="none"
                />
                <Heading
                  tagName="div"
                  className="ds-label-section text-gray-900"
                  {...spacer}
                />
              </div>
            )}
          </div>
        )}
        <div className={twJoin("flex flex-row items-start gap-16", textColor)}>
          <div className={twJoin("shrink-0", responsiveWidth)}>
            {numeric && (
              <div className="flex size-[40px] items-center justify-center rounded-full border-2 border-solid border-gray-400">
                {numeric}
              </div>
            )}
            {hasBullet && (
              <div
                className={twJoin(
                  "flex size-[20px] items-center justify-center rounded-full bg-blue-900",
                  backgroundColorClass ? "mt-0" : "mt-10",
                )}
                role="none"
              ></div>
            )}
          </div>
          <div className={twJoin(backgroundColorClass && "w-full rounded-lg")}>
            <div
              className={twJoin(
                "flex flex-col gap-16",
                backgroundColorClassNames,
              )}
            >
              {label && (
                <Badge look="hint">{label.children ?? label.text}</Badge>
              )}
              {headline && (
                <Heading
                  tagName={parentHasHeading ? "h3" : "h2"}
                  {...headline}
                />
              )}
              {content && <RichText markdown={content} />}
              {image && <ImageZoomable image={image} className="max-w-a11y" />}
              {buttons && buttons.length > 0 && (
                <ButtonContainer buttons={buttons} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
