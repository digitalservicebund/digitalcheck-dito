import Background from "./Background";
import Box, { BoxProps } from "./Box";

export type HighlightBoxProps = BoxProps;

export default function HighlightBox(props: HighlightBoxProps) {
  return (
    <Background
      backgroundColor="blue"
      className="rounded-lg px-16 pt-32 pb-48 sm:px-80 sm:pb-40"
    >
      <Box {...props} />
    </Background>
  );
}
