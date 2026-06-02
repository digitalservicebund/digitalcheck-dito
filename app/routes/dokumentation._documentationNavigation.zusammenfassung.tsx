import type { Route } from "@/config/routes";
import {
  dokumentation_beteiligungsformate,
  dokumentation_euInteroperabilitaetsbezug,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_verbindlicheAnforderungen,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import { type ReactNode } from "react";
import { Link } from "react-router";
import type { BadgeProps } from "~/components/Badge";
import Heading from "~/components/Heading";
import type { InfoBoxProps } from "~/components/InfoBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  BindingRequirementsData,
  DocumentationData,
  type Participation,
  type PolicyTitle,
  type Principle,
} from "~/routes/dokumentation/documentationDataSchema";
import type {
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.types";
import { slugify } from "~/utils/utilFunctions";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const {
  summary,
  principlePages: { radioOptions },
} = digitalDocumentation;

const createInfoBoxItem = ({
  route,
  heading,
  content,
  badge,
}: {
  route: Pick<Route, "title" | "path">;
  heading?: string;
  content?: ReactNode;
  badge?: BadgeProps;
}): InfoBoxProps => ({
  identifier: route.path,
  testId: route.path,
  heading: {
    text: heading ?? route.title,
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
        to={route.path}
        className="text-link mt-24 block"
        aria-label={`${route.title} ${summary.buttonEdit.ariaLabelSuffix}`}
      >
        {summary.buttonEdit.text}
      </Link>
    </div>
  ),
  look: "highlight",
  className: "bg-white sm:px-40",
});

function Answer({
  heading,
  answers,
}: Readonly<{
  heading?: string;
  answers: { prefix: string; answer?: string }[];
}>) {
  return (
    <div className="space-y-24">
      {heading && (
        <Heading tagName="h3" look="ds-subhead">
          {heading}
        </Heading>
      )}
      {answers
        .filter(({ answer }) => answer)
        .map(({ answer, prefix }) => (
          <div className="space-y-8" key={prefix + answer}>
            <Heading tagName="h4" className="ds-body-01-bold">
              {prefix}
            </Heading>
            <p>{answer}</p>
          </div>
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

function PolicyTitleContent({
  policyTitle,
}: Readonly<{ policyTitle: PolicyTitle }>) {
  const publicationAnswer =
    policyTitle.publicationDate || policyTitle.publicationLink;
  const publicationPrefix = policyTitle.publicationDate
    ? "Voraussichtliches Veröffentlichungsdatum"
    : "Link zum Referentenentwurf";

  return (
    <Answer
      answers={[
        {
          prefix: "Vorläufiger Arbeitstitel des Vorhabens",
          answer: policyTitle.title,
        },
        {
          prefix: "Ministerium / Organisation",
          answer: policyTitle.organization,
        },
        {
          prefix: publicationPrefix,
          answer: publicationAnswer,
        },
      ]}
    />
  );
}

function ParticipationContent({
  participation,
}: Readonly<{
  participation: Participation;
}>) {
  return (
    <>
      <Answer
        answers={[
          {
            prefix: "Auswirkungen auf Betroffene",
            answer: participation.formats,
          },
        ]}
      />
      <Answer
        answers={[
          {
            prefix: "Auswirkungen auf die Umsetzung",
            answer: participation.results,
          },
        ]}
      />
    </>
  );
}

function SimplifiedAspectsContent({
  explanation,
  aspects,
  prinzip,
  needsAspects,
}: Readonly<{
  explanation: Principle["reasoning"];
  aspects: Principle["aspects"];
  prinzip: PrinzipWithAspekte;
  needsAspects: boolean;
}>) {
  if ((needsAspects && (!aspects || aspects.length === 0)) || !explanation) {
    return (
      <InlineNotice
        look="missingOrIncomplete"
        heading={summary.warnings.incomplete}
      />
    );
  }
  return (
    <>
      {aspects?.length && (
        <div className="space-y-8">
          <Heading tagName="h4" className="ds-body-01-bold">
            Schwerpunkte
          </Heading>
          <div className="flex flex-wrap gap-16">
            {aspects.map((aspect) => {
              const aspekt = prinzip.Aspekte.find(
                (a) => slugify(a.Kurzbezeichnung) === aspect,
              );
              return (
                <span
                  key={aspect}
                  className="rounded-full border border-blue-400 bg-blue-400 px-16 py-6 text-sm font-medium"
                >
                  {aspekt ? aspekt.Kurzbezeichnung : aspect}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <Answer answers={[{ prefix: "Erläuterung", answer: explanation }]} />
    </>
  );
}

function PrincipleContent({
  principle,
  prinzip,
}: Readonly<{
  principle: Principle;
  prinzip: PrinzipWithAspekte;
  simplified?: boolean;
}>) {
  return (
    <>
      <Answer
        answers={[
          { prefix: "Wird dieses Prinzip erfüllt?", answer: principle.answer },
        ]}
      />

      <SimplifiedAspectsContent
        explanation={principle.reasoning}
        aspects={principle.aspects}
        prinzip={prinzip}
        needsAspects={principle.answer === radioOptions[0]}
      />
    </>
  );
}

function InteroperabilityContent({
  data,
}: Readonly<{ data: DocumentationData<"2"> }>) {
  if (!data.euInteroperabilityOutcome?.outcomeId) return null;
  const outcome =
    data.euInteroperabilityOutcome?.outcomeId === "REQUIRED" ? "Ja" : "Nein";
  return (
    <Answer
      answers={[
        {
          prefix: "Ergab die Vorprüfung Bezug zu EU-Interoperabilität?",
          answer: outcome,
        },
      ]}
    />
  );
}

function BindingRequirementSummary(
  bindingRequirements: BindingRequirementsData | undefined,
) {
  if (!bindingRequirements) return null;
  return bindingRequirements.requirements.map((bindingRequirement, index) => {
    return (
      <>
        {index > 0 && <hr className="text-gray-700" />}
        <div key={bindingRequirement.description}>
          <RequirementDetail requirement={bindingRequirement} />
        </div>
      </>
    );
  });
}

function createInteroperabilityInfoBoxItems(
  documentationData: DocumentationData<"2">,
): InfoBoxProps[] {
  const detailsRequired =
    documentationData.euInteroperabilityOutcome?.outcomeId === "REQUIRED";

  return [
    createInfoBoxItem({
      heading: "EU-Interoperabilität",
      route: dokumentation_euInteroperabilitaetsbezug,
      content: <InteroperabilityContent data={documentationData} />,
    }),
    detailsRequired &&
      createInfoBoxItem({
        heading: "Verbindliche Anforderungen",
        route: dokumentation_verbindlicheAnforderungen,
        content: BindingRequirementSummary(
          documentationData.bindingRequirements,
        ),
      }),
  ].filter(Boolean) as InfoBoxProps[];
}

export function DocumentationSummary() {
  const { routes, previousUrl, nextUrl, prinzips } =
    useDocumentationNavigation();
  const { documentationData } = useDocumentationDataService();

  const items: InfoBoxProps[] = [
    createInfoBoxItem({
      heading: "Informationen zum Regelungsvorhaben",
      route: dokumentation_regelungsvorhabenTitel,
      content: documentationData.policyTitle?.title ? (
        <PolicyTitleContent policyTitle={documentationData.policyTitle} />
      ) : null,
    }),
    createInfoBoxItem({
      route: dokumentation_beteiligungsformate,
      content:
        documentationData.participation &&
        (documentationData.participation.formats ||
          documentationData.participation.results) ? (
          <ParticipationContent
            participation={documentationData.participation}
          />
        ) : null,
    }),
    ...prinzips.map((prinzip) => {
      const principleRoute = routes
        .flatMap((route) => ("routes" in route ? route.routes : route))
        .find((route) => route.path.endsWith(prinzip.URLBezeichnung));
      if (!principleRoute)
        throw new Error(
          `Cannot find route for principle ${prinzip.URLBezeichnung}`,
        );
      const principleFormData = documentationData.principles?.find(
        (principle) => principle.id === prinzip.documentId,
      ) as Principle;
      const editRoute = principleFormData?.answer
        ? { ...principleRoute, path: `${principleRoute.path}/erlaeuterung` }
        : principleRoute;
      return createInfoBoxItem({
        route: editRoute,
        content: principleFormData?.answer ? (
          <PrincipleContent principle={principleFormData} prinzip={prinzip} />
        ) : null,
        badge: {
          text: `Prinzip ${prinzip.order}`,
          principleNumber: prinzip.Nummer,
        },
      });
    }),
    ...createInteroperabilityInfoBoxItems(
      documentationData as DocumentationData<"2">,
    ),
  ];

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${dokumentation_zusammenfassung.title}`}
      />
      <Heading
        text={summary.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={summary.text} />
      <InfoBoxList className="space-y-40">
        {items.map((item, i) => (
          <InfoBox key={item.identifier ?? i} {...item} />
        ))}
      </InfoBoxList>
      <DocumentationActions previousUrl={previousUrl} nextUrl={nextUrl} />
    </>
  );
}

export default function Route() {
  return <DocumentationSummary />;
}

// Astro page export
import { DocumentationPageShell } from "@/components/dokumentation/DocumentationPageShell";
import RequirementDetail from "~/routes/dokumentation/interoperability/RequirementDetail.tsx";

export function ZusammenfassungPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationSummary />
    </DocumentationPageShell>
  );
}
