import Absatz from "~/components/Absatz";
import InfoBox from "~/components/InfoBox";
import NewTabLink from "~/components/NewTabLink.tsx";
import { methodsFivePrinciples } from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";
import type {
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import getDetailsSummaryProps from "./getDetailsSummaryProps.tsx";

type PrincipleProps = {
  prinzip: PrinzipWithAspekte;
};

export default function Principle({ prinzip }: Readonly<PrincipleProps>) {
  return (
    <div className="space-y-40" key={slugify(prinzip.Name)}>
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
      >
        <InfoBox.DetailsSummaryList {...getDetailsSummaryProps(prinzip)} />
      </InfoBox>

      {prinzip.Beispiel && (
        <PrincipleExample prinzip={prinzip as PrinzipWithAspekteAndExample} />
      )}
    </div>
  );
}

type PrincipleExampleProps = {
  prinzip: PrinzipWithAspekteAndExample;
};

export function PrincipleExample({ prinzip }: Readonly<PrincipleExampleProps>) {
  const exampleAbsatz = prinzip.Beispiel;
  const paragraph = exampleAbsatz.Paragraph;
  const beispielvorhaben = paragraph.Beispielvorhaben;

  return (
    <div className="space-y-16 rounded-lg border border-gray-600 bg-gray-100 px-32 py-24">
      <hgroup>
        <h3 className="mb-16">Ein Textbeispiel</h3>
        <p className="ds-label-01-bold mb-8">
          § {paragraph.Nummer} {paragraph.Gesetz}
        </p>
        <p className="ds-label-01-bold">{paragraph.Titel}</p>
      </hgroup>

      <Absatz
        absatz={exampleAbsatz}
        principlesToShow={[prinzip]}
        useAnchorLinks={false}
      />
      <p className="ds-label-03-reg items-center text-gray-900">
        Regelung:&nbsp;
        <NewTabLink
          to={`${ROUTE_REGELUNGEN.url}/${beispielvorhaben.URLBezeichnung ?? ""}`}
          className="text-link inline-flex"
        >
          {beispielvorhaben.Titel}
        </NewTabLink>
      </p>
    </div>
  );
}
