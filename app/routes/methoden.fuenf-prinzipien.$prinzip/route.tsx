import { beispiele_prinzipien, methoden_fuenfPrinzipien } from "@/config/routes";
import { type ReactNode } from "react";
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
import {
  PRINCIPLE_COLORS,
  type PrincipleNumber,
} from "~/resources/constants.ts";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien.ts";
import { absatzIdTag, type Node } from "~/utils/paragraphUtils";
import { Link } from "~/utils/routerCompat";
import {
  type AbsatzWithParagraph,
  type BasePrinzip,
  type PrinzipAspekt,
  type PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.types.ts";
import { slugify } from "~/utils/utilFunctions.ts";
import { type PrinzipListItem } from "./query";

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
  headingTag: HeadingTag,
}: Readonly<{ children?: ReactNode; headingTag: "h3" | "h4" }>) {
  return (
    <div className="space-y-16 border border-gray-600 bg-green-200 p-40">
      <HeadingTag className="ds-heading-02-reg">
        Formulierungsbeispiel
      </HeadingTag>
      <div>{children}</div>
    </div>
  );
}

function ItalicModifier({ node }: Readonly<{ node: Node }>) {
  if (node.bold) return <strong className={"italic"}>{node.text}</strong>;
  return <i>{node.text}</i>;
}

function BoldModifier({ node }: Readonly<{ node: Node }>) {
  return <strong>{node.text}</strong>;
}

const textModifiers = { italic: ItalicModifier, bold: BoldModifier };

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
    <div className="space-y-16 border border-gray-600 bg-gray-100 p-24">
      <HeadingTag className="ds-heading-02-reg">Ein Textbeispiel</HeadingTag>
      <div className="ds-label-02-bold">
        § {beispiel.Paragraph.Nummer} {beispiel.Paragraph.Gesetz}
        {isExcerpt && " (Auszug)"}
      </div>
      <BlocksRenderer
        content={content}
        modifiers={{
          ...textModifiers,
          underline: PrincipleHightlightNullModifier,
        }}
      />
      <Link
        className="text-link"
        to={`${beispiele_prinzipien.path}/${prinzip.URLBezeichnung}#${absatzIdTag(beispiel.documentId)}`}
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
        {aspect.Text && (
          <BlocksRenderer
            content={aspect.Text}
            className={"space-y-16"}
            modifiers={textModifiers}
          />
        )}
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
                      <Formulierungsbeispiel headingTag="h4">
                        <BlocksRenderer
                          content={anwendung.Formulierungsbeispiel}
                          modifiers={textModifiers}
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
}: Readonly<{
  principles: PrinzipListItem[];
  current: BasePrinzip;
}>) {
  const index = principles.findIndex(
    (principle) => principle.order === current.order,
  );
  const prev = index > 0 ? principles[index - 1] : null;
  const next = index < principles.length - 1 ? principles[index + 1] : null;

  return (
    <>
      <nav
        aria-labelledby="principle-navigation-heading"
        className="mb-80 space-y-8"
      >
        <h2 id="principle-navigation-heading" className="ds-heading-03-reg">
          Prinzipien-Übersicht
        </h2>
        {principles.map((principle) => (
          <Link
            key={principle.order}
            to={`${methoden_fuenfPrinzipien.path}/${principle.URLBezeichnung}`}
            className={twJoin(
              "block",
              principle.order === current.order
                ? "ds-body-01-reg"
                : "ds-link-01-reg",
            )}
          >
            Prinzip {principle.order}: {principle.Name}
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap justify-between gap-16">
        {prev ? (
          <LinkButton
            look="link"
            to={methoden_fuenfPrinzipien.path + "/" + prev.URLBezeichnung}
            className="ds-link-01-bold"
          >
            Zurück zu Prinzip {prev.order}
          </LinkButton>
        ) : (
          <span />
        )}
        {next ? (
          <LinkButton
            look="tertiary"
            to={methoden_fuenfPrinzipien.path + "/" + next.URLBezeichnung}
            className="flex justify-center"
          >
            Zum nächsten Prinzip
          </LinkButton>
        ) : (
          <span />
        )}
      </div>
    </>
  );
}

export default function Prinzip({
  prinzip,
  prinzipList = [],
}: {
  prinzip?: PrinzipWithAspekteAndExample;
  prinzipList?: PrinzipListItem[];
} = {}) {
  if (!prinzip) return null;

  return (
    <>
      <MetaTitle prefix={`Prinzip: ${prinzip.Name}`} />
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
