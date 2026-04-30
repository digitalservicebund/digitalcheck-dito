import { AddCircleOutlineOutlined } from "@digitalservicebund/icons";
import { useFieldArray, useForm } from "@rvf/react";
import { z } from "zod";
import Button from "~/components/Button";
import Textarea from "~/components/Textarea";

const bindingRequirementsFormSchema = z.object({
  requirements: z.array(
    z.object({
      description: z.string().optional(),
      legalReference: z.string().optional(),
    }),
  ),
});

export default function BindingRequirementsForm() {
  const form = useForm({
    schema: bindingRequirementsFormSchema,
    defaultValues: {
      requirements: [{}],
    },
    handleSubmit: async () => {},
  });
  const requirements = useFieldArray(form.scope("requirements"));

  return (
    <form className="space-y-24" {...form.getFormProps()}>
      <div className="space-y-64" aria-live="polite" aria-relevant="additions">
        {requirements.map((key, requirement, index) => (
          <div className={"space-y-16"} key={key}>
            {index > 0 && <h2 className={""}>Anforderung {index + 1}</h2>}
            <Textarea
              scope={requirement.scope("description")}
              placeholder="Beschreiben Sie die verbindliche Anforderung"
              rows={2}
              warningInsteadOfError
              description={
                "Beispiel: Die Marktdatenanbieter müssen der zuständigen Behörde auf Anfrage strukturierte Angaben zu den Gesamtproduktionskosten unter Verwendung des in Anhang II enthaltenen Formulars übermitteln."
              }
            >
              {"Beschreibung"}
            </Textarea>
            <Textarea
              scope={requirement.scope("legalReference")}
              placeholder="§§ 1 – 5"
              rows={1}
              warningInsteadOfError
              description={
                "Geben Sie an, aus welchem Teil des Vorhabens sich die Anforderung ergibt."
              }
            >
              {"Paragraph oder sonstige Referenz"}
            </Textarea>
          </div>
        ))}
      </div>

      <Button
        type="button"
        look="ghost"
        iconLeft={<AddCircleOutlineOutlined />}
        onClick={async () => {
          await requirements.push({ description: "" });
        }}
      >
        Weitere <i>verbindliche Anforderung</i> hinzufügen
      </Button>
    </form>
  );
}
