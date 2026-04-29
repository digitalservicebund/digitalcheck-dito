import { AddCircleOutlineOutlined } from "@digitalservicebund/icons";
import { useFieldArray, useForm } from "@rvf/react";
import { z } from "zod";
import Button from "~/components/Button";
import Textarea from "~/components/Textarea";

const bindingRequirementsFormSchema = z.object({
  requirements: z.array(
    z.object({
      description: z.string().optional(),
    }),
  ),
});

export default function BindingRequirementsForm() {
  const form = useForm({
    schema: bindingRequirementsFormSchema,
    defaultValues: {
      requirements: [],
    },
    handleSubmit: async () => {},
  });
  const requirements = useFieldArray(form.scope("requirements"));

  return (
    <form className="space-y-24" {...form.getFormProps()}>
      <div className="space-y-16" aria-live="polite" aria-relevant="additions">
        {requirements.map((key, requirement, index) => (
          <Textarea
            key={key}
            scope={requirement.scope("description")}
            placeholder="Beschreiben Sie die verbindliche Anforderung"
            rows={4}
            warningInsteadOfError
          >
            {`Verbindliche Anforderung ${index + 1}`}
          </Textarea>
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
        Weitere Anforderung hinzufuegen
      </Button>
    </form>
  );
}
