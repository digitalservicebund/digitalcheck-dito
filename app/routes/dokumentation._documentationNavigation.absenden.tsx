import { EmojiEventsOutlined as EmojiEventsOutlinedIcon } from "@digitalservicebund/icons";
import { DownloadButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { useWordDocumentation } from "~/service/wordDocumentationExport/wordDocumentation";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const { finish } = digitalDocumentation;

export function DocumentationSend() {
  const { prinzips } = useDocumentationNavigation();
  const { downloadDocumentation } = useWordDocumentation();
  const { documentationData } = useDocumentationDataService();

  return (
    <>
      <Heading
        text={finish.heading.text}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={finish.heading.markdown} />

      <InfoBoxList>
        <InfoBox
          look="highlight"
          className="bg-white"
          heading={{
            tagName: "h2",
            look: "ds-heading-03-reg",
            text: finish.download.heading,
          }}
        >
          <RichText markdown={finish.download.content} />
          <ButtonContainer>
            <DownloadButton
              onClick={() => void downloadDocumentation(prinzips)}
            >
              {finish.download.buttonText}
            </DownloadButton>
          </ButtonContainer>
        </InfoBox>
        <InfoBox
          look="highlight"
          className="bg-white"
          heading={{
            tagName: "h2",
            look: "ds-heading-03-reg",
            text: finish.send.heading,
          }}
        >
          <RichText markdown={finish.send.content} />
        </InfoBox>
        <InfoBox
          look="highlight"
          className="bg-white"
          heading={{
            tagName: "h2",
            look: "ds-heading-03-reg",
            text: "Interoperabilitätsbewertung herunterladen",
          }}
        >
          <RichText
            markdown={dedent`
            Laden Sie die Interoperabilitätsbewertung herunter, um sie zu verakten
            und an die nationale Kontaktstelle zu senden.
          `}
          />
          <ButtonContainer>
            <DownloadButton
              onClick={() => void downloadAssessment(documentationData)}
            >
              Bewertung herunterladen (.docx)
            </DownloadButton>
          </ButtonContainer>
        </InfoBox>
        <InfoBox
          heading={{
            tagName: "h2",
            look: "ds-heading-03-reg",
            text: finish.done,
          }}
          visual={{
            type: "icon",
            Icon: EmojiEventsOutlinedIcon,
            className: "size-80 fill-green-800",
          }}
          look="highlight"
          className="items-center bg-green-200"
        />
      </InfoBoxList>
    </>
  );
}

export default function Route() {
  return <DocumentationSend />;
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import { downloadAssessment } from "~/service/wordDocumentationExport/wordInteroperabilityAssessment.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

export function AbsendenPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationSend />
    </DocumentationPageShell>
  );
}
