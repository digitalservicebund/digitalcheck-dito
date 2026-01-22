import { Link } from "react-router";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import { DetailsSummaryProps } from "~/components/DetailsSummary.tsx";
import type { HeadingProps } from "~/components/Heading";
import { DetailsSummaryListProps } from "~/components/InfoBox.tsx";
import ItalicModifier from "~/components/ItalicModifier.tsx";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_EXAMPLES_PRINCIPLES } from "~/resources/staticRoutes";
import { absatzIdTag } from "~/utils/paragraphUtils";
import {
  AbsatzWithParagraph,
  PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";

function AspectExample({
  beispiel,
  prinzip,
}: Readonly<{
  beispiel: AbsatzWithParagraph;
  prinzip: PrinzipWithAspekte;
}>) {
  return (
    <PrincipleHighlightProvider
      absatzId={beispiel.documentId}
      principlesToShow={[prinzip]}
      useAnchorLinks={false}
    >
      <h4 className="ds-label-02-bold">
        {methodsFivePrinciples.exampleTitle} § {beispiel.Paragraph.Nummer}{" "}
        {beispiel.Paragraph.Gesetz}:
      </h4>
      <BlocksRenderer
        content={beispiel.Text}
        modifiers={{
          underline: PrincipleHighlightModifier,
        }}
      />
      <Link
        className="text-link"
        to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}#${absatzIdTag(beispiel.documentId)}`}
      >
        {methodsFivePrinciples.exampleLinkText}
      </Link>
    </PrincipleHighlightProvider>
  );
}

export default function getDetailsSummaryProps(
  prinzip: PrinzipWithAspekte,
): DetailsSummaryListProps | undefined {
  const { Aspekte } = prinzip;

  const items: DetailsSummaryProps[] = Aspekte.map((aspekt) => {
    const identifier = slugify(aspekt.Titel);
    const children = (
      <div className="space-y-4 [&_p,&_ul]:mb-8">
        <BlocksRenderer
          content={aspekt.Text}
          modifiers={{ italic: ItalicModifier }}
        />
        {aspekt.Leitfragen && (
          <>
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.questionsTitle}
            </h4>
            <BlocksRenderer
              content={aspekt.Leitfragen}
              modifiers={{ italic: ItalicModifier }}
            />
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
          <AspectExample beispiel={aspekt.Beispiel} prinzip={prinzip} />
        )}
      </div>
    );

    return {
      title: aspekt.Titel,
      children,
      identifier,
    } satisfies DetailsSummaryProps;
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
