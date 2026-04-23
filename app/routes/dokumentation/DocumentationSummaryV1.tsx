import { isArray } from "@posthog/core";
import { type ReactNode } from "react";
import type { BadgeProps } from "~/components/Badge";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { useNavigationContext } from "~/contexts/DocumentationNavigationContext";
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
  type PrincipleReasoningV1,
  type V1,
  type V2,
} from "~/routes/dokumentation/documentationDataSchema";
import { Link } from "~/utils/routerCompat";
import type { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import DocumentationActions from "./DocumentationActions";
import { useDocumentationDataService } from "./DocumentationDataProvider";

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
  heading: string;
  answers: { prefix: string; answer?: string }[];
}>) {
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
      heading={digitalDocumentation.info.inputTitle.label}
      answers={[{ prefix: summary.answerPrefix, answer: policyTitle.title }]}
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
        heading={digitalDocumentation.participation.formats.heading}
        answers={[
          { prefix: summary.answerPrefix, answer: participation.formats },
        ]}
      />
      <Answer
        heading={digitalDocumentation.participation.results.heading}
        answers={[
          { prefix: summary.answerPrefix, answer: participation.results },
        ]}
      />
    </>
  );
}

function PrincipleContent({
  principle,
  prinzip,
}: Readonly<{
  principle: Principle<V1 | V2>;
  prinzip: PrinzipWithAspekte;
}>) {
  const reasoning = principle.reasoning;

  return (
    <>
      <Answer
        heading={summary.principleAnswerTitle}
        answers={[{ prefix: summary.answerPrefix, answer: principle.answer }]}
      />
      {isArray(reasoning) ? (
        <AspectsContent reasoning={reasoning} prinzip={prinzip} />
      ) : (
        <Answer
          heading={summary.reasonPrefix}
          answers={[
            {
              prefix: summary.answerPrefix,
              answer: reasoning,
            },
          ]}
        />
      )}
    </>
  );
}

function AspectsContent({
  reasoning,
  prinzip,
}: {
  reasoning: PrincipleReasoningV1[];
  prinzip: PrinzipWithAspekte;
}) {
  const checkedAspects = reasoning.filter((reasoning) => reasoning?.checkbox);
  return checkedAspects.length === 0 ? (
    <InlineNotice
      look="missingOrIncomplete"
      heading={summary.warnings.incomplete}
    />
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
            />
          </div>
        );
      })}
    </>
  );
}

export default function DocumentationSummaryV1() {
  const { routes, previousUrl, nextUrl, prinzips } = useNavigationContext();

  const { documentationData } = useDocumentationDataService();

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
        content: principleFormData?.answer ? (
          <PrincipleContent principle={principleFormData} prinzip={prinzip} />
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
