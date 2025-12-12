import EmojiEventsOutlinedIcon from "@digitalservicebund/icons/EmojiEventsOutlined";
import { useOutletContext } from "react-router";
import { DownloadButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import downloadDocumentation from "~/service/wordDocumentationExport/wordDocumentation";
import { NavigationContext } from "./dokumentation._documentationNavigation";

const { finish } = digitalDocumentation;

export default function DocumentationSend() {
  const { prinzips } = useOutletContext<NavigationContext>();
  return (
    <>
      <MetaTitle prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_SEND.title}`} />
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
            text: finish.send.heading,
          }}
        >
          <RichText markdown={finish.send.content} />
        </InfoBox>
        <InfoBox
          heading={{
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
