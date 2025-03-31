import ZoomInOutlined from "@digitalservicebund/icons/ZoomInOutlined";
import { Link } from "react-router";
import Image, { type ImageProps } from "~/components/Image";

function ImageZoomable(image: Readonly<ImageProps>) {
  if (!image.url) return null;

  return (
    <Link
      to={image.url}
      reloadDocument
      target="_blank"
      rel="noreferrer"
      className="relative block cursor-zoom-in"
    >
      <Image {...image} className="h-auto w-full" />
      <ZoomInOutlined
        className="absolute bottom-16 left-16 size-48 bg-blue-800 p-1 shadow-sm"
        fill="white"
      />
    </Link>
  );
}

export default ImageZoomable;
