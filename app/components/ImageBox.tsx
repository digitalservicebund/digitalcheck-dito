import { twJoin } from "tailwind-merge";
import Heading from "~/components/Heading.tsx";
import type { ImageProps } from "~/components/Image.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";

export type ImageBoxProps = {
  image: Readonly<ImageProps>;
  title?: string;
  caption: string;
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
};

function ImageBox({
  image,
  title,
  caption,
  className,
  tagName,
}: Readonly<ImageBoxProps>) {
  if (!image || !image.url) return null;
  const headingTag = tagName ? tagName : "h3";
  return (
    <figure className={twJoin("pb-[40px]", className)}>
      {title && (
        <Heading className="ds-heading-03-reg pb-[24px]" tagName={headingTag}>
          {title}
        </Heading>
      )}
      <ImageZoomable {...image} className="border-[2px] border-[#004B760D]" />
      <figcaption className="label-03-reg pt-[24px]">{caption}</figcaption>
      <hr className="my-8 w-[120px] border-t-[2px] border-blue-300" />
    </figure>
  );
}

export default ImageBox;
