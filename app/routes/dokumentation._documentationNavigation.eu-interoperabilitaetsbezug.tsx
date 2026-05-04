import { useOutletContext } from "react-router";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import {
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_INTEROPERABILITY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";
import EuInteroperabilityQuestions from "./dokumentation/EuInteroperabilityQuestions";

export default function DocumentationEuInteroperabilityRequirements() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}`}
      />
      <div className="space-y-40">
        <Heading
          text={ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.title}
          tagName="h1"
          look="ds-heading-02-reg"
          className="mb-16"
        />
        <RichText
          markdown={dedent`
          In den folgenden Fragen geht es darum, festzustellen, ob für Ihr Regelungsvorhaben nach [Artikel 3 der Verordnung für ein interoperables Europa (EU) 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903(https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903#art_3) eine Interoperabilitätsbewertung durchgeführt werden muss.
                    
          [Mehr zu EU-Interoperabilität](${ROUTE_INTEROPERABILITY.url})
        `}
        />
        <EuInteroperabilityQuestions />
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
