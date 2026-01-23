import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@digitalservicebund/icons";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import { ReactNode } from "react";
import { data, Link, useLoaderData } from "react-router";
import { twJoin } from "tailwind-merge";
import AccordionItem from "~/components/AccordionItem.tsx";
import Badge from "~/components/Badge.tsx";
import { BlocksRenderer } from "~/components/BlocksRenderer.tsx";
import { LinkButton } from "~/components/Button.tsx";
import { BreakoutHero } from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";
import { PrincipleHightlightNullModifier } from "~/components/PrincipleHighlightModifier.tsx";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import SidebarContainer from "~/layout/SidebarContainer";
import { PRINCIPLE_COLORS, PrincipleNumber } from "~/resources/constants.ts";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien.ts";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_METHODS_PRINCIPLES,
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
import type { Route } from "../../../.react-router/types/app/routes/+types/beispiele.prinzipien.$prinzip.ts";
import {
  PRINZIP_ASPEKTE_QUERY,
  PRINZIP_LIST_QUERY,
  PrinzipListItem,
  type PrinzipListQueryReturnType,
} from "./query";

function AspectHeader({
  children,
  number,
  principleNumber,
}: Readonly<{
  children: ReactNode;
  number: ReactNode;
  principleNumber: PrincipleNumber;
}>) {
  return (
    <div>
      <Badge
        className={twJoin(
          PRINCIPLE_COLORS[principleNumber].background,
          "mb-16",
        )}
      >
        Schwerpunkt
      </Badge>
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

export async function loader({ params }: Route.LoaderArgs) {
  if (!getFeatureFlag("principles26")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }

  const status = getFeatureFlag("principles26") ? "DRAFT" : "PUBLISHED";

  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(PRINZIP_ASPEKTE_QUERY, {
    URLBezeichnung: params.prinzip,
    status,
  });

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const prinzipListData =
    await fetchStrapiData<PrinzipListQueryReturnType>(PRINZIP_LIST_QUERY);
  if ("error" in prinzipListData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipListData.error, { status: 400 });
  }

  if (prinzipData.prinzips.length === 0) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }

  return {
    prinzip: prinzipData.prinzips[0],
    prinzipList: prinzipListData.prinzips,
  };
}

function ItalicModifier({ node }: Readonly<{ node: Node }>) {
  return <i>{node.text}</i>;
}

function Textbeispiel({
  beispiel,
  prinzip,
  headingTag: HeadingTag,
}: Readonly<{
  beispiel: AbsatzWithParagraph;
  prinzip: BasePrinzip;
  headingTag: "h3" | "h4";
}>) {
  const isExcerpt = !!beispiel.Auszug;
  const content = (isExcerpt ? beispiel.Auszug : null) ?? beispiel.Text;

  return (
    <div className="space-y-16 bg-gray-100 p-24">
      <HeadingTag className="ds-heading-02-reg">Ein Textbeispiel</HeadingTag>
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
        <AspectHeader number={aspect.Nummer} principleNumber={prinzip.Nummer}>
          {aspect.Titel}
        </AspectHeader>
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
                        headingTag="h4"
                      />
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </>
        )}
        {aspect.Beispiel && (
          <Textbeispiel
            beispiel={aspect.Beispiel}
            prinzip={prinzip}
            headingTag="h3"
          />
        )}
      </div>
    </section>
  );
}

function PrincipleNavigation({
  principles,
  current,
}: {
  principles: PrinzipListItem[];
  current: BasePrinzip;
}) {
  const index = principles.findIndex(
    (principle) => principle.order === current.order,
  );
  const prev = index > 0 ? principles[index - 1] : null;
  const next = index < principles.length - 1 ? principles[index + 1] : null;

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
      {prev ? (
        <LinkButton
          look="tertiary"
          to={ROUTE_METHODS_PRINCIPLES.url + "/" + prev.URLBezeichnung}
          iconLeft={<KeyboardArrowLeft />}
          className="text-left"
        >
          Vorheriges Prinzip
          <div className="ds-label-02-reg mt-8">{prev.Name}</div>
        </LinkButton>
      ) : (
        <span />
      )}
      {next ? (
        <LinkButton
          look="tertiary"
          to={ROUTE_METHODS_PRINCIPLES.url + "/" + next.URLBezeichnung}
          iconRight={<KeyboardArrowRight />}
          className="text-left"
        >
          Nächstes Prinzip
          <div className="ds-label-02-reg mt-8">{next.Name}</div>
        </LinkButton>
      ) : (
        <span />
      )}
    </div>
  );
}

export default function Prinzip() {
  const { prinzip, prinzipList } = useLoaderData<typeof loader>();

  return (
    <>
      <MetaTitle
        prefix={ROUTE_METHODS_PRINCIPLES_NEW_DIGITALE_ANGEBOTE.title}
      />
      <main>
        <div className="breakout-grid-toc">
          <BreakoutHero
            preline={
              <div>
                <Badge className={`bg-principle-${prinzip.Nummer} mb-16`}>
                  Prinzip {prinzip.order}
                </Badge>
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
        <div className="breakout-grid-toc my-80">
          <PrincipleNavigation principles={prinzipList} current={prinzip} />
        </div>
      </main>
    </>
  );
}
