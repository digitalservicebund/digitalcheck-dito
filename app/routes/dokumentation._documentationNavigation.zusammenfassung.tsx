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
import constructMetaTitle from "~/utils/metaTitle";

const { summary } = digitalDocumentation;

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION_SUMMARY.title);
}

export default function DocumentationSummary() {
  const items: InfoBoxProps[] = ROUTES_DOCUMENTATION_ORDERED.filter(
    (route) =>
      route.url !== ROUTE_DOCUMENTATION_SUMMARY.url &&
      route.url !== ROUTE_DOCUMENTATION_SEND.url,
  ).map((route) => ({
    identifier: route.url,
    heading: { text: route.title },
    children: (
      <Link
        to={route.url}
        className="text-link"
        aria-label={`${summary.buttonEdit.ariaLabelPrefix} ${route.title}`}
      >
        {summary.buttonEdit.text}
      </Link>
    ),
    look: "highlight",
    className: "bg-white",
  }));

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
