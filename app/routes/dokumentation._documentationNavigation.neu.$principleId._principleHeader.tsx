import { Link, Outlet, useNavigate, useOutletContext } from "react-router";
import { PrincipleExplanation } from "~/components/Absatz.tsx";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Button from "~/components/Button";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Dialog from "~/components/Dialog";
import Heading from "~/components/Heading";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier.tsx";
import Separator from "~/components/Separator";
import PrincipleHighlightProvider from "~/providers/PrincipleHighlightProvider.tsx";
import { examples } from "~/resources/content/beispiele.ts";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { general } from "~/resources/content/shared/general";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
} from "~/resources/staticRoutes";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { NavigationContextWithPrinciple } from "./dokumentation._documentationNavigation.neu.$principleId";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import { Principle } from "./dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "./dokumentation/documentationDataService";

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
  const navContext = useOutletContext<NavigationContextWithPrinciple>();

  const { findDocumentationDataForUrl } = useDocumentationData();
  const principleData = findDocumentationDataForUrl(
    navContext.prinzip.documentId,
  ) as Principle;
  const navigate = useNavigate();

  const anserUrl = `${ROUTE_DOCUMENTATION.url}/neu/${navContext.prinzip.URLBezeichnung}`;

  const handleChangeAnswerClick = async () => {
    const basePrincipleData = {
      id: navContext.prinzip.documentId,
      reasoning: undefined,
      answer: "",
    };
    addOrUpdatePrinciple(basePrincipleData);

    await navigate(anserUrl);
  };

  return (
    <div className="space-y-40">
      <PrincipleWithExample prinzip={navContext.prinzip} />

      {navContext.currentUrl !== anserUrl && (
        <Dialog
          title="Antwort ändern"
          renderToggleButton={({ toggleDialog }) => (
            <Button type="button" onClick={toggleDialog} look="tertiary">
              <span className="inline-flex flex-col text-left">
                <span>Sie haben {principleData?.answer} ausgewählt.</span>
                <span>
                  <small>Klicken sie hier um Ihre Angaben zu ändern.</small>
                </span>
              </span>
            </Button>
          )}
          renderActionButtons={({ closeDialog }) => (
            <div className="flex flex-row gap-12">
              <Button
                type="button"
                onClick={async () => {
                  await handleChangeAnswerClick();
                }}
              >
                Erläuterungen löschen und Antwort ändern
              </Button>

              <Button type="button" look="tertiary" onClick={closeDialog}>
                {general.buttonCancel.text}
              </Button>
            </div>
          )}
        >
          Sie können hier Ihre Antwort ändern. Dabei wird die bereits gegebene
          Antwort und die dazugehörigen Erläuterungen gelöscht.
        </Dialog>
      )}

      <Separator />

      <Outlet context={navContext} />
    </div>
  );
}
