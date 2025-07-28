import type { ReactNode } from "react";
import RichText from "~/components/RichText";
import twMerge from "~/utils/tailwindMerge";

export type HeadingProps = {
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  text?: string | ReactNode;
  markdown?: string;
  className?: string;
  look?: string;
  id?: string;
  children?: ReactNode;
  ariaLabel?: string;
};

function Heading({
  tagName = "h1",
  text,
  markdown,
  className,
  look,
  id,
  children,
  ariaLabel,
  ...additionalProps
}: Readonly<HeadingProps>) {
  const Tag = tagName as keyof React.JSX.IntrinsicElements;
  const cssClasses = twMerge("hyphens-none", look, className);

  if (children) {
    return (
      <Tag
        id={id}
        className={cssClasses}
        {...additionalProps}
        aria-label={ariaLabel}
      >
        {children ?? text}
      </Tag>
    );
  }
  if (markdown) {
    return (
      <Tag
        id={id}
        className={cssClasses}
        aria-label={ariaLabel}
        {...additionalProps}
      >
        <RichText markdown={markdown} />
      </Tag>
    );
  }
  return (
    <Tag
      id={id}
      className={cssClasses}
      aria-label={ariaLabel}
      {...additionalProps}
      dangerouslySetInnerHTML={{
        __html: text ?? "",
      }}
    />
  );
}

export default Heading;
