import { Link } from "react-router";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import type { HeadingProps } from "~/components/Heading";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_EXAMPLES_PRINCIPLES } from "~/resources/staticRoutes";
import { absatzIdTag } from "~/utils/paragraphUtils";
import { PrinzipWithAnwendungen } from "~/utils/strapiData.server";

export default function getDetailsSummary(prinzip: PrinzipWithAnwendungen) {
  const { PrinzipAspekt: prinzipAspekte } = prinzip;

  const items = prinzipAspekte.map((prinzipienAnwendung) => {
    const content = (
      <div className="space-y-4">
        <BlocksRenderer content={prinzipienAnwendung.Text} />
        {prinzipienAnwendung.Questions && (
          <>
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.questionsTitle}
            </h4>
            <BlocksRenderer content={prinzipienAnwendung.Questions} />
          </>
        )}
        {prinzipienAnwendung.WordingExample && (
          <>
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.wordingExampleTitle}
            </h4>
            <BlocksRenderer content={prinzipienAnwendung.WordingExample} />
          </>
        )}
        {prinzipienAnwendung.Beispiel && (
          <PrincipleHighlightProvider
            absatzId={prinzipienAnwendung.Beispiel.documentId}
            principlesToShow={[prinzip]}
            useAnchorLinks={false}
          >
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.exampleTitle} §{" "}
              {prinzipienAnwendung.Beispiel.Paragraph.Nummer}{" "}
              {prinzipienAnwendung.Beispiel.Paragraph.Gesetz}:
            </h4>
            <BlocksRenderer
              content={prinzipienAnwendung.Beispiel.Text}
              modifiers={{
                underline: PrincipleHighlightModifier,
              }}
            />
            <Link
              className="text-link"
              to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}#${absatzIdTag(prinzipienAnwendung.Beispiel.documentId)}`}
            >
              {methodsFivePrinciples.exampleLinkText}
            </Link>
          </PrincipleHighlightProvider>
        )}
      </div>
    );

    return { title: prinzipienAnwendung.Title, content };
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
