import { useOutletContext } from "react-router";
import Badge from "~/components/Badge.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import SkipNoticeWrapper from "~/routes/dokumentation/interoperability/SkipNoticeWrapper.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.title}`}
      />
      <div className="space-y-40">
        <div className={"space-y-8"}>
          <Badge look="hint">Rechtliche Interoperabilität</Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            Rechtliche Grundlage für den Datenaustausch schaffen
          </Heading>
        </div>
        <SkipNoticeWrapper>Content</SkipNoticeWrapper>
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl ?? ROUTE_DOCUMENTATION_SUMMARY.url}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
