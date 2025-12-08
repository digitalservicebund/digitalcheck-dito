import { Link, Outlet, useOutletContext, useParams } from "react-router";
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
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { NavigationContext } from "./dokumentation._documentationNavigation";

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

export default function NewDocumentationPrinciple() {
  const { principleId } = useParams();
  const navContext = useOutletContext<NavigationContext>();

  const prinzip = navContext.prinzips.find(
    ({ URLBezeichnung }) => URLBezeichnung === principleId,
  );

  if (!prinzip)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("No Prinzip for slug found", { status: 404 });

  return (
    <>
      <MetaTitle prefix={prinzip.Name} />
      <div className="space-y-40">
        <PrincipleWithExample prinzip={prinzip} />

        <Separator />

        <Outlet context={{ ...navContext, prinzip }} />
      </div>
    </>
  );
}
