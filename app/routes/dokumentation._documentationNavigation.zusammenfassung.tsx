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
import { useFederalState } from "~/contexts/FederalStateContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  type Route,
  ROUTE_DOCUMENTATION_AUSWIRKUNGEN,
  ROUTE_DOCUMENTATION_ERFORDERLICHKEIT,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_DOCUMENTATION_ZWECKMAESSIGKEIT,
} from "~/resources/staticRoutes";
import {
  type Auswirkungen,
  type Erforderlichkeit,
  type Participation,
  type PolicyTitle,
  type Principle,
  type PrincipleReasoning,
  type Zweckmaessigkeit,
} from "~/routes/dokumentation/documentationDataSchema";
import type { PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";

const { summary, brandenburg } = digitalDocumentation;

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
}: {
  heading: string;
  answers: { prefix: string; answer?: string }[];
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
        <InlineNotice
          look="missingOrIncomplete"
          key={heading}
          heading={summary.warnings.incomplete}
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

function ErforderlichkeitContent({
  erforderlichkeit,
}: {
  erforderlichkeit: Erforderlichkeit;
}) {
  return (
    <Answer
      heading={digitalDocumentation.brandenburg.erforderlichkeit.textField.label}
      answers={[
        { prefix: summary.answerPrefix, answer: erforderlichkeit.content },
      ]}
    />
  );
}

function ZweckmaessigkeitContent({
  zweckmaessigkeit,
}: {
  zweckmaessigkeit: Zweckmaessigkeit;
}) {
  return (
    <Answer
      heading={digitalDocumentation.brandenburg.zweckmaessigkeit.textField.label}
      answers={[
        { prefix: summary.answerPrefix, answer: zweckmaessigkeit.content },
      ]}
    />
  );
}

function AuswirkungenContent({
  auswirkungen,
}: {
  auswirkungen: Auswirkungen;
}) {
  return (
    <Answer
      heading={digitalDocumentation.brandenburg.auswirkungen.textField.label}
      answers={[
        { prefix: summary.answerPrefix, answer: auswirkungen.content },
      ]}
    />
  );
}

function PrincipleContent({
  principle,
  prinzip,
}: {
  principle: Principle;
  prinzip: PrinzipWithAspekte;
}) {
  return (
    <>
      <Answer
        heading={summary.principleAnswerTitle}
        answers={[{ prefix: summary.answerPrefix, answer: principle.answer }]}
      />
      {isArray(principle.reasoning) ? (
        <AspectsContent reasoning={principle.reasoning} prinzip={prinzip} />
      ) : (
        <Answer
          heading={summary.reasonPrefix}
          answers={[
            { prefix: summary.answerPrefix, answer: principle.reasoning },
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
  reasoning: PrincipleReasoning[];
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

export default function DocumentationSummary() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useOutletContext<NavigationContext>();

  const { documentationData } = useDocumentationData();
  const { currentState } = useFederalState();

  const brandenburgItems: InfoBoxProps[] =
    currentState === "brandenburg"
      ? [
          createInfoBoxItem({
            route: ROUTE_DOCUMENTATION_ERFORDERLICHKEIT,
            content: documentationData.erforderlichkeit?.content ? (
              <ErforderlichkeitContent
                erforderlichkeit={documentationData.erforderlichkeit}
              />
            ) : null,
          }),
          createInfoBoxItem({
            route: ROUTE_DOCUMENTATION_ZWECKMAESSIGKEIT,
            content: documentationData.zweckmaessigkeit?.content ? (
              <ZweckmaessigkeitContent
                zweckmaessigkeit={documentationData.zweckmaessigkeit}
              />
            ) : null,
          }),
          createInfoBoxItem({
            route: ROUTE_DOCUMENTATION_AUSWIRKUNGEN,
            content: documentationData.auswirkungen?.content ? (
              <AuswirkungenContent
                auswirkungen={documentationData.auswirkungen}
              />
            ) : null,
          }),
        ]
      : [];

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
    ...brandenburgItems,
    ...prinzips.map((prinzip, index) => {
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
      const displayNumber = index + 1;
      return createInfoBoxItem({
        route: principleRoute,
        content:
          principleFormData && principleFormData.answer ? (
            <PrincipleContent principle={principleFormData} prinzip={prinzip} />
          ) : null,
        badge: {
          text: `${summary.principleBadge} ${displayNumber}`,
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
      <RichText
        markdown={
          currentState === "brandenburg" ? brandenburg.summary.text : summary.text
        }
      />
      <InfoBoxList className="space-y-40" items={items} />

      <DocumentationActions previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  );
}
