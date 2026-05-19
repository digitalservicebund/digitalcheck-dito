import { EmojiEventsOutlined as EmojiEventsOutlinedIcon } from "@digitalservicebund/icons";
import { useOutletContext } from "react-router";
import { DownloadButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import CheckboxCard from "~/components/CheckboxCard.tsx";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Timeline from "~/components/Timeline.tsx";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { contact } from "~/resources/content/shared/contact.ts";
import { ROUTE_DOCUMENTATION_SEND } from "~/resources/staticRoutes";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import { useWordDocumentation } from "~/service/wordDocumentationExport/wordDocumentation";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import { NavigationContext } from "./dokumentation._documentationNavigation";

const { finish } = digitalDocumentation;

export default function DocumentationSend() {
  const { prinzips } = useOutletContext<NavigationContext>();
  const { downloadDocumentation } = useWordDocumentation();
  const { documentationData } = useDocumentationDataService();

  const hasInteroperabilityRequirement =
    documentationData.euInteroperabilityOutcome?.outcomeId === "REQUIRED";

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
        <CheckboxCard
          heading={
            <span className={"ds-heading-02-reg"}>
              1. Digitalcheck-Dokumentation abschließen
            </span>
          }
        >
          <Timeline>
            <Timeline.Item bullet>
              <Timeline.ItemContent>
                <h3>Word-Datei herunterladen</h3>
                <ButtonContainer>
                  <DownloadButton
                    onClick={() => void downloadDocumentation(prinzips)}
                  >
                    {finish.download.buttonText}
                  </DownloadButton>
                </ButtonContainer>
              </Timeline.ItemContent>
            </Timeline.Item>
            <Timeline.Item bullet>
              <Timeline.ItemContent>
                <h3>Dokumentation an den NKR verschicken</h3>
                <RichText markdown={finish.send.content} />
              </Timeline.ItemContent>
            </Timeline.Item>
          </Timeline>
        </CheckboxCard>

        {hasInteroperabilityRequirement && (
          <CheckboxCard
            heading={
              <span className={"ds-heading-02-reg"}>
                2. Interoperabilitäts-Bewertung abschließen
              </span>
            }
          >
            <RichText
              markdown={dedent`
              Bitte beachten Sie: Ihre Angaben zur EU-Interoperabilität sind dafür bestimmt, auf dem Portal [interoperable Europe](https://interoperable-europe.ec.europa.eu/collection/assessments/report/repository) veröffentlicht zu werden. Das geschieht erst, sobald der Referenten-Entwurf auf der Seite Ihres Ministeriums öffentlich gemacht wird.
          `}
            />

            <RichText
              markdown={dedent`
              
                - Senden Sie eine Kopie der E-Mail mit der Dokumentation an ${contact.mdMailToLink(contact.interoperabilityEmail)} (nationale Kontaktstelle nach Verordnung (EU) 2024/903 Art. 17).
                Die Daten aus der Bewertung werden auf dem Portal [interoperable Europe](https://interoperable-europe.ec.europa.eu/collection/assessments/report/repository) veröffentlicht.
 
          `}
            />
          </CheckboxCard>
        )}
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
