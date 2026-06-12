import { EmojiEventsOutlined as EmojiEventsOutlinedIcon } from "@digitalservicebund/icons";
import { DownloadButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { pruefstelleMails } from "~/resources/content/shared/bundeslaender";
import { useWordDocumentation } from "~/service/wordDocumentationExport/wordDocumentation";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const { finish } = digitalDocumentation;

export function DocumentationSend() {
  const { prinzips } = useDocumentationNavigation();
  const { downloadDocumentation } = useWordDocumentation();
  const { documentationData } = useDocumentationDataService();

  const bundesland = documentationData.policyTitle?.bundesland || undefined;
  const isBund = bundesland === "Bund";
  const pruefstelleMail = bundesland && pruefstelleMails.get(bundesland);
  const hasPruefstelle = !!pruefstelleMail;
  return (
    <>
      <Heading
        text={finish.heading.text}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />

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
          <RichText
            markdown={
              hasPruefstelle
                ? finish.download.content
                : finish.download.contentNoPruefstelle(bundesland)
            }
          />
          <ButtonContainer>
            <DownloadButton
              onClick={() => void downloadDocumentation(prinzips)}
            >
              {finish.download.buttonText}
            </DownloadButton>
          </ButtonContainer>
        </InfoBox>
        {hasPruefstelle && (
          <InfoBox
            look="highlight"
            className="bg-white"
            heading={{
              tagName: "h2",
              look: "ds-heading-03-reg",
              text: finish.send.heading,
            }}
          >
            <RichText
              markdown={
                isBund
                  ? finish.send.content(pruefstelleMail)
                  : finish.send.contentBundesland(pruefstelleMail)
              }
            />
          </InfoBox>
        )}
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
