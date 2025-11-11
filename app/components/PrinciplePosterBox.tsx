import FileDownloadOutlinedIcon from "@digitalservicebund/icons/FileDownloadOutlined";
import { twJoin } from "tailwind-merge";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import Container from "./Container";
import InfoBox from "./InfoBox";

export function PrinciplePosterBox({
  hasBlueBackground = false,
}: Readonly<{
  hasBlueBackground?: boolean;
}>) {
  const { principlePosterBox } = methodsFivePrinciples;

  return (
    <div className={twJoin(hasBlueBackground && "bg-blue-100")}>
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
          content={principlePosterBox.content}
          links={[
            {
              text: principlePosterBox.downloadTitle,
              to: principlePosterBox.downloadUrl,
              look: "link" as const,
              iconLeft: <FileDownloadOutlinedIcon className="fill-current" />,
            },
          ]}
        />
      </Container>
    </div>
  );
}
