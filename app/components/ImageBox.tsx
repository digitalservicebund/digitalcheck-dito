import { twJoin } from "tailwind-merge";
import Heading from "~/components/Heading.tsx";
import type { ImageProps } from "~/components/Image.tsx";
import Image from "~/components/Image.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";
import twMerge from "~/utils/tailwindMerge";
import RichText from "./RichText";

const imageSizes = {
  XSMALL: "max-w-80",
  SMALL: "max-w-[120px]",
  MEDIUM: "sm:max-w-[280px] max-w-full",
  LARGE: "sm:max-w-[400px] max-w-full",
};

export type ImageBoxSize = keyof typeof imageSizes;

export type ImageBoxProps = {
  image: Readonly<ImageProps>;
  size?: ImageBoxSize;
  title?: string;
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  plausibleEventName?: string;
  zoomable?: boolean;
  border?: boolean;
  background?: boolean;
};

function ImageBox({
  image,
  title,
  className,
  tagName,
  plausibleEventName,
  border,
  size,
  zoomable = true,
  background = false,
}: Readonly<ImageBoxProps>) {
  if (!image.url) return null;
  const headingTag = tagName ?? "h3";
  const imageForZoomable: ImageProps = {
    ...image,
    className: twJoin(image.className, "border-[2px] border-[#004B760D]"),
  };

  const isBigImage = size === "MEDIUM" || size === "LARGE";

  return (
    <figure
      className={twMerge(className, size && twJoin("w-full", imageSizes[size]))}
    >
      {title && (
        <Heading className="ds-heading-03-reg pb-[24px]" tagName={headingTag}>
          {title}
        </Heading>
      )}
      {zoomable && isBigImage ? (
        <ImageZoomable
          image={imageForZoomable}
          plausibleEventName={plausibleEventName}
          className="object-cover"
          square={!!size}
        />
      ) : (
        <Image {...image} className="object-contain" />
      )}
      {image.caption && (
        <figcaption
          className={twJoin(
            "label-03-reg w- pt-[24px] **:max-w-fit",
            background && "bg-blue-100 p-16",
          )}
        >
          <RichText markdown={image.caption} />
        </figcaption>
      )}
      {border && (
        <hr className="my-[16px] w-[120px] border-t-[2px] border-blue-300" />
      )}
    </figure>
  );
}

export default ImageBox;
