import { type ReactNode, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
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
  DocumentationData,
  Participation,
  PolicyTitle,
  Principle,
} from "~/routes/dokumentation/documentationDataSchema";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { getDocumentationData } from "./dokumentation/documentationDataService";

const { summary } = digitalDocumentation;

const createInfoBoxItem = ({
  route,
  content,
}: {
  route: Route;
  content?: ReactNode;
}): InfoBoxProps => ({
  identifier: route.url,
  testId: route.url,
  heading: {
    text: route.title,
  },
  children: (
    <div>
      {content ? (
        <div className="space-y-8">
          <div className="space-y-28">{content}</div>
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

const renderKeyValue = (key: string, value: string) => (
  <div>
    <span className="block font-bold">{key}</span>
    <span className="block">{value}</span>
  </div>
);

const renderPolicyTitle = (policyTitle?: PolicyTitle) => {
  if (!policyTitle) {
    return null;
  }
  return renderKeyValue(
    digitalDocumentation.info.inputTitle.label,
    policyTitle.title,
  );
};

const renderParticipation = (participation?: Participation) => {
  if (!participation) {
    return null;
  }
  return (
    <>
      {renderKeyValue(
        digitalDocumentation.participation.formats.heading,
        participation.formats,
      )}
      {renderKeyValue(
        digitalDocumentation.participation.results.heading,
        participation.results,
      )}
    </>
  );
};

const renderPrinciple = (principle?: Principle) => {
  if (!principle) {
    return null;
  }
  return (
    // TODO render aspects and paragraphs
    <>{renderKeyValue(summary.principleAnswerTitle, principle.answer)}</>
  );
};

export default function DocumentationSummary() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useOutletContext<NavigationContext>();
  const [documentationData, setDocumentationData] =
    useState<DocumentationData | null>(null);

  useEffect(() => {
    // data is fetches from localStorage which should only happen client-side, thus we use useEffect hook to set it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDocumentationData(getDocumentationData());
  }, []);

  if (!documentationData) {
    return null;
  }

  const items: InfoBoxProps[] = [
    createInfoBoxItem({
      route: ROUTE_DOCUMENTATION_TITLE,
      content: renderPolicyTitle(documentationData.policyTitle),
    }),
    createInfoBoxItem({
      route: ROUTE_DOCUMENTATION_PARTICIPATION,
      content: renderParticipation(documentationData.participation),
    }),
    ...prinzips.map((principleContent) => {
      const principleRoute = routes
        .flat()
        .find((route) => route.url.endsWith(principleContent.URLBezeichnung));
      if (!principleRoute)
        throw new Error(
          `Cannot find route for principle ${principleContent.URLBezeichnung}`,
        );
      const principleFormData = documentationData.principles?.find(
        (docPrinciple) => docPrinciple.id === principleContent.documentId,
      );
      return createInfoBoxItem({
        route: principleRoute,
        content: renderPrinciple(principleFormData),
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
