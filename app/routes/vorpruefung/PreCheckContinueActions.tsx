import { useNavigate } from "react-router";
import Button, { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Dialog from "~/components/Dialog.tsx";
import RichText from "~/components/RichText.tsx";
import { PRE_CHECK_START_BUTTON_ID } from "~/resources/constants";
import { general } from "~/resources/content/shared/general.ts";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK_INFO } from "~/resources/staticRoutes.ts";
import { useNonce } from "~/utils/nonce.ts";
import { usePreCheckData } from "./preCheckDataHook";
import { deletePreCheckData } from "./preCheckDataService";

function StartOverDialog() {
  const navigate = useNavigate();

  return (
    <Dialog
      title={preCheck.startOver.title}
      renderToggleButton={({ toggleDialog }) => (
        <Button
          look="tertiary"
          className={"js-only"}
          onClick={toggleDialog}
          type="button"
        >
          {preCheck.startOver.buttonText}
        </Button>
      )}
      renderActionButtons={({ closeDialog }) => (
        <div className="flex flex-row gap-12">
          <Button
            type="button"
            onClick={async () => {
              deletePreCheckData();
              await navigate(ROUTE_PRECHECK_INFO.url);
            }}
          >
            {preCheck.startOver.confirm}
          </Button>

          <Button type="button" look="tertiary" onClick={closeDialog}>
            {general.buttonCancel.text}
          </Button>
        </div>
      )}
    >
      <div className="space-y-16">
        <RichText markdown={preCheck.startOver.bodyMarkdown} />
      </div>
    </Dialog>
  );
}

export function PreCheckContinueActions() {
  const { hasData, firstUnansweredQuestionIndex } = usePreCheckData();
  const nonce = useNonce();

  const resumeLink =
    firstUnansweredQuestionIndex === null ||
    firstUnansweredQuestionIndex === preCheck.questions.length
      ? ROUTE_PRECHECK_INFO.url
      : preCheck.questions[firstUnansweredQuestionIndex].url;

  return (
    <ButtonContainer>
      {hasData ? (
        <>
          <LinkButton to={resumeLink} className="js-only">
            {preCheck.resume.buttonText}
          </LinkButton>
          <StartOverDialog />
        </>
      ) : (
        <LinkButton
          className="js-only"
          id={PRE_CHECK_START_BUTTON_ID}
          to={ROUTE_PRECHECK_INFO.url}
        >
          {preCheck.start.buttonText}
        </LinkButton>
      )}
      <noscript>
        {/* Hides the CTA when JavaScript is disabled */}
        <style nonce={nonce}>{".js-only {display: none;}"}</style>
        <Button type={"button"} disabled={true}>
          {preCheck.start.buttonText}
        </Button>
      </noscript>
    </ButtonContainer>
  );
}
