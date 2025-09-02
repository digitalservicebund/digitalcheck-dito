import Absatz from "~/components/Absatz";
import Container from "~/components/Container";
import CustomLink from "~/components/CustomLink";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import type {
  PrinzipWithAnwendungen,
  PrinzipWithAnwendungenAndExample,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import getDetailsSummary from "./getDetailsSummary";

type PrincipleProps = {
  prinzip: PrinzipWithAnwendungen;
};

export default function Principle({ prinzip }: Readonly<PrincipleProps>) {
  return (
    <Container className="space-y-40 pb-64" key={slugify(prinzip.Name)}>
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

      {prinzip.Beispiel && (
        <PrincipleExample
          prinzip={prinzip as PrinzipWithAnwendungenAndExample}
        />
      )}
    </Container>
  );
}

type PrincipleExampleProps = {
  prinzip: PrinzipWithAnwendungenAndExample;
};

function PrincipleExample({ prinzip }: Readonly<PrincipleExampleProps>) {
  const exampleAbsatz = prinzip.Beispiel;
  const paragraph = exampleAbsatz.Paragraph;
  const beispielvorhaben = paragraph.Beispielvorhaben;

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
        absatz={exampleAbsatz}
        principlesToShow={[prinzip]}
        useAnchorLinks={false}
      />
      <p className="ds-label-03-reg items-center text-gray-900">
        Regelung:&nbsp;
        <CustomLink
          target="_blank"
          to={`${ROUTE_REGELUNGEN.url}/${beispielvorhaben.URLBezeichnung ?? ""}`}
          className="text-link inline-flex"
          rel="noreferrer"
        >
          {beispielvorhaben.Titel}
        </CustomLink>
      </p>
    </div>
  );
}
