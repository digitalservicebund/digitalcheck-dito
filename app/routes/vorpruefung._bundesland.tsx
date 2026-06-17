import Button, { LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Select from "~/components/Select";
import { bundeslaender } from "~/resources/content/shared/bundeslaender";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import { usePreCheckData, useSyncedForm } from "./vorpruefung/preCheckDataHook";
import {
  landFormSchema,
  type LandFormSchema,
} from "./vorpruefung/preCheckDataSchema";
import { setBundesland } from "./vorpruefung/preCheckDataService";

export function VorpruefungBundesland({
  prevPath,
  nextPath,
}: Readonly<{ prevPath: string; nextPath: string }>) {
  const { bundesland } = usePreCheckData();

  const form = useSyncedForm({
    schema: landFormSchema,
    defaultValues: { bundesland: "Bund" },
    storedData: bundesland ? { bundesland } : undefined,
    handleSubmit: (data: LandFormSchema) => {
      setBundesland(data.bundesland);
      globalThis.location.href = nextPath;
    },
  });

  return (
    <form {...form.getFormProps()} className="space-y-40">
      <h1 className="ds-heading-02-reg">
        Wählen Sie Ihren zuständigen Bereich aus
      </h1>
      <Select
        scope={form.scope("bundesland")}
        options={bundeslaender.map((b) => b.name)}
        warningInsteadOfError
      >
        Wählen Sie Ihr Bundesland oder den Bund aus
      </Select>
      <ButtonContainer>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          id="land-next-button"
        >
          {preCheck.nextButton}
        </Button>
        <LinkButton href={prevPath} look="tertiary" id="land-back-button">
          {general.buttonBack.text}
        </LinkButton>
      </ButtonContainer>
    </form>
  );
}
