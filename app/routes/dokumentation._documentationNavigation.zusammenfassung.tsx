import { isArray } from "@posthog/core";
import { type ReactNode } from "react";
import { Link, useOutletContext } from "react-router";
import type { BadgeProps } from "~/components/Badge";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  type Route,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import {
  type Participation,
  type PolicyTitle,
  type Principle,
  type PrincipleReasoning,
} from "~/routes/dokumentation/documentationDataSchema";
import type { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";

const { summary } = digitalDocumentation;

const createInfoBoxItem = ({
  route,
  content,
  badge,
}: {
  route: Route;
  content?: ReactNode;
  badge?: BadgeProps;
}): InfoBoxProps => ({
  identifier: route.url,
  testId: route.url,
  heading: {
    text: route.title,
    tagName: "h2",
    look: "ds-heading-03-reg",
  },
  badge: badge,
  children: (
    <div className="mt-24">
      {content ? (
        <div className="space-y-24">
          {content}
          <Link
            to={route.url}
            className="text-link"
            aria-label={`${route.title} ${summary.buttonEdit.ariaLabelSuffix}`}
          >
            {summary.buttonEdit.text}
          </Link>
        </div>
      ) : (
        <Warning heading={summary.warnings.missing} route={route} />
      )}
    </div>
  ),
  look: "highlight",
  className: "bg-white",
});

function Warning({ heading, route }: { heading: string; route: Route }) {
  return (
    <InlineNotice look="warning" heading={heading}>
      <Link
        to={route.url}
        className="text-link"
        aria-label={`${route.title} ${summary.buttonEditNow.ariaLabelSuffix}`}
      >
        {summary.buttonEditNow.text}
      </Link>
    </InlineNotice>
  );
}

function Answer({
  heading,
  answers,
  route,
}: {
  heading: string;
  answers: { prefix: string; answer?: string }[];
  route: Route;
}) {
  return (
    <div className="space-y-8">
      <Heading tagName="h3" look="ds-subhead">
        {heading}
      </Heading>
      {answers
        .filter(({ answer }) => answer)
        .map(({ answer, prefix }) => (
          <p key={prefix + answer}>
            <span className="font-bold">{prefix}: </span>
            <span>{answer}</span>
          </p>
        ))}
      {answers.some(({ answer }) => !answer) && (
        <Warning
          key={heading}
          heading={summary.warnings.incomplete}
          route={route}
        />
      )}
    </div>
  );
}

function PolicyTitleContent({ policyTitle }: { policyTitle: PolicyTitle }) {
  return (
    <Answer
      heading={digitalDocumentation.info.inputTitle.label}
      answers={[{ prefix: summary.answerPrefix, answer: policyTitle.title }]}
      route={ROUTE_DOCUMENTATION_TITLE}
    />
  );
}

function ParticipationContent({
  participation,
}: {
  participation: Participation;
}) {
  return (
    <>
      <Answer
        heading={digitalDocumentation.participation.formats.heading}
        answers={[
          { prefix: summary.answerPrefix, answer: participation.formats },
        ]}
        route={ROUTE_DOCUMENTATION_PARTICIPATION}
      />
      <Answer
        heading={digitalDocumentation.participation.results.heading}
        answers={[
          { prefix: summary.answerPrefix, answer: participation.results },
        ]}
        route={ROUTE_DOCUMENTATION_PARTICIPATION}
      />
    </>
  );
}

function PrincipleContent({
  principle,
  prinzip,
  route,
}: {
  principle: Principle;
  prinzip: PrinzipWithAspekte;
  route: Route;
}) {
  return (
    <>
      <Answer
        heading={summary.principleAnswerTitle}
        answers={[{ prefix: summary.answerPrefix, answer: principle.answer }]}
        route={route}
      />
      {isArray(principle.reasoning) ? (
        <AspectsContent
          reasoning={principle.reasoning}
          prinzip={prinzip}
          route={route}
        />
      ) : (
        <Answer
          heading={summary.reasonPrefix}
          answers={[
            { prefix: summary.answerPrefix, answer: principle.reasoning },
          ]}
          route={route}
        />
      )}
    </>
  );
}

function AspectsContent({
  reasoning,
  prinzip,
  route,
}: {
  reasoning: PrincipleReasoning[];
  prinzip: PrinzipWithAspekte;
  route: Route;
}) {
  const checkedAspects = reasoning.filter((reasoning) => reasoning?.checkbox);
  return checkedAspects.length === 0 ? (
    <Warning heading={summary.warnings.incomplete} route={route} />
  ) : (
    <>
      {checkedAspects.map((reasoning) => {
        const aspekt = prinzip.Aspekte.find(
          (aspekt) => slugify(aspekt.Kurzbezeichnung) === reasoning.aspect,
        );
        return (
          <div key={reasoning.aspect} className="space-y-8">
            <Answer
              heading={`${
                aspekt
                  ? aspekt.Kurzbezeichnung
                  : digitalDocumentation.principlePages.explanationFields
                      .ownExplanationTitle
              } 
                    ${summary.explanationHeading}`}
              answers={[
                {
                  prefix: summary.paragraphsPrefix,
                  answer: reasoning.paragraphs,
                },
                {
                  prefix: summary.reasonPrefix,
                  answer: reasoning.reason,
                },
              ]}
              route={route}
            />
          </div>
        );
      })}
    </>
  );
}

export default function DocumentationSummary() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const { documentationData } = useDocumentationData();

  const items: InfoBoxProps[] = [
    createInfoBoxItem({
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
      );
      return createInfoBoxItem({
        route: principleRoute,
        content:
          principleFormData && principleFormData.answer ? (
            <PrincipleContent
              principle={principleFormData}
              prinzip={prinzip}
              route={principleRoute}
            />
          ) : null,
        badge: {
          text: summary.principleBadge,
          principleNumber: prinzip.Nummer,
        },
      });
    }),
  ];

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_SUMMARY.title} />
      <Heading
        text={summary.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={summary.text} />
      <InfoBoxList className="space-y-40" items={items} />

      <DocumentationActions previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  );
}
