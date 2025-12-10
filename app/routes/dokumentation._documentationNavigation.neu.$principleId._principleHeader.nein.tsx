import { useForm } from "@rvf/react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { NavigationContextWithPrinciple } from "./dokumentation._documentationNavigation.neu.$principleId";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import { Principle } from "./dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "./dokumentation/documentationDataService";

export default function NewDocumentationPrincipleAspects() {
  const navigate = useNavigate();
  const { nextUrl, prinzip, previousUrl } =
    useOutletContext<NavigationContextWithPrinciple>();
  const { documentationData } = useDocumentationData();
  const { principlePages } = digitalDocumentation;

  const basePrincipleData: Principle = {
    id: prinzip.documentId,
    answer: principlePages.radioOptions[1],
    reasoning: "",
  };

  const principleData =
    documentationData?.principles?.find(
      (principle) => principle.id === prinzip.documentId,
    ) ?? basePrincipleData;

  const form = useForm({
    schema: z.object({
      reasoning: z
        .string()
        .min(1, { message: principlePages.errors.reasonError }),
    }),
    defaultValues: {
      reasoning: "",
    },
    async handleSubmit({ reasoning }) {
      addOrUpdatePrinciple({
        ...principleData,
        answer: principlePages.radioOptions[1],
        reasoning,
      });

      await navigate(nextUrl);
    },
  });

  useEffect(() => {
    if (!principleData.reasoning) return;
    if (Array.isArray(principleData.reasoning)) return;
    if (principleData.answer !== principlePages.radioOptions[1]) return;

    form.setValue("reasoning", principleData.reasoning);
  }, [principleData, form, principlePages.radioOptions]);

  const scope = form.scope("reasoning");

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />

      <form {...form.getFormProps()} className="space-y-40">
        <fieldset className="space-y-40">
          <legend className="space-y-8">
            <Heading tagName="h2" className="ds-heading-03-reg">
              {principlePages.negativePrinciple.title}
            </Heading>
            <RichText
              markdown={principlePages.negativePrinciple.description}
              className="space-y-24"
            />
          </legend>

          <Textarea
            scope={scope}
            placeholder={principlePages.negativePrinciple.placeholder}
            rows={5}
            warningInsteadOfError
          >
            {principlePages.negativePrinciple.label}
          </Textarea>
        </fieldset>

        <DocumentationActions
          previousUrl={previousUrl}
          submit
          showDownloadDraftButton
        />
      </form>
    </>
  );
}
