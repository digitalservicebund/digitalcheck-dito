import Background from "./Background";
import Box, { BoxProps } from "./Box";
import Image, { ImageProps } from "./Image";

export type CardProps = BoxProps & {
  image: ImageProps;
};

export default function Card({ image, ...boxProps }: Readonly<CardProps>) {
  return (
    <div className="overflow-hidden">
      <Background backgroundColor="midBlue">
        <div className="px-20 pt-32 sm:px-96 sm:pt-44">
          <div className="&_img:object-cover &_img:object-top h-0 overflow-hidden pb-[40%] shadow-2xl">
            <Image {...image} />
          </div>
        </div>
      </Background>
      <Background
        backgroundColor="blue"
        className="px-16 pt-32 pb-48 sm:px-80 sm:pt-40"
      >
        <Box {...boxProps} />
      </Background>
    </div>
  );
}
