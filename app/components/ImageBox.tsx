import { twJoin } from "tailwind-merge";
import Heading from "~/components/Heading.tsx";
import type { ImageProps } from "~/components/Image.tsx";
import Image from "~/components/Image.tsx";
import ImageZoomable from "~/components/ImageZoomable.tsx";
import twMerge from "~/utils/tailwindMerge";
import RichText from "./RichText";

export type ImageBoxProps = {
  image: Readonly<ImageProps>;
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
  zoomable = true,
  background = false,
}: Readonly<ImageBoxProps>) {
  if (!image.url) return null;
  const headingTag = tagName ?? "h3";
  const imageForZoomable: ImageProps = {
    ...image,
    className: twJoin(image.className, "border-[2px] border-[#004B760D]"),
  };

  return (
    <figure className={twMerge(className, "w-full")}>
      {title && (
        <Heading className="ds-heading-03-reg pb-[24px]" tagName={headingTag}>
          {title}
        </Heading>
      )}
      {zoomable ? (
        <ImageZoomable
          image={imageForZoomable}
          plausibleEventName={plausibleEventName}
          className="object-cover"
        />
      ) : (
        <Image {...image} className="object-contain" />
      )}
      {image.caption && (
        <figcaption
          className={twJoin(
            "label-03-reg w- pt-[24px] **:max-w-fit",
            background && "bg-ds-blue p-16",
          )}
        >
          <RichText markdown={image.caption} />
        </figcaption>
      )}
      {border && (
        <hr className="border-ds-mid-blue my-[16px] w-[120px] border-t-[2px]" />
      )}
    </figure>
  );
}

export default ImageBox;
