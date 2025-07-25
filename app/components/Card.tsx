import Box, { BoxProps } from "./Box";
import Image, { ImageProps } from "./Image";

export type CardProps = BoxProps & {
  image: ImageProps;
};

export default function Card({ image, ...boxProps }: Readonly<CardProps>) {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="bg-ds-mid-blue px-20 pt-40 sm:px-96 sm:pt-44">
        <div className="&_img:object-cover &_img:object-top h-0 overflow-hidden pb-[40%] shadow-2xl">
          <Image {...image} />
        </div>
      </div>
      <Box
        {...boxProps}
        className="bg-ds-blue px-16 py-24 sm:px-80 sm:pt-40 sm:pb-48"
      />
    </div>
  );
}
