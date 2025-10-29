import FileDownloadOutlined from "@digitalservicebund/icons/FileDownloadOutlined";
import { useOutletContext } from "react-router";
import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import downloadDocumentation from "~/service/wordDocumentationExport/wordDocumentation";

type SubmitType = {
  submit: true;
  nextUrl?: undefined;
};

type NextType = {
  submit?: false;
  nextUrl?: string;
};

type DocumentationActionsProps = {
  previousUrl?: string;
  showDownloadDraftButton?: boolean;
} & (SubmitType | NextType);

export default function DocumentationActions({
  submit,
  previousUrl,
  nextUrl,
  showDownloadDraftButton = false,
}: Readonly<DocumentationActionsProps>) {
  const { prinzips } = useOutletContext<NavigationContext>();

  return (
    <ButtonContainer className="mt-80">
      {submit && <Button type="submit">{general.buttonNext.text}</Button>}
      {nextUrl && <Button href={nextUrl}>{general.buttonNext.text}</Button>}

      {previousUrl && (
        <Button href={previousUrl} look="tertiary">
          {general.buttonBack.text}
        </Button>
      )}
      {showDownloadDraftButton && prinzips && (
        <Button
          type="button"
          look="ghost"
          iconLeft={<FileDownloadOutlined />}
          onClick={() => void downloadDocumentation(prinzips)}
        >
          {digitalDocumentation.actions.saveDraft.title}
        </Button>
      )}
    </ButtonContainer>
  );
}
