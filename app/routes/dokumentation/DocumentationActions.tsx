import Button from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import { general } from "~/resources/content/shared/general";

type SubmitType = {
  submit: true;
  nextRoute?: undefined;
};

type NextType = {
  submit?: false;
  nextRoute?: string;
};

type DocumentationActionsProps = {
  previousRoute?: string;
} & (SubmitType | NextType);

export default function DocumentationActions({
  submit,
  previousRoute,
  nextRoute,
}: Readonly<DocumentationActionsProps>) {
  return (
    <ButtonContainer>
      {submit && <Button type="submit">{general.buttonNext.text}</Button>}
      {nextRoute && <Button href={nextRoute}>{general.buttonNext.text}</Button>}

      {previousRoute && (
        <Button href={previousRoute} look="tertiary">
          {general.buttonBack.text}
        </Button>
      )}
    </ButtonContainer>
  );
}
