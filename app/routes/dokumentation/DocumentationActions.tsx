import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import { general } from "~/resources/content/shared/general";

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
} & (SubmitType | NextType);

export default function DocumentationActions({
  submit,
  previousUrl,
  nextUrl,
}: Readonly<DocumentationActionsProps>) {
  return (
    <ButtonContainer>
      {submit && <Button type="submit">{general.buttonNext.text}</Button>}
      {nextUrl && <Button href={nextUrl}>{general.buttonNext.text}</Button>}

      {previousUrl && (
        <Button href={previousUrl} look="tertiary">
          {general.buttonBack.text}
        </Button>
      )}
    </ButtonContainer>
  );
}
