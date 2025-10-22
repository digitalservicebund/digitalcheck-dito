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
import type {
  Participation,
  PolicyTitle,
  Principle,
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
        <InlineNotice
          look="warning"
          heading={
            <Heading tagName="h4">
              Sie haben diesen Punkt noch nicht bearbeitet.
            </Heading>
          }
        >
          <Link
            to={route.url}
            className="text-link"
            aria-label={`${route.title} ${summary.buttonEditNow.ariaLabelSuffix}`}
          >
            {summary.buttonEditNow.text}
          </Link>
        </InlineNotice>
      )}
    </div>
  ),
  look: "highlight",
  className: "bg-white",
});

const renderAnswer = (
  heading: string,
  answers: { prefix: string; answer?: string }[],
) => (
  <div className="space-y-8">
    <Heading tagName="h3" look="ds-subhead">
      {heading}
    </Heading>
    {answers.map(({ answer, prefix }) => (
      <p key={prefix + answer}>
        <span className="font-bold">{prefix}</span>
        <span>{answer}</span>
      </p>
    ))}
  </div>
);

const renderPolicyTitle = (policyTitle?: PolicyTitle) => {
  if (!policyTitle) {
    return null;
  }
  return renderAnswer(digitalDocumentation.info.inputTitle.label, [
    { prefix: summary.answerPrefix, answer: policyTitle.title },
  ]);
};

const renderParticipation = (participation?: Participation) => {
  if (!participation) {
    return null;
  }
  return (
    <>
      {renderAnswer(digitalDocumentation.participation.formats.heading, [
        { prefix: summary.answerPrefix, answer: participation.formats },
      ])}
      {renderAnswer(digitalDocumentation.participation.results.heading, [
        { prefix: summary.answerPrefix, answer: participation.results },
      ])}
    </>
  );
};

const renderPrinciple = (principle: Principle, prinzip: PrinzipWithAspekte) => {
  return (
    <>
      {renderAnswer(summary.principleAnswerTitle, [
        { prefix: summary.answerPrefix, answer: principle.answer },
      ])}
      {isArray(principle.reasoning)
        ? principle.reasoning
            .filter((reasoning) => reasoning?.checkbox)
            .map((reasoning) => {
              const aspekt = prinzip.Aspekte.find(
                (aspekt) => slugify(aspekt.Titel) === reasoning.aspect,
              );
              return (
                <div
                  key={principle.id + reasoning.aspect}
                  className="space-y-8"
                >
                  {renderAnswer(
                    `${
                      aspekt
                        ? aspekt.Kurzbezeichnung
                        : digitalDocumentation.principlePages.explanationFields
                            .ownExplanationTitle
                    } 
                    ${summary.explanationHeading}`,
                    [
                      {
                        prefix: summary.paragraphsPrefix,
                        answer: reasoning.paragraphs,
                      },
                      {
                        prefix: summary.reasonPrefix,
                        answer: reasoning.reason,
                      },
                    ],
                  )}
                </div>
              );
            })
        : renderAnswer(summary.explanationHeading, [
            { prefix: summary.answerPrefix, answer: principle.reasoning },
          ])}
    </>
  );
};

export default function DocumentationSummary() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const { documentationData } = useDocumentationData();

  const items: InfoBoxProps[] = [
    createInfoBoxItem({
      route: ROUTE_DOCUMENTATION_TITLE,
      content: renderPolicyTitle(documentationData.policyTitle),
    }),
    createInfoBoxItem({
      route: ROUTE_DOCUMENTATION_PARTICIPATION,
      content: renderParticipation(documentationData.participation),
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
        content: principleFormData
          ? renderPrinciple(principleFormData, prinzip)
          : null,
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
