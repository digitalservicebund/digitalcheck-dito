import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import { ReactNode } from "react";
import { data, Link, useLoaderData } from "react-router";
import AccordionItem from "~/components/AccordionItem.tsx";
import Badge from "~/components/Badge.tsx";
import { BlocksRenderer } from "~/components/BlocksRenderer.tsx";
import { BreakoutHero } from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";
import { PrincipleHightlightNullModifier } from "~/components/PrincipleHighlightModifier.tsx";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import SidebarContainer from "~/layout/SidebarContainer";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien.ts";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_METHODS_PRINCIPLES_NEW_DIGITALE_ANGEBOTE,
} from "~/resources/staticRoutes.ts";
import getFeatureFlag from "~/utils/featureFlags.server.ts";
import { absatzIdTag, Node } from "~/utils/paragraphUtils";
import {
  AbsatzWithParagraph,
  BasePrinzip,
  fetchStrapiData,
  PrinzipAspekt,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server.ts";
import { slugify } from "~/utils/utilFunctions.ts";
import { PRINZIP_ASPEKTE_QUERY } from "./query";

function AspectHeader({
  children,
  number,
}: Readonly<{
  children: ReactNode;
  number: ReactNode;
}>) {
  return (
    <div>
      <Badge className="bg-principle-1 mb-16">Schwerpunkt</Badge>
      <h2 className="mb-40">
        {number} {children}
      </h2>
    </div>
  );
}

function Formulierungsbeispiel({
  children,
}: Readonly<{ children?: ReactNode }>) {
  return (
    <div className="space-y-8 rounded-lg bg-green-300 p-40">
      <div className="ds-label-02-reg flex items-center gap-8">
        <LightbulbOutlined className={"text-black/200"} /> Formulierungsbeispiel
      </div>
      <div>{children}</div>
    </div>
  );
}

export async function loader() {
  if (!getFeatureFlag("principles26")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }

  const status = getFeatureFlag("principles26") ? "DRAFT" : "PUBLISHED";

  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(PRINZIP_ASPEKTE_QUERY, {
    URLBezeichnung: "digitale-angebote-fuer-alle-nutzbar-gestalten",
    status,
  });

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  if (prinzipData.prinzips.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }

  return { prinzip: prinzipData.prinzips[0] };
}

function ItalicModifier({ node }: Readonly<{ node: Node }>) {
  return <i>{node.text}</i>;
}

function Textbeispiel({
  beispiel,
  prinzip,
}: Readonly<{
  beispiel: AbsatzWithParagraph;
  prinzip: BasePrinzip;
}>) {
  const isExcerpt = !!beispiel.Auszug;
  const content = (isExcerpt ? beispiel.Auszug : null) ?? beispiel.Text;

  return (
    <div className="space-y-16 bg-gray-100 p-24">
      <h4 className="ds-heading-02-reg">Ein Textbeispiel</h4>
      <div className="ds-label-02-bold">
        § {beispiel.Paragraph.Nummer} {beispiel.Paragraph.Gesetz}
        {isExcerpt && " (Auszug)"}
      </div>
      <BlocksRenderer
        content={content}
        modifiers={{
          underline: PrincipleHightlightNullModifier,
          italic: ItalicModifier,
        }}
      />
      <Link
        className="text-link"
        to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}#${absatzIdTag(beispiel.documentId)}`}
      >
        {methodsFivePrinciples.exampleLinkText}
      </Link>
    </div>
  );
}

function Aspect({
  aspect,
  prinzip,
}: Readonly<{
  aspect: PrinzipAspekt;
  prinzip: PrinzipWithAspekteAndExample;
}>) {
  return (
    <section className="my-80" id={slugify(aspect.Kurzbezeichnung)}>
      <div className="space-y-40">
        <AspectHeader number={aspect.Nummer}>{aspect.Titel}</AspectHeader>
        <BlocksRenderer content={aspect.Text} className={"space-y-16"} />
        {!!aspect.Anwendung.length && (
          <>
            <h3>So wenden Sie den Aspekt an</h3>
            <div>
              {aspect.Anwendung.map((anwendung) => (
                <AccordionItem key={anwendung.Titel} headline={anwendung.Titel}>
                  <div className="space-y-40">
                    <BlocksRenderer
                      className="space-y-16"
                      content={anwendung.Erklaerung}
                    />
                    {anwendung.Formulierungsbeispiel && (
                      <Formulierungsbeispiel>
                        <BlocksRenderer
                          content={anwendung.Formulierungsbeispiel}
                          modifiers={{ italic: ItalicModifier }}
                        />
                      </Formulierungsbeispiel>
                    )}
                    {anwendung.Beispiel && (
                      <Textbeispiel
                        beispiel={anwendung.Beispiel}
                        prinzip={prinzip}
                      />
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function PrinzipDigitaleAngebote() {
  const { prinzip } = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle
        prefix={ROUTE_METHODS_PRINCIPLES_NEW_DIGITALE_ANGEBOTE.title}
      />
      <main>
        <div className="breakout-grid-toc">
          <BreakoutHero
            preline={
              <div className={"ds-subhead text-link mb-16 no-underline"}>
                <span className="hover:cursor-not-allowed hover:underline">
                  Methoden
                </span>{" "}
                {">"}{" "}
                <span className="hover:cursor-not-allowed hover:underline">
                  Prinzipien für digitaltaugliche Gesetzgebung
                </span>
              </div>
            }
            title={prinzip.Name}
          >
            <BlocksRenderer
              className="ds-subhead mt-16 space-y-16"
              content={prinzip.Beschreibung}
            />
          </BreakoutHero>
        </div>
        <SidebarContainer
          sidebar={
            <ToC title={"Inhalt"} selector="section[id]">
              <ToC.List className="list-unstyled list-none">
                {prinzip.Aspekte.map((aspect) => (
                  <ToC.Item
                    key={aspect.Titel}
                    href={`#${slugify(aspect.Kurzbezeichnung)}`}
                    title={(aspect.Nummer ?? "") + " " + aspect.Kurzbezeichnung}
                  />
                ))}
              </ToC.List>
            </ToC>
          }
        >
          {prinzip.Aspekte.map((aspect) => (
            <Aspect
              aspect={aspect}
              prinzip={prinzip}
              key={aspect.Kurzbezeichnung}
            />
          ))}
        </SidebarContainer>
      </main>
    </>
  );
}
