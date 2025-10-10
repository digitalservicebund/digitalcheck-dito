import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
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
} from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import {
  DocumentationField,
  getDocumentationStep,
} from "./dokumentation/documentationDataService";

const { summary } = digitalDocumentation;

const getAnswers = (field: DocumentationField) =>
  Object.entries(field).map(([key, value], i) => (
    <div key={`${key}-${i}`}>
      <span className="block font-bold">{key}</span>
      <span className="block">
        {typeof value === "object"
          ? Array.isArray(value)
            ? value.map(getAnswers)
            : getAnswers(value)
          : value}
      </span>
    </div>
  ));

export default function DocumentationSummary() {
  const { routes, previousUrl, nextUrl } =
    useOutletContext<NavigationContext>();

  const [items, setItems] = useState<InfoBoxProps[]>([]);

  useEffect(() => {
    setItems(
      routes
        .flat()
        .filter(
          (route) =>
            route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
            route.url !== ROUTE_DOCUMENTATION_SEND.url,
        )
        .map((route) => {
          const documentationStep = getDocumentationStep(route.url);

          // TODO: get principle from strapi data
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
              text: route.title,
            },
            children: (
              <div className="space-y-28">
                {documentationStep?.items ? (
                  <>
                    {getAnswers(documentationStep.items)}
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
        }),
    );
  }, [routes]);

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
