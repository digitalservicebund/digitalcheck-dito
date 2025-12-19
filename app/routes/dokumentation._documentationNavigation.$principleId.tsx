import { AddCircleOutlineOutlined } from "@digitalservicebund/icons";
import { FormScope, useField, useFieldArray } from "@rvf/react";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { PrincipleExplanation } from "~/components/Absatz.tsx";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Button from "~/components/Button";
import CheckboxWithExpandableArea from "~/components/CheckboxWithExpandableArea";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Dialog from "~/components/Dialog";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier.tsx";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import Separator from "~/components/Separator";
import Textarea from "~/components/Textarea";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider.tsx";
import { examples } from "~/resources/content/beispiele.ts";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_METHODS_PRINCIPLES,
} from "~/resources/staticRoutes";
import {
  IrrelevantAnswerReasoning,
  NegativeAnswerReasoning,
  principleSchema,
  type PrincipleReasoning,
} from "~/routes/dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "~/routes/dokumentation/documentationDataService";
import {
  PrinzipAspekt,
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";

const { principlePages } = digitalDocumentation;

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
  onUncheck: () => void;
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
  onUncheck,
}: Readonly<ReasoningProps>) {
  const aspectField = useField(aspectScope);
  const checkboxField = useField(checkboxScope);

  const [deleteDialog, setDeleteDialog] = useState<
    { onConfirm: () => void } | undefined
  >(undefined);

  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.target.checked;

    if (checked) {
      checkboxField.setValue("on");
    } else {
      // ask for confirmation before removing
      setDeleteDialog({
        onConfirm: () => {
          checkboxField.setValue(undefined);
          onUncheck();
        },
      });
    }
  };

  return (
    <>
      <CheckboxWithExpandableArea
        scope={checkboxScope}
        label={label}
        testId={`Aspekt ${label}`}
        renderDescription={({ open }) => {
          let descriptionLabel = open ? detailDescription : description;
          if (descriptionLabel && !descriptionLabel.endsWith(".")) {
            descriptionLabel += ".";
          }
          return (
            <span className="space-x-8">
              <span>{descriptionLabel}</span>
              {moreUrl && (
                <Link
                  to={moreUrl}
                  target="_blank"
                  className="text-link"
                  rel="noreferrer"
                >
                  {principlePages.moreInfoButton}
                </Link>
              )}
            </span>
          );
        }}
        closeable={false}
        defaultValue={defaultValue}
        error={error}
        warningInsteadOfError
        checked={!!checkboxField.value()}
        onChange={onCheckboxChange}
      >
        <Heading tagName="h3">{principlePages.explanationFields.title}</Heading>

        <input {...aspectField.getHiddenInputProps()} />

        <Input
          scope={paragraphScope}
          description={
            principlePages.explanationFields.paragraphInput.description
          }
          warningInsteadOfError
        >
          {principlePages.explanationFields.paragraphInput.label}
        </Input>

        <Textarea
          scope={reasonScope}
          placeholder={
            principlePages.explanationFields.reasoningInput.placeholder
          }
          rows={5}
          warningInsteadOfError
        >
          {principlePages.explanationFields.reasoningInput.label}
        </Textarea>
      </CheckboxWithExpandableArea>
      <Dialog
        open={deleteDialog !== undefined}
        onToggle={() => setDeleteDialog(undefined)}
        title={principlePages.dialog.title}
        renderActionButtons={({ closeDialog }) => (
          <div className="flex flex-row gap-12">
            <Button
              type="button"
              onClick={() => {
                deleteDialog?.onConfirm();
                closeDialog();
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
    <div className="space-y-40">
      <div className="space-y-8">
        <Heading tagName="h2" className="ds-heading-03-reg">
          {principlePages.positivePrinciple.title}
        </Heading>
        <RichText
          markdown={principlePages.positivePrinciple.description}
          className="space-y-24"
        />
      </div>

      {reasoningField.error() && (
        <InlineNotice
          role="alert"
          look="missingOrIncomplete"
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
              onUncheck={() => remove(i, aspekt)}
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
    </div>
  );
}

type NegativeAnswerFormElementProps = {
  scope: FormScope<NegativeAnswerReasoning>;
};

function NegativeAnswerFormElements({
  scope,
}: Readonly<NegativeAnswerFormElementProps>) {
  return (
    <div className="space-y-40">
      <div className="space-y-8">
        <Heading tagName="h2" className="ds-heading-03-reg">
          {principlePages.negativePrinciple.title}
        </Heading>
        <RichText
          markdown={principlePages.negativePrinciple.description}
          className="space-y-24"
        />
      </div>

      <Textarea
        scope={scope}
        placeholder={principlePages.negativePrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.negativePrinciple.label}
      </Textarea>
    </div>
  );
}

type IrrelevantAnswerFormElementProps = {
  scope: FormScope<IrrelevantAnswerReasoning>;
};

function IrrelevantAnswerFormElements({
  scope,
}: Readonly<IrrelevantAnswerFormElementProps>) {
  return (
    <div className="space-y-40">
      <div className="space-y-8">
        <Heading tagName="h2" className="ds-heading-03-reg">
          {principlePages.irrelevantPrinciple.title}
        </Heading>
        <RichText
          markdown={principlePages.irrelevantPrinciple.description}
          className="space-y-24"
        />
      </div>

      <Textarea
        scope={scope}
        placeholder={principlePages.irrelevantPrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.irrelevantPrinciple.label}
      </Textarea>
    </div>
  );
}

function PrincipleWithExample({
  prinzip,
}: Readonly<{
  prinzip: PrinzipWithAspekteAndExample;
}>) {
  const erfuellungenToShow = prinzip.Beispiel.PrinzipErfuellungen?.filter(
    (erfuellung) => erfuellung.Prinzip?.Nummer === prinzip.Nummer,
  );

  return (
    <div className="space-y-8">
      <Badge principleNumber={prinzip.Nummer}>{principlePages.badge}</Badge>
      <Heading
        text={prinzip.Name}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />

      <BlocksRenderer content={prinzip.Beschreibung} />
      {prinzip.Beispiel && (
        <DetailsSummary title="Beispiel zum Prinzip">
          <div className="space-y-24 pt-16">
            <PrincipleHighlightProvider
              absatzId={prinzip.Beispiel.documentId}
              principlesToShow={[prinzip]}
              useAnchorLinks={false}
            >
              <div>
                <h4 className="ds-label-02-bold">
                  § {prinzip.Beispiel.Paragraph.Nummer}{" "}
                  {prinzip.Beispiel.Paragraph.Gesetz}
                </h4>
                <BlocksRenderer
                  content={prinzip.Beispiel.Text}
                  modifiers={{
                    underline: PrincipleHighlightModifier,
                  }}
                />
              </div>
              {examples.paragraphs.explanation}
              {erfuellungenToShow?.map((erfuellung) => (
                <PrincipleExplanation
                  key={erfuellung.id}
                  erfuellung={erfuellung}
                />
              ))}
            </PrincipleHighlightProvider>
            <Link
              className="text-link block font-bold"
              to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}`}
            >
              Mehr Beispiele zu dem Prinzip
            </Link>
          </div>
        </DetailsSummary>
      )}
    </div>
  );
}

export default function DocumentationPrinciple() {
  const { principleId } = useParams();
  const { currentUrl, nextUrl, previousUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const { documentationData } = useDocumentationData();

  const prinzip = prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  const principleData = documentationData?.principles?.find(
    (principle) => principle.id === prinzip.documentId,
  );

  const form = useSyncedForm({
    schema: principleSchema,
    defaultValues: {
      id: prinzip.documentId,
      answer: "",
    },
    currentUrl,
    setDataCallback: addOrUpdatePrinciple,
    storedData: principleData,
    nextUrl,
  });

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
      <MetaTitle prefix={`Dokumentation: ${prinzip.Name}`} />
      <div className="space-y-40">
        <PrincipleWithExample prinzip={prinzip} />

        <Separator />

        <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("id")} />
          <Heading
            id="question-label"
            tagName="h2"
            look="ds-heading-03-reg"
            className="mb-16"
          >
            {principlePages.question}
          </Heading>
          <RadioGroup
            aria-labelledby="question-label"
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

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
          />
        </form>
      </div>
    </>
  );
}
