import Background from "./Background";
import Box, { BoxProps } from "./Box";

export type HighlightBoxProps = BoxProps;

export default function HighlightBox(props: HighlightBoxProps) {
  return (
    <Background backgroundColor="blue" className="rounded-lg px-80 pt-32 pb-40">
      <Box {...props} />
    </Background>
  );
}
