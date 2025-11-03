import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@digitalservicebund/icons";
import { FormScope, useField, useFieldArray, useForm } from "@rvf/react";
import { useCallback, useEffect } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import Badge from "~/components/Badge";
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
import {
  IrrelevantAnswerReasoning,
  NegativeAnswerReasoning,
  principleSchema,
  type PrincipleReasoning,
} from "~/routes/dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "~/routes/dokumentation/documentationDataService";
import type {
  PrinzipAspekt,
  PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/dokumentation._documentationNavigation.$principleId";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";

const { principlePages } = digitalDocumentation;

export function loader({ params: { principleId } }: Route.LoaderArgs) {
  return {
    principleId,
  };
}

type ReasoningProps = {
  label: string;
  description?: string;
  detailDescription?: string;
  aspectScope: FormScope<PrincipleReasoning["aspect"]>;
  checkboxScope: FormScope<PrincipleReasoning["checkbox"]>;
  paragraphScope: FormScope<PrincipleReasoning["paragraphs"]>;
  reasonScope: FormScope<PrincipleReasoning["reason"]>;
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
      renderDescription={({ open }) => (
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
      warningInsteadOfError
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
            warningInsteadOfError
          >
            {principlePages.explanationFields.paragraphInput.label}
          </InputNew>

          <TextareaNew
            scope={reasonScope}
            placeholder={
              principlePages.explanationFields.reasoningInput.placeholder
            }
            rows={5}
            warningInsteadOfError
          >
            {principlePages.explanationFields.reasoningInput.label}
          </TextareaNew>

          <Dialog
            title={principlePages.dialog.title}
            renderToggleButton={({ toggleDialog }) => (
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
            renderActionButtons={({ closeDialog }) => (
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
  scope: FormScope<PrincipleReasoning[]>;
  prinzip: PrinzipWithAspekte;
};

function PositiveAnswerFormElements({
  scope,
  prinzip,
}: Readonly<PositiveAnswerFormElementProps>) {
  const reasoningField = useFieldArray(scope, {
    validationBehavior: {
      initial: "onSubmit",
      whenSubmitted: "onSubmit",
    },
  });

  const remove = useCallback(
    async (index: number, aspekt?: PrinzipAspekt) => {
      if (aspekt)
        await reasoningField.replace(index, {
          aspect: slugify(aspekt.Kurzbezeichnung),
        });
      else await reasoningField.remove(index);
    },
    [reasoningField],
  );

  return (
    <fieldset className="space-y-40">
      <legend className="space-y-8">
        <Heading tagName="h2">{principlePages.positivePrinciple.title}</Heading>
        <RichText
          markdown={principlePages.positivePrinciple.description}
          className="space-y-24"
        />
      </legend>

      {reasoningField.error() && (
        <InlineNotice
          role="alert"
          look="warning"
          heading={reasoningField.error()}
        />
      )}

      <div
        className="space-y-40"
        aria-live="polite"
        aria-relevant="additions removals"
      >
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
      </div>

      <Button
        type="button"
        look="ghost"
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
    </fieldset>
  );
}

type NegativeAnswerFormElementProps = {
  scope: FormScope<NegativeAnswerReasoning>;
};

function NegativeAnswerFormElements({
  scope,
}: Readonly<NegativeAnswerFormElementProps>) {
  return (
    <fieldset className="space-y-40">
      <legend className="space-y-8">
        <Heading tagName="h2">{principlePages.negativePrinciple.title}</Heading>
        <RichText
          markdown={principlePages.negativePrinciple.description}
          className="space-y-24"
        />
      </legend>

      <TextareaNew
        scope={scope}
        placeholder={principlePages.negativePrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.negativePrinciple.label}
      </TextareaNew>
    </fieldset>
  );
}

type IrrelevantAnswerFormElementProps = {
  scope: FormScope<IrrelevantAnswerReasoning>;
};

function IrrelevantAnswerFormElements({
  scope,
}: Readonly<IrrelevantAnswerFormElementProps>) {
  return (
    <fieldset className="space-y-40">
      <legend className="space-y-8">
        <Heading tagName="h2">
          {principlePages.irrelevantPrinciple.title}
        </Heading>
        <RichText
          markdown={principlePages.irrelevantPrinciple.description}
          className="space-y-24"
        />
      </legend>

      <TextareaNew
        scope={scope}
        placeholder={principlePages.irrelevantPrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.irrelevantPrinciple.label}
      </TextareaNew>
    </fieldset>
  );
}

export default function DocumentationPrinciple() {
  const { principleId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  const form = useForm({
    schema: principleSchema,
    defaultValues: {
      id: prinzip.documentId,
      answer: "",
    },
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async () => {
      if (nextUrl) await navigate(nextUrl);
    },
    onBeforeSubmit: async () => {
      // bypass submission
      if (nextUrl) await navigate(nextUrl);
    },
  });

  const principleData = documentationData?.principles?.find(
    (principle) => principle.id === prinzip.documentId,
  );

  // Handle answer change
  useEffect(() => {
    const unsubscribe = form.subscribe.value("answer", (answer) => {
      const reasoning = principleData?.reasoning;

      if (answer !== principlePages.radioOptions[0]) {
        if (reasoning && typeof reasoning === "string") {
          form.setValue("reasoning", reasoning);
        } else {
          form.setValue("reasoning", "");
        }
        return;
      }

      if (!Array.isArray(reasoning)) {
        form.setValue(
          "reasoning",
          prinzip.Aspekte.map(({ Kurzbezeichnung }) => ({
            aspect: slugify(Kurzbezeichnung),
          })),
        );

        return;
      }

      form.setValue("reasoning", reasoning);
    });

    return () => unsubscribe();
  }, [
    form,
    prinzip.Aspekte,
    currentUrl,
    prinzip.documentId,
    documentationData,
    principleData,
  ]);

  useEffect(() => {
    const unsubscribe = form.subscribe.value(addOrUpdatePrinciple);

    if (principleData && !form.dirty("answer")) {
      form.resetForm(principleData);
      form.setDirty("answer", true);
      form.validate().catch(() => {});
    }

    return () => unsubscribe();
  }, [currentUrl, form, prinzip.documentId, documentationData, principleData]);

  // somehow the error for the reasoning field is not removed on change
  // thats why we do it here manually
  useEffect(() => {
    const unsubscribe = form.subscribe.value("reasoning", () =>
      form.clearError("reasoning"),
    );

    return () => unsubscribe();
  }, [form]);

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
          <input {...form.getHiddenInputProps("id")} />
          <RadioGroupNew
            label={
              <Heading tagName="h2" look="ds-heading-03-reg">
                {principlePages.question}
              </Heading>
            }
            scope={form.scope("answer")}
            options={principlePages.radioOptions.map((option) => ({
              value: option,
              label: option,
            }))}
            warningInsteadOfError
          />

          {form.field("answer").value() === principlePages.radioOptions[0] && (
            <PositiveAnswerFormElements
              scope={form.scope("reasoning") as FormScope<PrincipleReasoning[]>}
              prinzip={prinzip}
            />
          )}

          {form.field("answer").value() === principlePages.radioOptions[1] && (
            <NegativeAnswerFormElements
              scope={
                form.scope("reasoning") as FormScope<NegativeAnswerReasoning>
              }
            />
          )}

          {form.field("answer").value() === principlePages.radioOptions[2] && (
            <IrrelevantAnswerFormElements
              scope={
                form.scope("reasoning") as FormScope<IrrelevantAnswerReasoning>
              }
            />
          )}

          <InlineNotice look="tips" heading={principlePages.storageHint.title}>
            {principlePages.storageHint.content}
          </InlineNotice>

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton={true}
          />
        </form>
      </div>
    </>
  );
}
