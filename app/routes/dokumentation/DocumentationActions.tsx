import { PublishedWithChangesOutlined } from "@digitalservicebund/icons";
import Button, { DownloadButton, LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
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
  prinzips?: NavigationContext["prinzips"];
} & (SubmitType | NextType);

export default function DocumentationActions({
  submit,
  previousUrl,
  nextUrl,
  showDownloadDraftButton = false,
  showSavingTip = false,
  prinzips,
}: Readonly<DocumentationActionsProps>) {
  const { downloadDocumentation } = useWordDocumentation();

  return (
    <div className="mt-80 space-y-40">
      <ButtonContainer>
        {previousUrl && (
          <LinkButton href={previousUrl} look="tertiary">
            {general.buttonBack.text}
          </LinkButton>
        )}

        {submit && <Button type="submit">{general.buttonNext.text}</Button>}
        {nextUrl && (
          <LinkButton href={nextUrl}>{general.buttonNext.text}</LinkButton>
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
