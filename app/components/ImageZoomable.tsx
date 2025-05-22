import ZoomInOutlined from "@digitalservicebund/icons/ZoomInOutlined";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import Image, { type ImageProps } from "~/components/Image";
import twMerge from "~/utils/tailwindMerge";

type ImageZoomableComponentProps = {
  image: Readonly<ImageProps>;
  plausibleEventName?: string;
  className?: string;
};

function ImageZoomable({
  image,
  plausibleEventName,
  className,
}: Readonly<ImageZoomableComponentProps>) {
  if (!image.url) return null;

  return (
    <Link
      to={image.url}
      reloadDocument
      target="_blank"
      rel="noreferrer"
      className={twJoin(
        "relative block cursor-zoom-in",
        plausibleEventName && `plausible-event-name=${plausibleEventName}`,
      )}
    >
      <Image
        {...image}
        className={twMerge("h-auto w-full", image.className, className)}
      />
      <ZoomInOutlined
        className="absolute bottom-16 left-16 size-48 bg-blue-800 p-1 shadow-sm"
        fill="white"
      />
    </Link>
  );
}

export default ImageZoomable;
