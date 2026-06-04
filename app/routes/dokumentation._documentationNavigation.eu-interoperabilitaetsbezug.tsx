import {
  dokumentation_verbindlicheAnforderungen,
  interoperabel,
} from "@/config/routes.ts";
import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton.tsx";
import MetaTitle from "~/components/Meta";
import NewTabLink from "~/components/NewTabLink.tsx";
import RichText from "~/components/RichText.tsx";
import EuInteroperabilityOutcomeForm from "~/routes/dokumentation/interoperability/EuInteroperabilityOutcomeForm.tsx";
import { IEAContactBanner } from "~/routes/dokumentation/interoperability/IEAContactBanner.tsx";
import { markdownLinkIEA } from "~/routes/dokumentation/interoperability/markdownLinkIEA.tsx";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const helpText = `
**Was bedeutet das?**

Sofern durch Ihre Regelung vorgesehen ist, dass Daten und Informationen zwischen
Verwaltungen von EU-Mitgliedsstaaten ausgetauscht werden, muss nach
${markdownLinkIEA({ article: 3, format: "long" })} in der Regel
eine Interoperabilitätsbewertung durchgeführt werden.`;

const secondaryHelpText = `
Sollte sich nach den Bestimmungen der Verordnung dennoch keine Verpflichtung zu einer Bewertung ergeben und Sie möchten auch keine frewillige Bewertung durchführen, wählen Sie die Option "Nein, es ist kein Bezug vorhanden".`;

export default function DocumentationEuInteroperabilityRequirements() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();
  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${dokumentation_verbindlicheAnforderungen.title}`}
      />
      <div className="space-y-40">
        <Heading
          text="Bezug zu EU-Interoperabilität"
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <p>
          Ergab die Vorprüfung Bezug zu EU-Interoperabilität?
          <HelpButton
            sectionId="bezug-interoperabilität"
            title={"Bezug zu EU-Interoperabilität"}
          >
            <RichText markdown={helpText} />
            <NewTabLink
              to={
                interoperabel.path +
                "?tab=hintergrund#verbindliche-anforderungen"
              }
            >
              Wann ist eine Interoperabilitäts-Bewertung verpflichtend?
            </NewTabLink>
            <RichText markdown={secondaryHelpText} className="mt-8" />
          </HelpButton>
        </p>

        <EuInteroperabilityOutcomeForm />

        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
          showSavingTip
        />

        <IEAContactBanner />
      </div>
    </>
  );
}
