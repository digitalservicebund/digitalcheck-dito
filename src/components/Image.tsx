export type ImageProps = {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  className?: string;
  caption?: string;
};

function Image({
  url,
  width,
  height,
  alternativeText,
  className,
  ...props
}: Readonly<ImageProps>) {
  if (!url) return null;

  return (
    <img
      {...props}
      src={url}
      alt={alternativeText}
      width={width}
      height={height}
      className={className}
    />
  );
}

export default Image;
