import { type ReactNode } from "react";
import { Link, useOutletContext } from "react-router";
import type { BadgeProps } from "~/components/Badge";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
  type Route,
} from "~/resources/staticRoutes";
import {
  type Participation,
  type PolicyTitle,
  type Principle,
} from "~/routes/dokumentation/documentationDataSchema";
import type { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContext } from "../dokumentation._documentationNavigation";
import DocumentationActions from "./DocumentationActions";
import { useDocumentationDataService } from "./DocumentationDataProvider";

const { summary } = digitalDocumentation;

const createInfoBoxItem = ({
  route,
  heading,
  content,
  badge,
}: {
  route: Route;
  heading?: string;
  content?: ReactNode;
  badge?: BadgeProps;
}): InfoBoxProps => ({
  identifier: route.url,
  testId: route.url,
  heading: {
    text: heading ?? route.title,
    tagName: "h2",
    look: "ds-heading-03-reg",
  },
  badge: badge,
  children: (
    <div className="mt-24">
      {content ? (
        <div className="space-y-24">{content}</div>
      ) : (
        <InlineNotice
          look="missingOrIncomplete"
          heading={summary.warnings.missing}
        />
      )}
      <Link
        to={route.url}
        className="text-link mt-24 block"
        aria-label={`${route.title} ${summary.buttonEdit.ariaLabelSuffix}`}
      >
        {summary.buttonEdit.text}
      </Link>
    </div>
  ),
  look: "highlight",
  className: "bg-white",
});

function Answer({
  heading,
  answers,
}: Readonly<{
  heading?: string;
  answers: { prefix: string; answer?: string }[];
}>) {
  return (
    <div className="grid grid-cols-2 gap-x-8">
      {heading && (
        <Heading tagName="h3" look="ds-subhead" className="col-span-2">
          {heading}
        </Heading>
      )}
      {answers
        .filter(({ answer }) => answer)
        .map(({ answer, prefix }) => (
          <p
            key={prefix + answer}
            className="col-span-2 grid grid-cols-subgrid"
          >
            <span className="font-bold">{prefix}</span>
            <span>{answer}</span>
          </p>
        ))}
      {answers.some(({ answer }) => !answer) && (
        <InlineNotice
          look="missingOrIncomplete"
          key={heading}
          heading={summary.warnings.incomplete}
        />
      )}
    </div>
  );
}

function PolicyTitleContent({
  policyTitle,
}: Readonly<{ policyTitle: PolicyTitle }>) {
  return (
    <Answer
      answers={[
        {
          prefix: "Vorläufiger Arbeitstitel des Vorhabens",
          answer: policyTitle.title,
        },
      ]}
    />
  );
}

function ParticipationContent({
  participation,
}: Readonly<{
  participation: Participation;
}>) {
  return (
    <>
      <Answer
        answers={[
          {
            prefix: "Auswirkungen auf Betroffene",
            answer: participation.formats,
          },
        ]}
      />
      <Answer
        answers={[
          {
            prefix: "Auswirkungen auf die Umsetzung",
            answer: participation.results,
          },
        ]}
      />
    </>
  );
}

function SimplifiedAspectsContent({
  explanation,
  aspects,
  prinzip,
}: {
  explanation: Principle["reasoning"];
  aspects: Principle["aspects"];
  prinzip: PrinzipWithAspekte;
}) {
  if (!aspects || aspects.length === 0) {
    return (
      <InlineNotice
        look="missingOrIncomplete"
        heading={summary.warnings.incomplete}
      />
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-x-8">
        <span className="ds-body-01-bold">Schwerpunkte:</span>
        <div className="flex flex-wrap gap-16">
          {aspects.map((aspect) => {
            const aspekt = prinzip.Aspekte.find(
              (a) => slugify(a.Kurzbezeichnung) === aspect,
            );
            return (
              <span
                key={aspect}
                className="rounded-full border border-blue-400 bg-blue-400 px-16 py-6 text-sm font-medium"
              >
                {aspekt ? aspekt.Kurzbezeichnung : aspect}
              </span>
            );
          })}
        </div>
      </div>
      {explanation && (
        <Answer answers={[{ prefix: "Erläuterung", answer: explanation }]} />
      )}
    </>
  );
}

function PrincipleContent({
  principle,
  prinzip,
}: Readonly<{
  principle: Principle;
  prinzip: PrinzipWithAspekte;
  simplified?: boolean;
}>) {
  return (
    <>
      <Answer
        answers={[
          { prefix: "Wird dieses Prinzip erfüllt?", answer: principle.answer },
        ]}
      />

      <SimplifiedAspectsContent
        explanation={principle.reasoning}
        aspects={principle.aspects}
        prinzip={prinzip}
      />
    </>
  );
}

export default function DocumentationSummaryV2() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const { documentationData } = useDocumentationDataService();

  const items: InfoBoxProps[] = [
    createInfoBoxItem({
      heading: "Informationen zum Regelungsvorhaben",
      route: ROUTE_DOCUMENTATION_TITLE,
      content: documentationData.policyTitle?.title ? (
        <PolicyTitleContent policyTitle={documentationData.policyTitle} />
      ) : null,
    }),
    createInfoBoxItem({
      route: ROUTE_DOCUMENTATION_PARTICIPATION,
      content:
        documentationData.participation &&
        (documentationData.participation.formats ||
          documentationData.participation.results) ? (
          <ParticipationContent
            participation={documentationData.participation}
          />
        ) : null,
    }),
    ...prinzips.map((prinzip) => {
      const principleRoute = routes
        .flat()
        .find((route) => route.url.endsWith(prinzip.URLBezeichnung));
      if (!principleRoute)
        throw new Error(
          `Cannot find route for principle ${prinzip.URLBezeichnung}`,
        );
      const principleFormData = documentationData.principles?.find(
        (principle) => principle.id === prinzip.documentId,
      ) as Principle;
      // In simplified flow, link to erlaeuterung sub-page if answer is saved
      const editRoute = principleFormData?.answer
        ? { ...principleRoute, url: `${principleRoute.url}/erlaeuterung` }
        : principleRoute;
      return createInfoBoxItem({
        route: editRoute,
        content: principleFormData?.answer ? (
          <PrincipleContent principle={principleFormData} prinzip={prinzip} />
        ) : null,
        badge: {
          text: `Prinzip ${prinzip.Nummer}`,
          principleNumber: prinzip.Nummer,
        },
      });
    }),
  ];

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_SUMMARY.title}`}
      />
      <Heading
        text={summary.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={summary.text} />
      <InfoBoxList className="space-y-40">
        {items.map((item, i) => (
          <InfoBox key={item.identifier ?? i} {...item} />
        ))}
      </InfoBoxList>

      <DocumentationActions previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  );
}
