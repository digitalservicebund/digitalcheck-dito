import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";

export type SupportBannerProps = {
  title: string;
  text: string;
};

export default function SupportBanner({
  title,
  text,
}: Readonly<SupportBannerProps>) {
  return (
    <Background backgroundColor="midBlue">
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
    </Background>
  );
}
