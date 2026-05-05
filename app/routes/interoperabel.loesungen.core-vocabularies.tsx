import { interoperabel_loesungen_coreVocabularies } from "@/config/routes";
import {
  CheckOutlined,
  InfoOutlined,
  LayersOutlined,
} from "@digitalservicebund/icons";
import React from "react";
import AccordionItem from "~/components/AccordionItem";
import Badge from "~/components/Badge.tsx";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import { InteroperableSolutionBanner } from "~/components/InteroperableSolutionBanner.tsx";
import NewTabLink from "~/components/NewTabLink.tsx";
import RichText from "~/components/RichText";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import Timeline from "~/components/Timeline";
import SidebarContainer from "~/layout/SidebarContainer.tsx";
import { directLinks } from "~/routes/interoperabel/UeberblickTab.tsx";
import { dedent } from "~/utils/dedentMultilineStrings";
import { slugify } from "~/utils/utilFunctions.ts";

const sections = {
  einfuehrung: {
    id: "einfuehrung",
    title: "Einführung",
  },
  erklaerung: {
    id: "erklaerung",
    title: "Erklärung",
  },
  umsetzung: {
    id: "umsetzung",
    title: "Umsetzung",
  },
  beispiele: {
    id: "beispiele",
    title: "Beispiele",
  },
  ressourcen: { id: "ressourcen", title: "Ressourcen" },
};

function ChapterBadge({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Badge look={"hint"} Icon={LayersOutlined}>
      {children}
    </Badge>
  );
}

export default function InteroperableSolutionsDcatAp() {
  return (
    <>
      <main>
        <div className="breakout-grid-toc space-y-16 bg-blue-100 pt-40 pb-48">
          <h1>{interoperabel_loesungen_coreVocabularies.title}</h1>
          <p className="ds-subhead">
            Die grenzüberschreitende Datensprache für das Once-Only-Prinzip
          </p>
        </div>

        <InteroperableSolutionBanner />

        <SidebarContainer
          className={"space-y-80"}
          sidebar={
            <ToC title={"Inhalt"} selector="section[id]">
              <ToC.List className="list-unstyled list-none">
                {Object.entries(sections).map(([key, { id, title }]) => (
                  <ToC.Item key={key} href={`#${slugify(id)}`} title={title} />
                ))}
              </ToC.List>
            </ToC>
          }
        >
          <section
            id={sections.einfuehrung.id}
            className={"mt-80 scroll-my-40 space-y-40"}
          >
            <div className="space-y-8">
              <ChapterBadge>{sections.einfuehrung.title}</ChapterBadge>
              <h2>Betrifft mich dieses Thema als Legist oder Legistin?</h2>
              <p>
                Wenn Ihr Regelungsvorhaben die Erfassung, die Verarbeitung oder
                den Austausch von zentralen Verwaltungsinformationen (wie
                beispielsweise Daten zu Personen, Unternehmen, Standorten oder
                öffentlichen Dienstleistungen) vorgibt, sieht der Interoperable
                Europe Act (IEA) vor, dass Sie die Nutzung der sogenannten Core
                Vocabularies nach Art. 7 (EU) 2024/903 als „Lösung für ein
                interoperables Europa“ in Ihrem Regelungsvorhaben prüfen.
              </p>
            </div>

            <p>
              <strong>Warum?</strong>
              <br />
              Im Rahmen des Digitalchecks und der Interoperabilitätsbewertung
              klären Sie, ob Ihr Vorhaben die nahtlose und automatisierte
              grenzüberschreitende Verarbeitung von Daten im Vollzug fördert.
            </p>
            <InfoBox
              visual={{
                type: "icon",
                Icon: InfoOutlined,
                className: "size-48 fill-blue-700",
              }}
            >
              <p>
                Wenn Ihr Vorhaben{" "}
                <strong className="text-red-800">keinen Bezug</strong> dazu hat,
                ist diese Seite für Sie derzeit nicht zwingend
                handlungsrelevant.
              </p>
            </InfoBox>
            <InfoBox
              visual={{
                type: "icon",
                Icon: CheckOutlined,
                className: "size-48 fill-blue-700",
              }}
            >
              <p>
                Sofern Ihr Vorhaben{" "}
                <strong className="text-green-800">Bezug hat</strong>, finden
                Sie auf dieser Seite Unterstützung für diesen Arbeitsschritt zur
                Erarbeitung Ihrer Regelung. Lesen Sie hier weiter:
              </p>
            </InfoBox>
            <InfoBox
              heading={{ text: "Auf einen Blick" }}
              className="rounded-sm bg-blue-100"
              look="method"
            >
              <ul className="space-y-32">
                <li>
                  <strong>Was sind Core Vocabularies?</strong> Core Vocabularies
                  sind vereinfachte, wiederverwendbare und erweiterbare
                  &quot;Austausch-Sprache&quot;, welche die grundlegenden
                  Merkmale einer Daten-Entität kontextneutral erfassen. Sie
                  dienen als standardisierte Basisbausteine für europäische
                  digitale Dienste.
                </li>
                <li>
                  <strong>Warum ist das wichtig?</strong> Um die reibungslose
                  Kommunikation zwischen Behörden zu gewährleisten, schlagen
                  diese Modelle eine Brücke zwischen länderübergreifend
                  unterschiedlich lautenden Begriffsdefinitionen. So werden
                  semantische Interoperabilitätskonflikte gelöst und damit
                  Datenabgleiche zwischen Registern (z.B. verschiedener Länder)
                  ermöglicht, ohne, dass verschiedene Register jeweils verändert
                  werden müssen.
                </li>
                <li>
                  <strong>Was kostet mich das?</strong> Für Sie als Legistin
                  oder Legist bedarf es lediglich einer verankerten Vorgabe in
                  Ihrem Regelungsvorhaben. Die technische Ausgestaltung obliegt
                  dem IT-Vollzug.
                </li>

                <li>
                  <strong>Wo gibt es Hilfe?</strong> Beim DigitalService /
                  Nationale Kontaktstelle für Interoperabilität.
                </li>
              </ul>
            </InfoBox>
          </section>

          <section
            className="scroll-my-40 space-y-8"
            id={sections.erklaerung.id}
          >
            <ChapterBadge>{sections.erklaerung.title}</ChapterBadge>
            <h2>Worum geht es bei Core Vocabularies genau?</h2>
            <p>
              Regelungsvorhaben im Bereich der Verwaltungsdigitalisierung (wie
              das OZG oder die Umsetzung der europäischen Single Digital Gateway
              Verordnung) fordern häufig das sogenannte <i>Once-Only-Prinzip</i>{" "}
              – also die nur einmalige Erfassung von Daten. Als Legistin oder
              Legist fragen Sie sich im Digitalcheck: Wie stellen wir sicher,
              dass dieses Prinzip auch grenzüberschreitend technisch umsetzbar
              ist? Durch die Einbindung von Core Vocabularies in nationale
              Standards legen Sie die Grundlage dafür.
            </p>
            <p>
              Core Vocabularies fungieren als universelles „Puzzleteil“, das den
              Datenaustausch zwischen verschiedenen administrativen Systemen
              harmonisiert. Anstatt für jede Schnittstelle eigene
              Übersetzungsregeln zu definieren, einigen sich Behörden auf
              definierte Kern-Attribute (wie etwa Firmenname offiziell,
              Handelsregisternummer oder Unternehmensform). Wenn alle
              angebundenen Systeme dieses einheitliche Vokabular nutzen, können
              Informationen problemlos ausgetauscht, maschinenlesbar verarbeitet
              und ohne Informationsverlust verstanden werden.
            </p>
            <DetailsSummary title="Für welche Bereiche gibt es Core Vocabularies?">
              <RichText
                markdown={dedent`
              - **Core Person:** Für grundlegende Informationen über natürliche
                Personen, wie Name, Geburtsdatum und Geschlecht.
              
              - **Core Business:** Zur eindeutigen Identifizierung und Beschreibung
                von Unternehmen und juristischen Personen.
              
              - **Core Location:** Für geografische Daten, Adressen und Standorte.
              
              - **Core Public Service (CPSV-AP):** Ein Modell zur Beschreibung
                öffentlicher Dienstleistungen, das es Bürgern und Unternehmen
                erleichtert, diese zu finden und zu verstehen.
              
              - **Core Public Organisation:** Zur Beschreibung der Struktur und der
                Zuständigkeiten von Behörden und öffentlichen Stellen.
              
              - **Core Criterion and Core Evidence Vocabulary (CCCEV):** Wird
                insbesondere im öffentlichen Beschaffungswesen genutzt, um Kriterien
                und die dazugehörigen Belege abzubilden.
                
                Mehr Informationen zu den einzelnen Core Vocabularies finden Sie
                [hier](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/core-vocabularies).
  `}
              />
            </DetailsSummary>
            <table className="dc-comparison-table mt-64 [&_td:nth-child(2)]:bg-blue-200">
              <thead>
                <tr>
                  <th scope="col">Deutsches Register</th>
                  <th scope="col">Core Business Vocabularies</th>
                  <th scope="col">Spanisches Register</th>
                  <th scope="col">Erläuterung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Firmenname offiziell</td>
                  <td>legalName</td>
                  <td lang="es">Nombre legal</td>
                  <td>
                    Beide Systeme verstehen, dass hier der Firmenname erfasst
                    wird.
                  </td>
                </tr>
                <tr>
                  <td>HRB-Nummer</td>
                  <td>registration</td>
                  <td>Reg_Id</td>
                  <td>
                    Die Registernummern werden eindeutig zugeordnet, egal wie
                    sie lokal heißen.
                  </td>
                </tr>
                <tr>
                  <td>Unternehmensform</td>
                  <td>legalForm</td>
                  <td lang="es">Tipo Juridico</td>
                  <td>
                    Verhindert Missverständnisse bei Rechtsformen (z. B. GmbH
                    vs. SARL).
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section
            className="scroll-my-40 space-y-8"
            id={sections.umsetzung.id}
          >
            <ChapterBadge>{sections.umsetzung.title}</ChapterBadge>
            <h2>So stellen Sie die Nutzung sicher</h2>
            <p>
              Fragen Sie sich als Legistin oder Legist im Vorfeld des Vollzugs:
              Wie stellen wir sicher, dass Daten aus diesem Regelungsvorhaben
              reibungslos mit anderen europäischen Registern interagieren
              können?
            </p>
            <p>
              Integrieren Sie bereits im Gesetzentwurf die Maßgabe zur Nutzung
              standardisierter Datenmodelle. Damit schaffen Sie die rechtliche
              Grundlage dafür, dass die spätere technische Umsetzung zwingend
              nach den Core Vocabularies erfolgt, um die EU-weite semantische
              Interoperabilität zu garantieren.
            </p>
            <div>
              <AccordionItem
                headline={"Wann ist eine Ausnahme zulässig?"}
                className={"mt-40"}
              >
                <p>
                  Der Interoperable Europe Act (IEA) sieht vor, dass die Nutzung
                  von Standards wie DCAT-AP in begründeten Fällen abgelehnt
                  werden kann. Prüfen Sie folgende Punkte:
                </p>
                <ul>
                  <li>
                    <strong>Sicherheit & Geheimhaltung:</strong> Erfordert die
                    Struktur der Daten die Preisgabe von Informationen, die den
                    Staats- oder Datenschutz gefährden?
                  </li>
                  <li>
                    <strong>Rechte Dritter:</strong> Verhindern Lizenzen die
                    Nutzung dieser offenen Standards?
                  </li>
                  <li>
                    <strong>Unverhältnismäßigkeit:</strong> Übersteigt der
                    Aufwand für die Anpassung von etablierten Altsystemen (sog.
                    Legacy-Systemen) den Nutzen für den grenzüberschreitenden
                    digitalen Binnenmarkt deutlich?
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem
                headline={
                  "Wie verknüpfe ich Datenfelder mit Core Vocabularies?"
                }
              >
                <div className={"space-y-8"}>
                  <p>
                    Als Hilfsmittel für die Informationsmodellierung verwenden
                    Sie eine gemeinsame Tabelle mit nachgelagerter Behörde und
                    IT-Diensleister.
                  </p>
                  <p>
                    Eine solche Tabelle hilft Ihnen, gemeinsam mit
                    nachgelagerter Behörde und IT-Diensleister, die Datenfelder
                    des deutschen Dienstes mit den passenden Begriffen aus den
                    Core Vocabularies zu verknüpfen. Im Folgenden ein Beispiel:
                  </p>
                  <table className="dc-comparison-table mt-40">
                    <thead>
                      <tr>
                        <th scope="col">Ihr Begriff (im Gesetz/Formular)</th>
                        <th scope="col">Feld im Core Location Vocabulary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Firmenname</td>
                        <td>legalName</td>
                      </tr>
                      <tr>
                        <td>Vollständige Anschrift</td>
                        <td>fullAddress</td>
                      </tr>
                      <tr>
                        <td>Straße & Hausnummer</td>
                        <td>thoroughfare</td>
                      </tr>
                      <tr>
                        <td>Postleitzahl</td>
                        <td>postCode</td>
                      </tr>
                      <tr>
                        <td>Stadt</td>
                        <td>postName</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
            </div>
            <Timeline className={"mt-80"}>
              <Timeline.Item bullet>
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3" className="ds-heading-03-reg">
                    Schritt 1: Bedarf & Prüfung (Ihre Domäne)
                  </Heading>
                  <p>
                    Nutzen Sie den Digitalcheck, um den Regelungsbedarf zu
                    evaluieren: Formulieren Sie das Ziel (z. B.: „Bürgerinnen
                    und Bürger sollen ihren Wohnsitz EU-weit online ummelden
                    können”). Dazu identifizieren Sie, welche Angaben dafür im
                    Prozess nötig sind (Name, alte Adresse, neue Adresse).
                    Halten Sie dazu Rücksprache mit den nachgelagerten Behörden.
                    Identifizieren Sie, welche Datenobjekte betroffen sind. Sind
                    dies Kerninformationen zu Personen, Organisationen, Orten
                    oder öffentlichen Diensten, sind die Core Vocabularies als
                    „Lösung für ein interoperables Europa” nach Art. 7 (EU)
                    2024/903) als Standard heranzuziehen.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>

              <Timeline.Item bullet>
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3" className="ds-heading-03-reg">
                    Schritt 2: Technische Vorgabe
                  </Heading>
                  <p>
                    Sie legen im Entwurf fest, dass für die Strukturierung der
                    Datenobjekte die entsprechenden{" "}
                    <strong>Core Vocabularies</strong> als Grundlage zu nutzen
                    sind. Der IT-Vollzug setzt dies im Nachgang technisch um.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
              <Timeline.Item>
                <RichText
                  markdown={dedent`
                Übermitteln Sie vor der Entscheidung über den Entwurf eine
                [Interoperabilitätsbewertung](${directLinks.assessment}),
                falls erforderlich.
                `}
                />
              </Timeline.Item>

              <Timeline.Item bullet>
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3" className="ds-heading-03-reg">
                    Schritt 3: Der Dienst geht live
                  </Heading>
                  <p>
                    Sobald der Dienst live geht, können die Systeme Dank der
                    Core Vocabularies Daten mit anderen Behörden austauschen,
                    weil die Dienste „dieselbe Sprache” sprechen. Mit der
                    konzeptionellen Ausrichtung auf die Core Vocabularies
                    gewährleisten Sie im Vollzug Ihrer Regelung semantische
                    Konsistenz für den Datenaustausch.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>
            </Timeline>
          </section>
          <section
            className="scroll-my-40 space-y-8"
            id={sections.beispiele.id}
          >
            <ChapterBadge>{sections.beispiele.title}</ChapterBadge>
            <h2>
              Semantic Core Vocabularies in Anwendung bei bestehenden Gesetzen
              und Richtlinien
            </h2>
            <p>
              Hier finden Sie Referenzfälle, die Core Vocabularies zur
              Sicherstellung der EU-weiten Interoperabilität von Datensätzen
              nutzen:
            </p>
            <div className={"mt-40"}>
              <AccordionItem
                headline={
                  "XHochschule - Grenzüberschreitender Austausch von Bildungsnachweisen"
                }
              >
                {dedent`
                Der nationale Standard [„XHochschule"](https://www.xhochschule.de/web/vorgehen) (ein Standard der
                Koordinierungsstelle für IT-Standards, KoSIT, für das Hochschulwesen)
                bindet explizit das [Core Location Vocabulary](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/core-location-vocabulary) als externes Datenschema
                ein, um die Single-Digital-Gateway-Verordnung (SDG-VO) der EU zu erfüllen.
                Zudem wurden grundlegende deutsche Datenmodelle, wie der XÖV-Standard
                „Natürliche Person", bereits strukturell auf die Core Vocabularies
                abgebildet, um Kompatibilität sicherzustellen.
                Das genutzte Core Vocabulary heißt: [Core Person Vocabulary](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/core-person-vocabulary).
                
                **Beispiel:** Eine Studentin aus Spanien möchte sich an einer deutschen Universität
                für einen Masterstudiengang bewerben. Bislang bedeutet dies oft:
                Beglaubigte Kopien anfertigen, Zeugnisse übersetzen lassen und Dokumente
                per Post verschicken. Wenn man diesen Prozess digitalisieren möchte,
                reicht es nicht, einfach ein PDF zu versenden. Das deutsche
                Campus-Management-System muss die Datenfelder (z. B. "Nombre", "Fecha
                de nacimiento") aus dem spanischen System fehlerfrei den deutschen
                Feldern ("Vorname", "Geburtsdatum") zuordnen können, um die
                Bewerbung automatisch zu verarbeiten.
                
                **Wem nützt das?**
                
                - **Bürgerinnen und Bürgern:** Wenn sich Studierende mit ihren digitalen
                  Zeugnissen und Bildungsnachweisen im europäischen Ausland an
                  Universitäten bewerben, können die dortigen Campus-Management-Systeme
                  die Identitätsdaten dank des Core-Standards sofort semantisch korrekt
                  interpretieren.
                
                - **Institutionen:** Den Hochschulen und Verwaltungen nützt dies
                  ebenfalls. Sie sparen durch den Standard enorme zeitliche Ressourcen
                  ein, da ausländische Nachweise künftig digital automatisiert
                  ausgelesen werden können, statt sie manuell und aufwendig prüfen oder
                  übersetzen zu müssen.
                `}
              </AccordionItem>
              <AccordionItem
                headline={
                  <>
                    <NewTabLink
                      to={
                        "https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/blog/2017/09/19/533365899/Business+Register+Interconnection+System+BRIS"
                      }
                    >
                      BRIS
                    </NewTabLink>{" "}
                    (Business Registers Interconnection System)
                  </>
                }
              >
                <RichText
                  markdown={dedent`
                Wenn Sie als Legistin oder Legist eine Regelung erarbeiten, die die
                Überprüfung von Unternehmen vorschreibt – etwa bei der Vergabe
                öffentlicher Aufträge, bei der Vergabe von Fördermitteln oder der
                Geldwäscheprävention – stehen die ausführenden Behörden europaweit oft
                vor einer semantischen Herausforderung. Ein deutsches Fachverfahren kann
                beispielsweise nicht ohne Weiteres maschinell auslesen, ob die
                Datenfelder im italienischen „Registro delle Imprese" exakt denselben
                rechtlichen Status abbilden wie das deutsche Handelsregister. Die Folge:
                Der digitale Prozess bricht ab, ausländische Registerauszüge müssen von
                Sachbearbeitenden händisch angefordert, geprüft oder sogar übersetzt
                werden.
                
                Die Europäische Kommission nutzt das [Core Business Vocabulary](https://interoperable-europe.ec.europa.eu/collection/registered-organization-vocabulary/solution/core-business-vocabulary) für die
                europaweite Systemvernetzung von Handelsregistern.
                
                **Wem nützt das?**
                
                - **Unternehmen,** die grenzüberschreitend agieren oder im Ausland
                  Niederlassungen gründen, profitieren von einem signifikant reduzierten
                  Bürokratieaufwand. Sie müssen ihre Unternehmensstammdaten nicht mehr
                  für jedes Land in einem neuen IT-Format aufbereiten.
                
                - **Europäische Justizverwaltungen und Registerbehörden:** Sie können
                  die Unternehmensdaten ausländischer Firmen medienbruchfrei,
                  automatisiert und rechtssicher abrufen. Das senkt den manuellen
                  Prüfaufwand erheblich und erschwert grenzüberschreitenden Betrug.

                `}
                />
              </AccordionItem>
            </div>
          </section>
          <section
            className="breakout space-y-40 bg-blue-100 py-80"
            id={sections.ressourcen.id}
          >
            <InfoBox look="white">
              <ChapterBadge>{sections.ressourcen.title}</ChapterBadge>
              <RichText
                className="[&_h3]:mt-24"
                markdown={dedent`
                ## Weitere Informationen im europäischen Rahmen
  
                Hier finden das offizielle Handbuch zur Nutzung von Core Vocabularies: [ISA Handbook for using Core Vocabularies](https://interoperable-europe.ec.europa.eu/sites/default/files/inline-files/ISA%20Handbook%20for%20using%20Core%20Vocabularies.pdf).
                
                Hier finden Sie die offizielle Seite der europäischen Lösung „Core
                Vocabularies" im Interoperable Europe Portal mit allen relevanten
                Hintergrundinformationen: [Core Vocabularies | Interoperable Europe
                Portal](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/core-vocabularies)

                Auf dem YouTube-Kanal von Interoperable Europe finden Sie zudem ein
                kurzes Einführungsvideo, das das Prinzip der harmonisierten
                Datenstrukturen ("universelle Puzzleteile") für den europäischen
                Datenaustausch anschaulich erklärt: [Catalogue of Services and CPSV-AP](https://www.youtube.com/watch?v=IE2UJCV2ggI)
              `}
              />
            </InfoBox>
          </section>
        </SidebarContainer>
      </main>
    </>
  );
}
