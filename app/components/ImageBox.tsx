import { twJoin } from "tailwind-merge";
import Heading from "~/components/Heading.tsx";
import type { ImageProps } from "~/components/Image.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";

export type ImageBoxProps = {
  image: Readonly<ImageProps>;
  title?: string;
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  plausibleEventName?: string;
};

function ImageBox({
  image,
  title,
  className,
  tagName,
  plausibleEventName,
}: Readonly<ImageBoxProps>) {
  if (!image || !image.url) return null;
  const headingTag = tagName ? tagName : "h3";
  const imageForZoomable: ImageProps = {
    ...image,
    className: twJoin(image.className, "border-[2px] border-[#004B760D]"),
  };
  return (
    <figure className={twJoin("pb-[40px]", className)}>
      {title && (
        <Heading className="ds-heading-03-reg pb-[24px]" tagName={headingTag}>
          {title}
        </Heading>
      )}
      <ImageZoomable
        image={imageForZoomable}
        plausibleEventName={plausibleEventName}
      />
      <figcaption className="label-03-reg pt-[24px]">
        {image.caption}
      </figcaption>
      <hr className="my-[16px] w-[120px] border-t-[2px] border-blue-300" />
    </figure>
  );
}

export default ImageBox;
