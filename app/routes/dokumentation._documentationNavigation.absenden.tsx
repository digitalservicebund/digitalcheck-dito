import EmojiEventsOutlinedIcon from "@digitalservicebund/icons/EmojiEventsOutlined";
import FileDownloadOutlinedIcon from "@digitalservicebund/icons/FileDownloadOutlined";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import downloadDocumentation from "~/utils/documentationCreationService/documentCreation";
import { NavigationContext } from "./dokumentation._documentationNavigation";

const { finish } = digitalDocumentation;

const DoneIcon = () => (
  <EmojiEventsOutlinedIcon className="size-80 fill-green-800" />
);

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

      <InfoBox
        look="highlight"
        className="bg-white"
        heading={{
          text: finish.download.heading,
        }}
        content={finish.download.content}
        buttons={[
          {
            look: "link",
            iconLeft: (
              <FileDownloadOutlinedIcon className="mr-1 fill-current" />
            ),
            text: finish.download.buttonText,
            onClick: () => void downloadDocumentation(prinzips),
          },
        ]}
      />

      <InfoBox
        look="highlight"
        className="bg-white"
        heading={{
          text: finish.send.heading,
        }}
        content={finish.send.content}
      />

      <InfoBox
        look="highlight"
        className="items-center bg-green-200"
        visual={{
          type: "icon",
          Icon: DoneIcon,
        }}
        heading={{
          text: finish.done,
        }}
      />
    </>
  );
}
