import Box from "~/components/Box";
import Container from "~/components/Container";
import { BACKGROUND_COLORS } from ".";

export type SupportBannerProps = {
  title: string;
  text: string;
};

export default function SupportBanner({
  title,
  text,
}: Readonly<SupportBannerProps>) {
  return (
    <div className={BACKGROUND_COLORS.midBlue}>
      <Container className="ds-stack ds-stack-16">
        <Box
          heading={{
            tagName: "h2",
            look: "ds-subhead font-bold",
            text: title,
          }}
          content={{
            markdown: text,
          }}
        ></Box>
      </Container>
    </div>
  );
}
