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
              description={`Example: The market data providers shall provide the competent authority, upon request, with structured information on the total costs of production using the form set out in Annex II.`}
            >
              {`Beschreibung`}
            </Textarea>
            <Textarea
              scope={requirement.scope("legalReference")}
              placeholder="§§ 1 – 5"
              rows={1}
              warningInsteadOfError
              description={`Specify the article or section. Type a URL such as https://example.com. Use ELI format, if possible - otherwise provide a URL pointing to the binding requirement assessed.`}
            >
              {`Paragraph oder Artikel`}
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
        Weitere Anforderung hinzufügen
      </Button>
    </form>
  );
}
