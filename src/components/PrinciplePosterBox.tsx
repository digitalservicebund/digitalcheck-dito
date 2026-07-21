import RichText from "@/components/RichText.tsx";
import { methodsFivePrinciples } from "@/resources/content/methode-fuenf-prinzipien";
import { twJoin } from "tailwind-merge";
import { DownloadLinkButton } from "./Button";
import Container from "./Container";
import InfoBox from "./InfoBox";

export function PrinciplePosterBox({
  hasBlueBackground = false,
}: Readonly<{ hasBlueBackground?: boolean }>) {
  const { principlePosterBox } = methodsFivePrinciples;

  return (
    <div className={twJoin(hasBlueBackground && "bg-ds-blue-100")}>
      <Container>
        <InfoBox
          look="highlight"
          className={twJoin(hasBlueBackground && "bg-white")}
          visual={{
            type: "image",
            image: {
              url: principlePosterBox.imageUrl,
              alternativeText: principlePosterBox.imageAlt,
              size: "large",
            },
          }}
          badge={{
            children: principlePosterBox.badgeText,
          }}
          identifier="principle-poster-box"
          heading={{
            tagName: "h2",
            text: principlePosterBox.heading,
          }}
        >
          <RichText markdown={principlePosterBox.content} />
          <DownloadLinkButton href={principlePosterBox.downloadUrl}>
            {principlePosterBox.downloadTitle}
          </DownloadLinkButton>
        </InfoBox>
      </Container>
    </div>
  );
}
