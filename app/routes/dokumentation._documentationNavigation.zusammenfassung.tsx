import { useEffect, useState } from "react";
import { Link } from "react-router";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { PrincipleNumber } from "~/resources/constants";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { principles } from "~/resources/content/shared/prinzipien";
import {
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_ORDERED,
} from "~/resources/staticRoutes";
import {
  type DocumentationData,
  getDocumentationData,
} from "~/routes/dokumentation/documentationDataService";

const { summary } = digitalDocumentation;

export default function DocumentationSummary() {
  const [documentationData, setDocumentationData] =
    useState<DocumentationData | null>(null);

  useEffect(() => {
    setDocumentationData(getDocumentationData());
  }, []);

  const items: InfoBoxProps[] = ROUTES_DOCUMENTATION_ORDERED.filter(
    (route) =>
      route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
      route.url !== ROUTE_DOCUMENTATION_SEND.url,
  ).map((route) => {
    const documentationStep =
      documentationData?.steps.find((step) => step.id === route.url) || null;
    const principle = principles.find((principle) =>
      route.url.endsWith(principle.id),
    );
    return {
      identifier: route.url,
      testId: route.url,
      badge: principle && {
        text: summary.principleBadge,
        principleNumber: principle.number as PrincipleNumber,
      },
      heading: {
        text: principle ? principle.headline : route.title,
      },
      children: (
        <div className="space-y-28">
          {documentationStep?.items.length ? (
            <>
              {documentationStep.items.map((item, index) => (
                <div key={`${documentationStep.id}-${index}`}>
                  <p className="font-bold">{item.key}</p>
                  <p>{item.value}</p>
                </div>
              ))}
              <Link
                to={route.url}
                className="text-link"
                aria-label={`${route.title} ${summary.buttonEdit.ariaLabelSuffix}`}
              >
                {summary.buttonEdit.text}
              </Link>
            </>
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
    };
  });

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
    </>
  );
}
