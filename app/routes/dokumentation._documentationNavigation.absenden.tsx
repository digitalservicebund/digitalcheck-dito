import EmojiEventsOutlinedIcon from "@digitalservicebund/icons/EmojiEventsOutlined";
import FileDownloadOutlinedIcon from "@digitalservicebund/icons/FileDownloadOutlined";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import downloadDocumentation from "~/utils/documentationCreationService/documentCreation";
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
      <RichText markdown={finish.heading.markdown} className="mb-8" />

      <InfoBoxList
        items={[
          {
            look: "highlight",
            className: "bg-white",
            heading: {
              text: finish.download.heading,
            },
            content: finish.download.content,
            buttons: [
              {
                look: "link",
                iconLeft: (
                  <FileDownloadOutlinedIcon className="mr-1 fill-current" />
                ),
                text: finish.download.buttonText,
                onClick: () => void downloadDocumentation(prinzips),
              },
            ],
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
