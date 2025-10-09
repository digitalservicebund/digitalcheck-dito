import {
  AddCircleOutlineOutlined,
  FileDownloadOutlined,
  RemoveCircleOutlineOutlined,
} from "@digitalservicebund/icons";
import { FormScope, useField, useFieldArray, useForm } from "@rvf/react-router";
import { useCallback, useEffect } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Badge, { BadgeProps } from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Button from "~/components/Button";
import CheckboxWithExpandableArea from "~/components/CheckboxWithExpandableArea";
import Dialog from "~/components/Dialog";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import RadioGroupNew from "~/components/RadioGroupNew";
import RichText from "~/components/RichText";
import Separator from "~/components/Separator";
import TextareaNew from "~/components/TextareaNew";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { Node } from "~/utils/paragraphUtils";
import { fetchStrapiData } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/dokumentation._documentationNavigation.$principleId";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { getDocumentationStep } from "./dokumentation/documentationDataService";
import { useDataSync } from "./dokumentation/documentationDataServiceHook";

const { principlePages } = digitalDocumentation;

const reasoningSchema = z
  .object({
    aspect: z.string().optional(),
    checkbox: z.literal("on").optional(),
    paragraphs: z.string().optional(),
    reason: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.checkbox !== "on") return;

    if (!val.paragraphs) {
      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.paragraphsError,
        input: val,
        path: ["paragraphs"],
      });
    }

    if (!val.reason) {
      ctx.addIssue({
        code: "custom",
        message: principlePages.errors.reasonError,
        input: val,
        path: ["reason"],
      });
    }
  });

type Reasoning = z.output<typeof reasoningSchema>;

const positiveAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[0]),
  reasoning: z.array(reasoningSchema.optional(), {
    error: principlePages.errors.reasoningError,
  }),
});

const negativeAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[1]),
  reasoning: z.literal(undefined),
});

const irrelevantAnswerSchema = z.object({
  answer: z.literal(principlePages.radioOptions[2]),
  reasoning: z.literal(undefined),
});

const schema = z
  .discriminatedUnion(
    "answer",
    [positiveAnswerSchema, negativeAnswerSchema, irrelevantAnswerSchema],
    { error: principlePages.errors.answerError },
  )
  .and(
    z.object({
      prinzipId: z.string(),
    }),
  );

type Aspekt = {
  Titel: string;
  Kurzbezeichnung: string;
  Beschreibung: string;
};

type Prinzip = {
  Name: string;
  URLBezeichnung: string;
  documentId: string;
  Beschreibung: Node[];
  Nummer: BadgeProps["principleNumber"];
  Aspekte: Aspekt[];
};

const GET_PRINZIP_QUERY = `
query GetPrinzips($slug: String!) {
  prinzips(filters: { URLBezeichnung: { eq: $slug } }) {
    Name
    URLBezeichnung
    documentId
    Nummer
    Beschreibung
    Aspekte {
      Titel
      Kurzbezeichnung
      Beschreibung
    }
  }
}`;

export async function loader({ params }: Route.LoaderArgs) {
  const prinzipData = await fetchStrapiData<{
    prinzips: Prinzip[];
  }>(GET_PRINZIP_QUERY, { slug: params.principleId });

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  if (prinzipData.prinzips.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });
  }

  return {
    prinzip: prinzipData.prinzips[0],
  };
}

type ReasoningProps = {
  label: string;
  description?: string;
  detailDescription?: string;
  aspectScope: FormScope<Reasoning["aspect"]>;
  checkboxScope: FormScope<Reasoning["checkbox"]>;
  paragraphScope: FormScope<Reasoning["paragraphs"]>;
  reasonScope: FormScope<Reasoning["reason"]>;
  defaultValue?: "on";
  moreUrl?: string;
  removeOwnReasoning?: () => void;
  error?: string | null;
};

function Reasoning({
  label,
  aspectScope,
  checkboxScope,
  description,
  detailDescription,
  defaultValue,
  moreUrl,
  error,
  paragraphScope,
  reasonScope,
  removeOwnReasoning,
}: Readonly<ReasoningProps>) {
  const aspectField = useField(aspectScope);
  return (
    <CheckboxWithExpandableArea
      scope={checkboxScope}
      label={label}
      description={({ open }) => (
        <span className="space-x-8">
          <span>{open ? detailDescription : description}</span>
          {moreUrl && (
            <Button href={moreUrl} look="link" target="_blank">
              {principlePages.moreInfoButton}
            </Button>
          )}
        </span>
      )}
      closeable={false}
      defaultValue={defaultValue}
      error={error}
    >
      {({ closeArea }) => (
        <>
          <Heading tagName="h3">
            {principlePages.explanationFields.title}
          </Heading>

          <input {...aspectField.getHiddenInputProps()} />

          <InputNew
            scope={paragraphScope}
            description={
              principlePages.explanationFields.paragraphInput.description
            }
          >
            {principlePages.explanationFields.paragraphInput.label}
          </InputNew>

          <TextareaNew
            scope={reasonScope}
            placeholder={
              principlePages.explanationFields.reasoningInput.placeholder
            }
            rows={5}
          >
            {principlePages.explanationFields.reasoningInput.label}
          </TextareaNew>

          <Dialog
            title={principlePages.dialog.title}
            openCloseButton={({ toggleDialog }) => (
              <Button
                type="button"
                look="link"
                iconLeft={<RemoveCircleOutlineOutlined />}
                className="text-ds-error fill-ds-error"
                onClick={() => toggleDialog()}
              >
                {principlePages.explanationFields.deleteButton}
              </Button>
            )}
            dialogButtons={({ closeDialog }) => (
              <div className="flex flex-row gap-12">
                <Button
                  type="button"
                  onClick={() => {
                    closeArea();
                    closeDialog();

                    if (removeOwnReasoning) removeOwnReasoning();
                  }}
                >
                  {principlePages.dialog.deleteButton}
                </Button>

                <Button
                  type="button"
                  look="tertiary"
                  onClick={() => {
                    closeDialog();
                  }}
                >
                  {principlePages.dialog.cancelButton}
                </Button>
              </div>
            )}
          >
            <RichText markdown={principlePages.dialog.description} />
          </Dialog>
        </>
      )}
    </CheckboxWithExpandableArea>
  );
}

type PositiveAnswerFormElementProps = {
  scope: FormScope<Reasoning[]>;
  prinzip: Prinzip;
};

function PositiveAnswerFormElements({
  scope,
  prinzip,
}: Readonly<PositiveAnswerFormElementProps>) {
  const reasoningField = useFieldArray(scope, {
    validationBehavior: {
      initial: "onSubmit",
      whenSubmitted: "onChange",
    },
  });

  const remove = useCallback(
    async (index: number, aspekt?: Aspekt) => {
      if (aspekt)
        await reasoningField.replace(index, { aspect: slugify(aspekt.Titel) });
      else await reasoningField.remove(index);
    },
    [reasoningField],
  );

  return (
    <>
      <div className="space-y-8">
        <Heading tagName="h2">{principlePages.positivePrinciple.title}</Heading>
        <RichText
          markdown={principlePages.positivePrinciple.description}
          className="space-y-24"
        />
      </div>

      {reasoningField.error() && (
        <InlineNotice look="warning" heading={reasoningField.error()} />
      )}

      {reasoningField.map((key, item, i) => {
        const aspekt = prinzip.Aspekte[i];

        const label = aspekt?.Titel
          ? aspekt.Kurzbezeichnung
          : principlePages.explanationFields.ownExplanationTitle;

        const description = aspekt
          ? aspekt.Titel
          : principlePages.explanationFields.ownExplanationDescription;

        const detailDescription = aspekt
          ? aspekt.Beschreibung
          : principlePages.explanationFields.ownExplanationDescription;

        const moreUrl = aspekt
          ? `${ROUTE_METHODS_PRINCIPLES.url}#${slugify(aspekt.Titel)}`
          : undefined;

        return (
          <Reasoning
            key={key}
            label={label}
            description={description}
            detailDescription={detailDescription}
            aspectScope={item.scope("aspect")}
            checkboxScope={item.scope("checkbox")}
            paragraphScope={item.scope("paragraphs")}
            reasonScope={item.scope("reason")}
            removeOwnReasoning={() => remove(i, aspekt)}
            moreUrl={moreUrl}
            defaultValue={aspekt ? undefined : "on"}
            error={
              reasoningField.error() ? principlePages.errors.errorHint : null
            }
          />
        );
      })}

      <div className="flex flex-col gap-32 xl:flex-row xl:gap-40">
        <Button
          type="button"
          look="link"
          iconLeft={<AddCircleOutlineOutlined />}
          onClick={async () => {
            await reasoningField.push({
              aspect: undefined,
              checkbox: "on",
              paragraphs: "",
              reason: "",
            });
          }}
        >
          {principlePages.positivePrinciple.actions.addOwnExplanation.title}
        </Button>
        <Button type="button" look="link" iconLeft={<FileDownloadOutlined />}>
          {principlePages.positivePrinciple.actions.saveState.title}
        </Button>
      </div>
    </>
  );
}

export default function DocumentationPrinciple() {
  const { prinzip } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { currentUrl, nextRoute, previousRoute } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema,
    defaultValues: {
      answer: "",
      prinzipId: currentUrl,
      reasoning: undefined,
    },
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async () => {
      await navigate(nextRoute.url);
    },
  });

  // Handle answer change
  useEffect(() => {
    const unsubscribe = form.subscribe.value("answer", (answer) => {
      if (answer !== principlePages.radioOptions[0]) {
        form.setValue("reasoning", undefined);
        return;
      }

      const documentationStepData = getDocumentationStep(currentUrl);
      const reasoning = documentationStepData?.items?.reasoning;

      if (!Array.isArray(reasoning)) {
        form.setValue(
          "reasoning",
          prinzip.Aspekte.map(({ Titel }) => ({
            aspect: slugify(Titel),
          })),
        );

        return;
      }

      form.setValue("reasoning", reasoning);
    });
    return () => {
      unsubscribe();
    };
  }, [form, prinzip.Aspekte, currentUrl]);

  useDataSync({
    currentUrl,
    form,
    defaultValues: {
      prinzipId: currentUrl,
      answer: "",
      reasoning: undefined,
    },
  });

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <div className="space-y-40">
        <div className="space-y-8">
          <Badge principleNumber={prinzip.Nummer}>{principlePages.badge}</Badge>
          <Heading
            text={prinzip.Name}
            tagName="h1"
            look="ds-heading-02-reg"
            className="mb-16"
          />
          <BlocksRenderer content={prinzip.Beschreibung} />
          <Button
            href={`${ROUTE_METHODS_PRINCIPLES.url}#${slugify(prinzip.Name)}`}
            look="link"
            target="_blank"
          >
            {principlePages.moreButton}
          </Button>
        </div>

        <Separator />

        <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("prinzipId")} />
          <RadioGroupNew
            label={
              <Heading tagName="h2" look="ds-heading-03-reg">
                {/* TODO: in strapi */}
                Schafft das Regelungsvorhaben die rechtlichen Vorraussetzungen
                für eine digitale Umsetzung?
              </Heading>
            }
            scope={form.scope("answer")}
            options={principlePages.radioOptions.map((option) => ({
              value: option,
              label: option,
            }))}
          />

          {form.field("answer").value() === principlePages.radioOptions[0] && (
            <PositiveAnswerFormElements
              scope={form.scope("reasoning") as FormScope<Reasoning[]>}
              prinzip={prinzip}
            />
          )}

          <InlineNotice look="tips" heading={principlePages.storageHint.title}>
            {principlePages.storageHint.content}
          </InlineNotice>

          <DocumentationActions previousRoute={previousRoute.url} submit />
        </form>
      </div>
    </>
  );
}
