import { ArrowForward, CheckCircleRounded } from "@digitalservicebund/icons";
import { useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { PrincipleExplanation } from "~/components/Absatz.tsx";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier.tsx";
import Separator from "~/components/Separator";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider.tsx";
import { examples } from "~/resources/content/beispiele.ts";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_EXAMPLES_PRINCIPLES } from "~/resources/staticRoutes";
import { principleSchema } from "~/routes/dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "~/routes/dokumentation/documentationDataService";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  useDocumentationData,
  useSyncedForm,
} from "./dokumentation/documentationDataHook";

const { principlePages } = digitalDocumentation;

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

  const nextLinkMap = {
    [principlePages.radioOptions[0]]: {
      url: "schwerpunkte",
      description:
        "Erläutern Sie, wie Sie die Schwerpunkte des Prinzips erfüllt haben",
    },
    [principlePages.radioOptions[1]]: {
      url: "nein",
      description: "Erläutern Sie, wieso Sie das Prinzip nicht erfüllen",
    },
    [principlePages.radioOptions[2]]: {
      url: nextUrl,
      description: "Weiter zum nächsten Prinzip",
    },
  };

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <div className="space-y-40">
        <PrincipleWithExample prinzip={prinzip} />

        <Separator />

        <Heading tagName="h2" look="ds-heading-03-reg">
          {principlePages.question}
        </Heading>

        <ul className="list-unstyled max-w-a11y space-y-40">
          {principlePages.radioOptions.map((option) => (
            <li key={option}>
              <Link
                to={nextLinkMap[option].url ?? nextUrl}
                className="grid grid-flow-col grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-16 rounded border border-blue-400 bg-blue-200 p-16"
              >
                <CheckCircleRounded className="fill-ds-green-700 row-span-2 size-36" />
                <span>
                  <strong>{option}</strong>
                </span>
                <span>{nextLinkMap[option].description}</span>
                <ArrowForward className="row-span-2 size-36 fill-blue-800" />
              </Link>
            </li>
          ))}
        </ul>

        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
        />

        {/* <form {...form.getFormProps()} className="space-y-40">
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

          <DocumentationActions
            previousUrl={previousUrl}
            submit
            showDownloadDraftButton
            showSavingTip
          />
        </form> */}
      </div>
    </>
  );
}
