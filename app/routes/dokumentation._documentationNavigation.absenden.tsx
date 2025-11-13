import EmojiEventsOutlinedIcon from "@digitalservicebund/icons/EmojiEventsOutlined";
import { useOutletContext } from "react-router";
import { DownloadButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading from "~/components/Heading";
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
      <MetaTitle prefix={ROUTE_DOCUMENTATION_SEND.title} />
      <Heading
        text={finish.heading.text}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={finish.heading.markdown} />

      <InfoBoxList
        items={[
          {
            look: "highlight",
            className: "bg-white",
            heading: {
              text: finish.download.heading,
            },
            content: finish.download.content,
            children: (
              <ButtonContainer>
                <DownloadButton
                  onClick={() => void downloadDocumentation(prinzips)}
                >
                  {finish.download.buttonText}
                </DownloadButton>
              </ButtonContainer>
            ),
          },
          {
            look: "highlight",
            className: "bg-white",
            heading: {
              text: finish.send.heading,
            },
            content: finish.send.content,
          },
          {
            look: "highlight",
            className: "items-center bg-green-200",
            visual: {
              type: "icon",
              Icon: EmojiEventsOutlinedIcon,
              className: "size-80 fill-green-800",
            },
            heading: {
              text: finish.done,
            },
          },
        ]}
      />
    </>
  );
}
