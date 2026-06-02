import {
  dokumentation_bewertungRechtlich,
  dokumentation_verbindlicheAnforderungen,
  dokumentation_zusammenfassung,
} from "@/config/routes.ts";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import SkipNoticeWrapper from "~/routes/dokumentation/interoperability/SkipNoticeWrapper.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import BindingRequirementsForm from "./dokumentation/interoperability/BindingRequirementsForm";

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${dokumentation_verbindlicheAnforderungen.title}`}
      />
      <div className="space-y-40">
        <div className={"space-y-8"}>
          <p className={"ds-subhead"}>EU-Interoperabilität</p>
          <Heading
            text={dokumentation_verbindlicheAnforderungen.title}
            tagName="h1"
            look="ds-heading-02-reg"
            className="mb-16"
          />
        </div>
        <SkipNoticeWrapper>
          <BindingRequirementsForm
            nextUrl={dokumentation_bewertungRechtlich.path}
          />
        </SkipNoticeWrapper>

        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl ?? dokumentation_zusammenfassung.path}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
