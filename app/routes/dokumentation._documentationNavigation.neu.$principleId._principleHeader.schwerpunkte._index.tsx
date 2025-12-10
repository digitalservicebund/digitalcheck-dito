import ArrowForward from "@digitalservicebund/icons/ArrowForward";
import CheckCircleRounded from "@digitalservicebund/icons/CheckCircleRounded";
import HelpOutline from "@digitalservicebund/icons/HelpOutline";
import { Link, useOutletContext } from "react-router";
import { DownloadButton, LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import downloadDocumentation from "~/service/wordDocumentationExport/wordDocumentation";
import { dedent } from "~/utils/dedentMultilineStrings";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContextWithPrinciple } from "./dokumentation._documentationNavigation.neu.$principleId";
import { useDocumentationData } from "./dokumentation/documentationDataHook";

export default function NewDocumentationPrincipleAspects() {
  const { prinzip, prinzips, nextUrl, previousUrl } =
    useOutletContext<NavigationContextWithPrinciple>();

  const { documentationData } = useDocumentationData();

  const principleData = documentationData?.principles?.find(
    (principle) => principle.id === prinzip.documentId,
  );

  const reasoning =
    typeof principleData?.reasoning === "string"
      ? []
      : principleData?.reasoning || [];

  return (
    <>
      <Heading tagName="h2" look="ds-heading-03-reg">
        Erläuterung angeben
      </Heading>
      <RichText
        markdown={dedent`
          Bitte wählen Sie, auf welche **Schwerpunkte** dieses Prinzips Ihr Vorhaben zutrifft. Zu jedem Schwerpunkt finden Sie eine kurze Beschreibung, wenn Sie ihn auswählen. Falls keiner zutrifft, wählen Sie **„Eigene Erklärung hinzufügen“**.
          
          Sie können Ihre Angaben als Word Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.
          
          Wenn sie mehr dazu erfahren wollen, dann klicken sie auf den jeweiligen Schwerpunkt.
      `}
      />

      <ul className="list-unstyled space-y-40">
        {prinzip.Aspekte.map((aspekt) => {
          const selected =
            reasoning.find(
              ({ aspect }) => slugify(aspekt.Kurzbezeichnung) === aspect,
            )?.checkbox === "on";
          return (
            <li
              key={aspekt.Kurzbezeichnung}
              className="flex items-center gap-32"
            >
              <Link
                to={slugify(aspekt.Kurzbezeichnung)}
                className="max-w-a11y grid grid-flow-col grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-16 rounded border border-blue-400 bg-blue-200 p-16"
              >
                <span className="row-span-2">
                  {selected && (
                    <CheckCircleRounded className="fill-ds-green-700 size-36" />
                  )}
                </span>
                <span>
                  <strong>{aspekt.Kurzbezeichnung}</strong>
                </span>
                <span>Erläutern Sie, wie der Schwerpunkt erfüllt ist</span>
                <ArrowForward className="row-span-2 size-36 fill-blue-800" />
              </Link>
              <HelpOutline className="size-36 fill-blue-800" />
            </li>
          );
        })}
      </ul>

      <div className="mt-80 space-y-40">
        <ButtonContainer>
          <LinkButton to={nextUrl}>Weiter zum nächsten Prinzip</LinkButton>

          <LinkButton to={previousUrl} look="tertiary">
            {general.buttonBack.text}
          </LinkButton>

          <DownloadButton
            look="ghost"
            onClick={() => void downloadDocumentation(prinzips)}
          >
            {digitalDocumentation.actions.saveDraft.title}
          </DownloadButton>
        </ButtonContainer>
      </div>
    </>
  );
}
