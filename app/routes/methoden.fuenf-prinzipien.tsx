import { Link, useLoaderData } from "react-router";
import Absatz from "~/components/Absatz";
import Badge from "~/components/Badge";
import { BlocksRenderer } from "~/components/BlocksRenderer";
import Box from "~/components/Box";
import Container from "~/components/Container";
import CustomLink from "~/components/CustomLink";
import Heading, { HeadingProps } from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import PrincipleHighlightModifier from "~/components/PrincipleHighlightModifier";
import { PrinciplePosterBox } from "~/components/PrinciplePosterBox";
import Separator from "~/components/Separator";
import TableOfContents from "~/components/TableOfContents";
import { PrincipleHighlightProvider } from "~/providers/PrincipleHighlightProvider";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import {
  absatzIdTag,
  filterErfuellungenByPrinciples,
  getAbsatzFromExampleParagraph,
} from "~/utils/paragraphUtils";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipWithAnwendungen,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_PRINCIPLES.title);
}

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAnwendungen[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  return { prinzips: prinzipData.prinzips };
};

export default function FivePrinciples() {
  const { prinzips } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero
        title={methodsFivePrinciples.title}
        subtitle={methodsFivePrinciples.subtitle}
      >
        <TableOfContents
          heading={methodsFivePrinciples.contentOverviewTitle}
          links={[
            {
              id: "instruction",
              title: methodsFivePrinciples.anchor.instruction,
            },
            ...prinzips.map((prinzip) => ({
              id: slugify(prinzip.Name),
              title: `${methodsFivePrinciples.anchor.principle} ${prinzip.Name}`,
            })),
          ]}
        />
      </Hero>

      <Container className="ds-stack ds-stack-40">
        <div id="instruction">
          <Badge Icon={methodsFivePrinciples.instruction.badge.Icon}>
            {methodsFivePrinciples.instruction.badge.text}
          </Badge>
          <Heading tagName="h2">
            {methodsFivePrinciples.instruction.title}
          </Heading>
        </div>

        <InfoBoxList
          className="list-unstyled ds-stack ds-stack-40"
          items={methodsFivePrinciples.instruction.items}
        />

        <Separator />
      </Container>

      {prinzips.map((prinzip) => {
        return (
          <Container
            className="flex flex-col gap-40 pb-64"
            key={slugify(prinzip.Name)}
          >
            <InfoBox
              identifier={slugify(prinzip.Name)}
              heading={{
                tagName: "h2",
                text: prinzip.Name,
              }}
              badge={{
                children: methodsFivePrinciples.principleLabel,
                principleNumber: prinzip.Nummer,
              }}
              content={prinzip.Beschreibung}
              detailsSummary={getDetailsSummary(prinzip)}
            />

            <PrincipleExample prinzip={prinzip} />
          </Container>
        );
      })}

      <PrinciplePosterBox />

      {methodsFivePrinciples.nextStep && (
        <Container>
          <Box
            heading={{
              text: methodsFivePrinciples.nextStep.title,
              look: "ds-heading-03-reg",
            }}
            badge={{
              text: methodsFivePrinciples.nextStep.label,
              Icon: methodsFivePrinciples.nextStep.icon,
            }}
            content={{ markdown: methodsFivePrinciples.nextStep.text }}
            buttons={methodsFivePrinciples.nextStep.buttons}
          />
        </Container>
      )}
    </>
  );
}

function PrincipleExample({
  prinzip,
}: Readonly<{ prinzip: PrinzipWithAnwendungen }>) {
  const exampleAbsatz = getAbsatzFromExampleParagraph(prinzip.Example);
  if (!exampleAbsatz) return undefined;

  const paragraph = prinzip.Example!.Paragraph;
  const absatzNumber = prinzip.Example!.AbsatzNumber;

  const erfuellungen = exampleAbsatz.PrinzipErfuellungen
    ? filterErfuellungenByPrinciples(exampleAbsatz.PrinzipErfuellungen, [
        prinzip,
      ])
    : [];

  const regelungsvorhaben = paragraph.Digitalcheck?.Regelungsvorhaben;

  return (
    <div className="space-y-16 rounded-lg border border-gray-600 bg-gray-100 px-32 py-24">
      <Heading tagName="h3" className="flex flex-col gap-16">
        <span>Ein Textbeispiel</span>{" "}
        <span className="ds-label-01-bold flex flex-col gap-8">
          <span>{`§ ${paragraph.Nummer} ${paragraph.Gesetz}`}</span>{" "}
          <span>{paragraph.Titel}</span>
        </span>
      </Heading>

      <Absatz
        absatz={{
          ...exampleAbsatz,
          number: absatzNumber,
          PrinzipErfuellungen: erfuellungen,
        }}
        principlesToShow={[prinzip]}
        useAnchorLinks={false}
      />
      <p className="ds-label-03-reg items-center text-gray-900">
        Regelung:&nbsp;
        <CustomLink
          target="_blank"
          to={`${ROUTE_REGELUNGEN.url}/${regelungsvorhaben?.URLBezeichnung ?? ""}`}
          className="text-link inline-flex"
          rel="noreferrer"
        >
          {regelungsvorhaben?.Titel}
        </CustomLink>
      </p>
    </div>
  );
}

const getDetailsSummary = (prinzip: PrinzipWithAnwendungen) => {
  const { PrinzipienAnwendung: prinzipienAnwendungen } = prinzip;

  const items = prinzipienAnwendungen.map((prinzipienAnwendung) => {
    const exampleAbsatz = getAbsatzFromExampleParagraph(
      prinzipienAnwendung.Example,
    );

    // TODO: maybe something different than p and strong
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
        {exampleAbsatz && (
          <PrincipleHighlightProvider
            absatzId={exampleAbsatz.id.toString()}
            principlesToShow={[prinzip]}
            useAnchorLinks={false}
          >
            <h4 className="ds-label-02-bold">
              {methodsFivePrinciples.exampleTitle} §{" "}
              {prinzipienAnwendung.Example!.Paragraph.Nummer}{" "}
              {prinzipienAnwendung.Example!.Paragraph.Gesetz}:
            </h4>
            <BlocksRenderer
              content={exampleAbsatz.Text}
              modifiers={{
                underline: PrincipleHighlightModifier,
              }}
            />
            <Link
              className="text-link"
              to={`${ROUTE_EXAMPLES_PRINCIPLES.url}/${prinzip.URLBezeichnung}#${absatzIdTag(exampleAbsatz.id)}`}
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
      className: "ds-label-01-bold",
    } as HeadingProps,
    items,
  };
};
