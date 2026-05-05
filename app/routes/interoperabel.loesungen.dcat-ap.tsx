import { interoperabel_loesungen_dcatAp } from "@/config/routes";
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
import NewTabLink from "~/components/NewTabLink";
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

function ChapterBadge({ children }: { children: React.ReactNode }) {
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
          <h1>{interoperabel_loesungen_dcatAp.title}</h1>
          <p className="ds-subhead">
            Der Metadatenstandard für offene Daten und Transparenz.
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
                Wenn Ihr Regelungsvorhaben die Bereitstellung oder den Austausch
                von offenen Verwaltungsdaten (z.B. Berichte, Register,
                Statistiken) vorschreibt, dann sieht der Interoperable Europe
                Act (IEA) vor, dass Sie die Nutzung von DCAT-AP nach Art. 7 als
                &quot;Lösung für ein interoperables Europa&quot; in Ihrem
                Regelungsvorhaben prüfen.
              </p>
            </div>

            <p>
              <strong>Warum?</strong>
              <br />
              Im Rahmen des <strong>Digitalchecks</strong> und der{" "}
              <strong>Interoperabilitätsprüfung</strong> klären Sie, ob Ihr
              Vorhaben die EU-weite Auffindbarkeit von offenen Daten fördert.
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
                  <strong>Was ist DCAT-AP?</strong> DCAT-AP ist ein Standard für
                  die Beschreibung (nicht den Inhalt!) von offenen Datensätzen.
                  Der europäische Metadatenstandard hat ein deutsches Profil,
                  das DCAT-AP.de heißt. Es sorgt dafür, dass deutsche Spezifika
                  berücksichtigt werden – bei voller Kompatibilität zur EU. Der
                  IT-Planungsrat empfiehlt diesen Standard verbindlich für den
                  Austausch offener Verwaltungsdaten. Das deutsche Profil ist
                  frei verfügbar unter{" "}
                  <NewTabLink to={"https://www.dcat-ap.de"}>
                    www.dcat-ap.de
                  </NewTabLink>
                  .
                </li>
                <li>
                  <strong>Warum ist das wichtig?</strong> Damit Ihr Gesetz im
                  digitalen Zeitalter funktioniert und offene Daten für
                  Bürgerinnen und Bürger, Wirtschaft und Wissenschaft in der EU
                  auffindbar werden.
                </li>
                <li>
                  <strong>Was kostet mich das?</strong> Als Legist oder Legistin
                  nur einen Textbaustein in Ihrem Regelungsvorhaben. Die
                  technische Arbeit leisten dann die IT-Experten.
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
            <h2>Worum geht es bei DCAT-AP genau?</h2>
            <p>
              Stellen Sie sich vor, ein Startup möchte eine europaweite
              Wander-App entwickeln. Damit die App-Entwickler nicht mühsam
              tausende einzelne Behördenseiten in Spanien, Frankreich und
              Deutschland nach Geodaten durchsuchen müssen, brauchen sie eine
              zentrale Anlaufstelle.
            </p>
            <p>
              Hier hilft der Metadatenstandard DCAT-AP. Er funktioniert wie ein
              genormtes digitales Etikett, das jedem Datensatz angehängt wird.
              Er legt nicht fest, was in der Datei steht (z. B. die genauen
              Koordinaten einer Schutzhütte), sondern wie der Datensatz als
              Ganzes beschrieben wird (z. B. „Wanderwege Thüringen“,
              „Herausgeber: Forstamt“, „Letzte Aktualisierung: gestern“). Wenn
              alle Behörden dieses einheitliche Etikett nutzen, können Portale
              wie govdata.de (national) und data.europe.eu (EU-weit) die
              Informationen automatisch „ernten“ und an einer zentralen Stelle
              findbar machen.
            </p>
          </section>
          <section
            className="scroll-my-40 space-y-8"
            id={sections.umsetzung.id}
          >
            <ChapterBadge>{sections.umsetzung.title}</ChapterBadge>
            <h2>So stellen Sie die Nutzung sicher</h2>
            <p>
              Fragen Sie sich als Legist oder Legistin, wie stellen wir sicher,
              dass offene Verwaltungsdaten nicht in digitalen Silos
              verschwinden, sondern EU-weit gefunden werden?
            </p>
            <p>
              Integrieren Sie bereits im Gesetzentwurf eine klare Vorgabe zur
              Nutzung des Standards. Damit schaffen Sie die rechtliche
              Grundlage, dass die spätere technische Umsetzung zwingend nach
              DCAT-AP erfolgt, um die EU-weite Auffindbarkeit zu garantieren.
            </p>
            <DetailsSummary title={"Wann ist eine Ausnahme zulässig?"}>
              <p>
                Der Interoperable Europe Act (IEA) sieht vor, dass die Nutzung
                von Standards wie DCAT-AP in begründeten Fällen abgelehnt werden
                kann. Prüfen Sie folgende Punkte:
              </p>
              <ul>
                <li>
                  Sicherheit & Geheimhaltung: Enthält die Beschreibung des
                  Datensatzes (die „Katalogkarte“) Informationen, die aus
                  Gründen der öffentlichen Sicherheit oder des Datenschutzes
                  nicht veröffentlicht werden dürfen?
                </li>
                <li>
                  Rechte Dritter: Verhindern bestehende Lizenzen oder
                  Urheberrechte Dritter die Nutzung dieses offenen Standards?
                </li>
                <li>
                  Unverhältnismäßigkeit: Übersteigt der Aufwand für die
                  Umstellung eines bestehenden, isolierten Systems den Nutzen
                  für den grenzüberschreitenden digitalen Binnenmarkt deutlich?
                </li>
              </ul>
            </DetailsSummary>
            <Timeline>
              <Timeline.Item bullet>
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3" className="ds-heading-03-reg">
                    Schritt 1: Bedarf & Prüfung (Ihre Domäne)
                  </Heading>
                  <p>
                    Sie definieren das Ziel (z. B. „Umweltdaten vergleichbar
                    machen“). Nutzen Sie den <strong>Digitalcheck</strong>, um
                    zu prüfen: Führt das Gesetz neue Register oder Berichte ein,
                    die als offene Daten EU-weit auffindbar sein sollen? Lautet
                    die Antwort „Ja“, ist DCAT-AP der im Interoperable Europe
                    Act zu nutzende Standard.
                  </p>
                </Timeline.ItemContent>
              </Timeline.Item>

              <Timeline.Item bullet>
                <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                  <Heading tagName="h3" className="ds-heading-03-reg">
                    Schritt 2: Technische Vorgabe
                  </Heading>
                  <p>
                    Sie legen im Entwurf fest, dass für die Beschreibung der
                    Daten der Standard <strong>DCAT-AP.de</strong> zu nutzen
                    ist. IT-Experten setzen dies dann technisch um, indem sie
                    die Metadaten entsprechend strukturieren.
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
                    Sobald der Dienst live geht, werden die Daten automatisch
                    von nationalen und europäischen Portalen erkannt. Ihre
                    Regelung entfaltet maximale Wirkung, da die Daten ohne
                    manuellen Aufwand EU-weit gefunden werden.
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
              DCAT-AP in Anwendung bei bestehenden Gesetzen und Richtlinien
            </h2>
            <p>
              Hier finden Sie Referenzfälle und bestehende Gesetze, die DCAT-AP
              bereits erfolgreich nutzen, um die EU-weite Interoperabilität von
              Datensätzen sicherzustellen.
            </p>
            <div>
              <AccordionItem
                headline={"Open-Data-Gesetz & Datennutzungsgesetz (DNG)"}
              >
                {dedent`
                Mit der Umsetzung der EU-Richtlinie über offene Daten (2019/1024) wurde
                in Deutschland das Datennutzungsgesetz (DNG) geschaffen. Dieses
                verpflichtet die Verwaltung, hochwertige Datensätze (High-Value
                Datasets) in maschinenlesbaren Formaten bereitzustellen
                
                ### Warum reicht Maschinenlesbarkeit allein nicht aus?
                
                Damit diese Daten nicht nur lesbar, sondern auch
                EU-weit auffindbar und nutzbar sind, braucht es eine einheitliche
                Beschreibung -- das „digitale Etikett". Hier setzt der Standard DCAT-AP
                (in Deutschland: DCAT-AP.de) an:
                1. **Vom Datensatz zur Auffindbarkeit:** 
                Während das DNG
                die Qualität des Datensatzes (z. B. als CSV oder JSON) vorgibt, sorgt
                DCAT-AP für die semantische Interoperabilität der beschreibenden
                Metadaten.
                2. **Grenzüberschreitender Standard:** Durch den Standard DCAT-AP werden Datensätze
                automatisch zwischen lokalen, nationalen (govdata.de) und europäischen
                Portalen (data.europa.eu) synchronisiert.
                
                **EU-Empfehlung:** Als "Lösung für ein interoperables Europa"
                ist DCAT-AP die Brücke, die dafür sorgt, dass offene Verwaltungsdaten im
                gesamten europäischen Binnenmarkt ohne manuellen Aufwand gefunden werden
                können.
                
                **Wem nützt das?**
                
                1. Der Wirtschaft: Start-ups nutzen diese Daten für neue
                Geschäftsmodelle (z. B. Mobilitäts-Apps oder KI-Training).
                2. Der Verwaltung: Behörden finden Daten anderer Stellen schneller, was die
                Effizienz steigert und Doppelerhebungen vermeidet.
                3. Der Wissenschaft: Durch europaweit einheitliche Metadaten können
                Forschende hochwertige Verwaltungsdaten über Fach- und Ländergrenzen
                hinweg effizient identifizieren, automatisiert zusammenführen und als
                verlässliche Basis nachnutzen.`}
              </AccordionItem>
              <AccordionItem
                headline={
                  "Die INSPIRE-Richtlinie (Geodateninfrastruktur in Europa)"
                }
              >
                {dedent`
                Ein Meilenstein der rechtlich verankerten Interoperabilität. Die Richtlinie verpflichtete die
                Mitgliedstaaten, Geodaten (z. B. zu Schutzgebieten oder Gewässernetzen) interoperabel
                bereitzustellen.
                
                Da INSPIRE technisch sehr komplex war, wurde für die Auffindbarkeit der Daten in nationalen Katalogen
                und im [EU-Geoportal](https://inspire-geoportal.ec.europa.eu/srv/eng/catalog.search) eine
                Metadaten-Struktur genutzt, die heute in weiten Teilen mit DCAT-AP kompatibel ist oder darin aufgegangen
                ist, um eine sektorübergreifende Suche zu ermöglichen.
                
                **Warum man das braucht:** Umweltprobleme (wie Hochwasser oder Luftverschmutzung) halten sich nicht an
                Staatsgrenzen. Um eine europäische Strategie (z. B. den Green Deal) umzusetzen, müssen die Daten der
                Mitgliedstaaten technisch zueinander passen.
                
                **Wem nützt das?**
                - **Bürgerinnen und Bürgern:** Sie können sich grenzübergreifend über Umweltbelastungen informieren.
                - **Legistinnen und Legisten & Politik:** Sie erhalten eine verlässliche Datenbasis für grenzüberschreitende Infrastrukturprojekte und Klimaschutzmaßnahmen.
                `}
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
              
              Hier finden Sie die offizielle Seite der europäischen Lösung
                DCAT-AP im Interoperable Europe Portal mit allen
                Hintergrundinformationen zur EU-weiten Spezifikation:
              [DCAT Application Profile for data portals in Europe](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe)
              
              Hier finden Sie die [Einordnung von DCAT-AP in den Europäischen Interoperabilitätsrahmen (EIF)](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/eif-perspective)
              – diese Perspektive hilft Ihnen bei der fachlichen Begründung für die Interoperabilitätsbewertung.
              
              Auf dem Youtube-Kanal von Interoperable Europe finden Sie hier ein kurzes Einführungsvideo zu DCAT-AP: https://www.youtube.com/watch?v=EVsMeKBrAxg
              `}
              />
            </InfoBox>
          </section>
        </SidebarContainer>
      </main>
    </>
  );
}
