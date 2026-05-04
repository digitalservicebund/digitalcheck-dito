import { useNavigate } from "react-router";
import Button, { DownloadButton, LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Dialog from "~/components/Dialog.tsx";
import RichText from "~/components/RichText.tsx";
import { digitalDocumentation } from "~/resources/content/dokumentation.ts";
import { general } from "~/resources/content/shared/general.ts";
import {
  ROUTE_DOCUMENTATION_TITLE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes.ts";
import { useDocumentationRouteData } from "~/routes/dokumentation/hooks.tsx";
import { useWordDocumentation } from "~/service/wordDocumentationExport/wordDocumentation.ts";
import { useNonce } from "~/utils/nonce.ts";
import { useDocumentationDataService } from "./DocumentationDataProvider";

const { start } = digitalDocumentation;

function StartOverDialog({
  deleteDocumentationData,
}: {
  deleteDocumentationData: () => void;
}) {
  const navigate = useNavigate();
  const supportingData = useDocumentationRouteData();
  const { downloadDocumentation } = useWordDocumentation();

  const downloadDraft = async () => {
    await downloadDocumentation(supportingData.prinzips);
  };

  return (
    <Dialog
      title={start.startOverDialog.title}
      renderToggleButton={({ toggleDialog }) => (
        <Button
          look="tertiary"
          className={"js-only"}
          onClick={toggleDialog}
          type="button"
        >
          {start.actions.startOver.buttonText}
        </Button>
      )}
      renderActionButtons={({ closeDialog }) => (
        <div className="flex flex-row gap-12">
          <Button
            type="button"
            onClick={async () => {
              deleteDocumentationData();
              await navigate(ROUTES_DOCUMENTATION_INTRO[0].url);
            }}
          >
            {start.startOverDialog.actions.confirm}
          </Button>

          <Button type="button" look="tertiary" onClick={closeDialog}>
            {general.buttonCancel.text}
          </Button>
        </div>
      )}
    >
      <div className="space-y-16">
        <RichText markdown={start.startOverDialog.bodyMarkdown} />
        <DownloadButton look="link" onClick={downloadDraft}>
          {digitalDocumentation.actions.saveDraft.title}
        </DownloadButton>
      </div>
    </Dialog>
  );
}

export function DocumentationContinueActions() {
  const { hasSavedDocumentation, deleteDocumentationData } =
    useDocumentationDataService();
  const nonce = useNonce();
  return (
    <ButtonContainer>
      {hasSavedDocumentation ? (
        <>
          <LinkButton to={ROUTE_DOCUMENTATION_TITLE.url} className="js-only">
            {start.actions.resume.buttonText}
          </LinkButton>
          <StartOverDialog deleteDocumentationData={deleteDocumentationData} />
        </>
      ) : (
        <LinkButton to={ROUTES_DOCUMENTATION_INTRO[0].url} className="js-only">
          {start.actions.startInitial.buttonText}
        </LinkButton>
      )}
      <noscript>
        {/* Hides the CTA when JavaScript is disabled */}
        <style nonce={nonce}>{".js-only {display: none;}"}</style>
        <Button type={"button"} disabled={true}>
          {start.actions.startInitial.buttonText}
        </Button>
      </noscript>
    </ButtonContainer>
  );
}
