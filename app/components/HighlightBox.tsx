import Background from "./Background";
import InfoBox, { InfoBoxProps } from "./InfoBox";

export type HighlightBoxProps = InfoBoxProps;

export default function HighlightBox(props: Readonly<HighlightBoxProps>) {
  return (
    <Background
      backgroundColor="blue"
      className="rounded-lg px-16 py-40 sm:px-80"
    >
      <InfoBox {...props} />
    </Background>
  );
}
