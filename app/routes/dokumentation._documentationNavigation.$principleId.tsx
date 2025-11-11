import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@digitalservicebund/icons";
import { FormScope, useField, useFieldArray } from "@rvf/react";
import { useCallback, useEffect } from "react";
import { Link, useLoaderData, useOutletContext } from "react-router";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Button from "~/components/Button";
import CheckboxWithExpandableArea from "~/components/CheckboxWithExpandableArea";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Dialog from "~/components/Dialog";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InlineNotice from "~/components/InlineNotice";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup";
import RichText from "~/components/RichText";
import Separator from "~/components/Separator";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { features } from "~/resources/features.ts";
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
import getDetailsSummary from "~/routes/methoden.fuenf-prinzipien/getDetailsSummary.tsx";
import { PrincipleExample } from "~/routes/methoden.fuenf-prinzipien/Principle.tsx";
import { getFeatureFlags } from "~/utils/featureFlags.server.ts";
import useFeatureFlag from "~/utils/featureFlags.ts";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipAspekt,
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import type { Route } from "./+types/dokumentation._documentationNavigation.$principleId";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";

const { principlePages } = digitalDocumentation;

export async function loader({ params: { principleId } }: Route.LoaderArgs) {
  const featureFlags = getFeatureFlags();
  if (featureFlags[features.enableDigitalDocumentationAltExplanation]) {
    console.info("fetching full principles for user test");
    const prinzipData = await fetchStrapiData<{
      prinzips: PrinzipWithAspekteAndExample[];
    }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);
    if ("prinzips" in prinzipData) {
      return {
        principleId,
        fullPrinciples: prinzipData.prinzips,
      };
    }
  }

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
    >
      {({ closeArea }) => (
        <>
          <Heading tagName="h3">
            {principlePages.explanationFields.title}
          </Heading>

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

      <Textarea
        scope={scope}
        placeholder={principlePages.negativePrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.negativePrinciple.label}
      </Textarea>
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

      <Textarea
        scope={scope}
        placeholder={principlePages.irrelevantPrinciple.placeholder}
        rows={5}
        warningInsteadOfError
      >
        {principlePages.irrelevantPrinciple.label}
      </Textarea>
    </fieldset>
  );
}

export default function DocumentationPrinciple() {
  const { principleId, fullPrinciples } = useLoaderData<typeof loader>();
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

  const enableAlternativeExplanation = useFeatureFlag(
    features.enableDigitalDocumentationAltExplanation,
  );

  const testVariant = (() => {
    if (
      enableAlternativeExplanation &&
      prinzip?.URLBezeichnung ===
        "digitale-angebote-fuer-alle-nutzbar-gestalten"
    )
      return "descriptionOnBottom";
    if (
      enableAlternativeExplanation &&
      prinzip?.URLBezeichnung ===
        "datenwiederverwendung-benoetigt-einheitliches-recht"
    )
      return "descriptionWithAccordion";
    return null;
  })();

  const fullPrinciple = fullPrinciples?.find(
    (p) => p.URLBezeichnung === prinzip.URLBezeichnung,
  );

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
          {!testVariant && (
            <>
              <BlocksRenderer content={prinzip.Beschreibung} />
              <Link
                to={`${ROUTE_METHODS_PRINCIPLES.url}#${slugify(prinzip.Name)}`}
                target="_blank"
                className="text-link"
                rel="noreferrer"
              >
                {principlePages.moreButton}
              </Link>
            </>
          )}
          {testVariant === "descriptionWithAccordion" && (
            <>
              <BlocksRenderer content={prinzip.Beschreibung} />
              {prinzip && (
                <DetailsSummary title="Beispiele">
                  <div className="space-y-24">
                    <div>
                      <h3 className={"ds-label-01-bold font-bold"}>
                        § 8 GWKHV
                      </h3>
                      <p className={"ds-label-01-reg italic"}>
                        „(2) Registerteilnehmer sind verpflichtet, für die
                        Kommunikation mit dem Umweltbundesamt einen Zugang zu
                        diesem Kommunikationssystem zu eröffnen und den Zugang
                        zu nutzen, insbesondere für die Stellung von Anträgen,
                        die Abgabe von Erklärungen sowie die Übermittlung von
                        Daten und Dokumenten.“
                      </p>
                    </div>
                    <div>
                      <h4 className="ds-label-01-bold mt-24">
                        Warum ist dieses Beispiel gut?
                      </h4>
                      <ul className="mt-8">
                        <li>
                          Verringert die Fehleranfälligkeit durch den
                          Datenabgleich.
                        </li>
                        <li>
                          Im folgenden Absatz wird der Abgleich und Austausch
                          der Daten näher spezifiziert und erweitert.
                        </li>
                      </ul>
                    </div>
                    <Link
                      className="text-link"
                      to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}`}
                    >
                      Mehr Beispiele zu dem Prinzip
                    </Link>
                  </div>
                </DetailsSummary>
              )}
            </>
          )}
        </div>

        <Separator />

        <form {...form.getFormProps()} className="space-y-40">
          <input {...form.getHiddenInputProps("id")} />
          <RadioGroup
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

          {testVariant === "descriptionOnBottom" && fullPrinciple && (
            <>
              <Separator />
              <div className="space-y-40" key={slugify(fullPrinciple.Name)}>
                <InfoBox
                  identifier={slugify(fullPrinciple.Name)}
                  heading={{
                    tagName: "h2",
                    text: "Das Prinzip im Detail",
                  }}
                  content={fullPrinciple.Beschreibung}
                  detailsSummary={getDetailsSummary(fullPrinciple)}
                />

                {fullPrinciple.Beispiel && (
                  <PrincipleExample prinzip={fullPrinciple} />
                )}
              </div>
              <div className="space-y-8">
                <h2 className="ds-heading-02-reg">
                  Suchen Sie mehr Beispiele?
                </h2>
                <p>
                  Mehr Beispiele finden Sie auf der{" "}
                  <Link
                    className="text-link"
                    to={`/beispiele/prinzipien/${prinzip.URLBezeichnung}`}
                  >
                    Beispielseite zu diesem Prinzip
                  </Link>
                  .
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
