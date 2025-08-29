import ZoomInOutlined from "@digitalservicebund/icons/ZoomInOutlined";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import Image, { type ImageProps } from "~/components/Image";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import twMerge from "~/utils/tailwindMerge";

type ImageZoomableComponentProps = {
  image: Readonly<ImageProps>;
  plausibleEventName?: string;
  className?: string;
  square?: boolean;
};

function ImageZoomable({
  image,
  plausibleEventName,
  className,
  square,
}: Readonly<ImageZoomableComponentProps>) {
  if (!image.url) return null;

  const plausibleEvent = getPlausibleEventClassName(plausibleEventName);

  return (
    <Link
      to={image.url}
      reloadDocument
      target="_blank"
      rel="noreferrer"
      className={twJoin(
        "relative block cursor-zoom-in",
        plausibleEvent,
        square && "after:block after:pb-[100%] after:content-['']",
      )}
    >
      <Image
        {...image}
        className={twMerge(
          "h-auto w-full",
          image.className,
          className,
          square && "absolute h-full w-full",
        )}
      />
      <ZoomInOutlined
        className="absolute bottom-16 left-16 size-24 rounded-xs border-4 border-blue-800 bg-blue-800 p-1 shadow-sm"
        fill="white"
      />
    </Link>
  );
}

export default ImageZoomable;
