import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";

export type SupportBannerProps = {
  sections: { title: string; text: string }[];
};

export default function SupportBanner({
  sections,
}: Readonly<SupportBannerProps>) {
  return (
    <Background backgroundColor="midBlue">
      <Container className="ds-stack ds-stack-16">
        {sections.map((section) => (
          <Box
            key={section.title}
            heading={{
              tagName: "h2",
              look: "ds-subhead font-bold",
              text: section.title,
            }}
            content={{
              markdown: section.text,
            }}
          ></Box>
        ))}
      </Container>
    </Background>
  );
}
