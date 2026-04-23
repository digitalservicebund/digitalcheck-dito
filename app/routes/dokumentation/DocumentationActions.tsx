import { PublishedWithChangesOutlined } from "@digitalservicebund/icons";
import Button, { DownloadButton, LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import { useNavigationContext } from "~/contexts/DocumentationNavigationContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import { useWordDocumentation } from "~/service/wordDocumentationExport/wordDocumentation";

type SubmitType = {
  submit: true;
  nextUrl?: never;
};

type NextType = {
  submit?: false;
  nextUrl?: string;
};

type DocumentationActionsProps = {
  previousUrl?: string;
  showDownloadDraftButton?: boolean;
  showSavingTip?: boolean;
} & (SubmitType | NextType);

export default function DocumentationActions({
  submit,
  previousUrl,
  nextUrl,
  showDownloadDraftButton = false,
  showSavingTip = false,
}: Readonly<DocumentationActionsProps>) {
  const { prinzips } = useNavigationContext();
  const { downloadDocumentation } = useWordDocumentation();

  return (
    <div className="mt-80 space-y-40">
      <ButtonContainer>
        {submit && <Button type="submit">{general.buttonNext.text}</Button>}
        {nextUrl && (
          <LinkButton to={nextUrl}>{general.buttonNext.text}</LinkButton>
        )}

        {previousUrl && (
          <LinkButton to={previousUrl} look="tertiary">
            {general.buttonBack.text}
          </LinkButton>
        )}
        {showDownloadDraftButton && prinzips && (
          <DownloadButton
            look="ghost"
            onClick={() => void downloadDocumentation(prinzips)}
          >
            {digitalDocumentation.actions.saveDraft.title}
          </DownloadButton>
        )}
      </ButtonContainer>

      {showSavingTip && (
        <p className="text-ds-success flex flex-row gap-8">
          <PublishedWithChangesOutlined className="fill-ds-success" />
          {digitalDocumentation.actions.savingTip}
        </p>
      )}
    </div>
  );
}
