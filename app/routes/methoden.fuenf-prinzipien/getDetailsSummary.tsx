import { Link } from "react-router";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import type { HeadingProps } from "~/components/Heading";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_EXAMPLES_PRINCIPLES } from "~/resources/staticRoutes";
import { absatzIdTag } from "~/utils/paragraphUtils";
import { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";

export default function getDetailsSummary(prinzip: PrinzipWithAspekte) {
  const { Aspekte } = prinzip;

  const items = Aspekte.map((aspekt) => {
    const identifier = slugify(aspekt.Titel);
    const content = (
      <div className="space-y-4">
        <BlocksRenderer content={aspekt.Text} />
        {aspekt.Leitfragen && (
          <>
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.questionsTitle}
            </h4>
            <BlocksRenderer content={aspekt.Leitfragen} />
          </>
        )}
        {aspekt.Formulierungsbeispiel && (
          <>
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.wordingExampleTitle}
            </h4>
            <BlocksRenderer content={aspekt.Formulierungsbeispiel} />
          </>
        )}
        {aspekt.Beispiel && (
          <PrincipleHighlightProvider
            absatzId={aspekt.Beispiel.documentId}
            principlesToShow={[prinzip]}
            useAnchorLinks={false}
          >
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.exampleTitle} §{" "}
              {aspekt.Beispiel.Paragraph.Nummer}{" "}
              {aspekt.Beispiel.Paragraph.Gesetz}:
            </h4>
            <BlocksRenderer
              content={aspekt.Beispiel.Text}
              modifiers={{
                underline: PrincipleHighlightModifier,
              }}
            />
            <Link
              className="text-link"
              to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}#${absatzIdTag(aspekt.Beispiel.documentId)}`}
            >
              {methodsFivePrinciples.exampleLinkText}
            </Link>
          </PrincipleHighlightProvider>
        )}
      </div>
    );

    return { title: aspekt.Titel, content, identifier };
  });

  if (items.length === 0) return undefined;

  return {
    title: {
      text: methodsFivePrinciples.detailsSummaryTitle,
      tagName: "h3",
    } as HeadingProps,
    items,
  };
}
