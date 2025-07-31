import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import Container from "./Container";
import InfoBox from "./InfoBox";

export function PrinciplePosterBox() {
  const { principlePosterBox } = methodsFivePrinciples;

  return (
    <Container>
      <InfoBox
        look="highlight"
        visual={{
          type: "image",
          image: {
            url: principlePosterBox.imageUrl,
            alternativeText: principlePosterBox.imageAlt,
            size: "large",
          },
        }}
        badge={{
          text: principlePosterBox.badgeText,
        }}
        identifier="principle-poster-box"
        heading={{
          tagName: "h2",
          text: principlePosterBox.heading,
        }}
        content={principlePosterBox.content}
        linkList={{
          links: [
            {
              title: principlePosterBox.downloadTitle,
              url: principlePosterBox.downloadUrl,
              download: true,
            },
          ],
        }}
      />
    </Container>
  );
}
