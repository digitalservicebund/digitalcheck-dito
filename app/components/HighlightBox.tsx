import { ReactNode } from "react";
import Background from "./Background";

export type HighlightBoxProps = { children: ReactNode };

// TODO: refactor to a background type
export default function HighlightBox({
  children,
}: Readonly<HighlightBoxProps>) {
  return (
    <Background
      backgroundColor="blue"
      className="rounded-lg px-16 py-40 sm:px-80"
    >
      {children}
    </Background>
  );
}
