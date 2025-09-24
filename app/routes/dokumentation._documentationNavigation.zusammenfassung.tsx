import { Link } from "react-router";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTES_DOCUMENTATION_ORDERED,
} from "~/resources/staticRoutes";
import {
  createDocumentationData,
  type DocumentationStep,
  getDocumentationStep,
} from "~/routes/dokumentation/documentationDataService";
import constructMetaTitle from "~/utils/metaTitle";

const { summary } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION_SUMMARY.title);
}

export default function DocumentationSummary() {
  const dummyData: DocumentationStep[] = ROUTES_DOCUMENTATION_ORDERED.filter(
    (route) =>
      route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
      route.url !== ROUTE_DOCUMENTATION_SEND.url,
  ).map((route) => ({
    id: route.url,
    items: [
      { key: "foo", value: "bar" },
      { key: "foo", value: "bar" },
    ],
  }));

  createDocumentationData(dummyData);

  const items: InfoBoxProps[] = ROUTES_DOCUMENTATION_ORDERED.filter(
    (route) =>
      route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
      route.url !== ROUTE_DOCUMENTATION_SEND.url,
  ).map((route) => {
    const documentationStep = getDocumentationStep(route.url);
    return {
      identifier: route.url,
      heading: { text: route.title },
      children: (
        <>
          <div className="space-y-28">
            {documentationStep &&
              documentationStep.items.map((item, index) => (
                <div key={`${documentationStep.id}-${index}`}>
                  <p className="font-bold">{item.key}</p>
                  <p>{item.value}</p>
                </div>
              ))}
          </div>
          <Link
            to={route.url}
            className="text-link"
            aria-label={`${summary.buttonEdit.ariaLabelPrefix} ${route.title}`}
          >
            {summary.buttonEdit.text}
          </Link>
        </>
      ),
      look: "highlight",
      className: "bg-white",
    };
  });

  return (
    <>
      <Heading
        text={summary.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={summary.text} />
      <InfoBoxList className="ds-stack-40 mt-40" items={items} />
    </>
  );
}
