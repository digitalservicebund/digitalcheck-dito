import Button, { LinkButton } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext.ts";
import { ROUTE_INTEROPERABILITY_SOLUTIONS_DCAT_AP } from "~/resources/staticRoutes.ts";

export const InteroperableLoesungenTab = () => {
  const showDCATAP = useFeatureFlag("showDCATAP");

  const solutions = [
    {
      title: "Semantic Core Vocabularies",
      text: "Die grenzüberschreitende Datensprache für das Once-Only-Prinzip",
      href: undefined,
    },
    {
      title: "Data Catalogue Vocabulary Application Profile (DCAT-AP)",
      text: "Der Metadatenstandard für Offene Daten und Transparenz (Data Catalogue Vocabulary Application Profile)",
      href: showDCATAP
        ? ROUTE_INTEROPERABILITY_SOLUTIONS_DCAT_AP.url
        : undefined,
    },
  ];

  return (
    <section className="space-y-40">
      <Heading tagName="h2" id="interoperable-loesungen">
        Lösungen für ein interoperables Europa
      </Heading>
      <p>
        <strong>Lösungen für ein interoperables Europa</strong> sind
        wiederverwendbare Standards, die es ermöglichen, dass
        Verwaltungseinheiten effizient und sicher Daten über Ländergrenzen
        hinweg austauschen können. So können digitale öffentliche Dienste – wie
        die gegenseitige Anerkennung von Diplomen oder den Austausch von
        Fahrzeugdaten – nahtlos und ohne bürokratische Hürden für Bürgerinnen
        und Bürger und Unternehmen angeboten werden.
      </p>
      <p>
        Der Gedanke hinter den Lösungen: <strong>nachnutzen</strong> vor{" "}
        <strong>neu beschaffen</strong> vor <strong>neu bauen</strong> (Re-use
        before buy before build). Statt das Rad neu zu erfinden, sollen
        Verwaltungen bewährte Lösungen nutzen.
        <br />
        Nicht nur IT-Komponenten können Lösungen sein, sondern z. B. auch
        Folgendes:
      </p>
      <ul className="font-bold">
        <li>rechtlichen Rahmenbedingungen</li>
        <li>organisatorische Prozesse</li>
        <li>semantische Standards (gemeinsames Datenverständnis)</li>
        <li>technische Anwendungen</li>
        <li>Quellcode</li>
      </ul>
      <p>
        Wenn Ihre Regelung Interoperabilitätsbezug hat, müssen Sie nun prüfen,
        ob eine „Lösung für ein interoperables Europa“ in Ihrem Kontext
        verwendet werden kann. Die Nicht-Verwendung muss kurz begründet werden.
      </p>
      <Heading tagName="h2">Diese Lösungen sind aktuell verfügbar</Heading>

      <InfoBoxSideBySide>
        {solutions.map(({ title, text, href }) => {
          return (
            <InfoBox
              key={title}
              look="method"
              badge={{ children: "Interoperable Lösungen", look: "hint" }}
              heading={{
                text: title,
                tagName: "h3",
                className: "ds-heading-03-bold",
              }}
            >
              <p>{text}</p>
              <ButtonContainer className="mt-auto pt-24">
                {href ? (
                  <LinkButton to={href} look="tertiary">
                    Mehr zu dieser Lösung
                  </LinkButton>
                ) : (
                  <Button type="button" look="tertiary" disabled>
                    Demnächst
                  </Button>
                )}
              </ButtonContainer>
            </InfoBox>
          );
        })}
      </InfoBoxSideBySide>
    </section>
  );
};
