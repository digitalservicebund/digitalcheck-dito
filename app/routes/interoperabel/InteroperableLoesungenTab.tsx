import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";

export function InteroperableLoesungenTab() {
  return (
    <>
      <Heading tagName="h2">Lösungen für ein interoperables Europa</Heading>
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
        ob eine "Lösung für einer interoperables Europa" in Ihrem Kontext
        verwendet werden kann. Die Nicht-Verwendung muss kurz begründet werden.
      </p>
      <Heading tagName="h2">Diese Lösungen sind aktuell verfügbar</Heading>

      <InfoBoxSideBySide>
        <InfoBox
          look="method"
          badge={{ children: "Interoperable Lösungen", look: "hint" }}
          heading={{
            text: "Semantic Core Vocabularies",
            tagName: "h3",
            className: "ds-heading-03-bold",
          }}
        >
          <p>Die grenzüberschreitende Datensprache für das Once-Only-Prinzip</p>
          <InfoBox.LinkList
            links={[
              {
                text: "Mehr zu dieser Lösung",
                to: "#",
                look: "tertiary",
              },
            ]}
          />
        </InfoBox>
        <InfoBox
          look="method"
          badge={{ children: "Interoperable Lösungen", look: "hint" }}
          heading={{
            text: "Data Catalogue Vocabulary Application Profile (DCAT-AP)",
            tagName: "h3",
            className: "ds-heading-03-bold",
          }}
        >
          <p>
            Der Metadatenstandard für Offene Daten und Transparenz (Data
            Catalogue Vocabulary Application Profile)
          </p>
          <InfoBox.LinkList
            links={[
              {
                text: "Mehr zu dieser Lösung",
                to: "#",
                look: "tertiary",
              },
            ]}
          />
        </InfoBox>
      </InfoBoxSideBySide>

      <div></div>
    </>
  );
}
