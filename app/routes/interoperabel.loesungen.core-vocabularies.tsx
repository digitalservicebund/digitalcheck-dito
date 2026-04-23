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
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import ToC from "~/components/TableOfContentsInteractive.tsx";
import Timeline from "~/components/Timeline";
import SidebarContainer from "~/layout/SidebarContainer.tsx";
import { ROUTE_INTEROPERABILITY_SOLUTIONS_CORE_VOCABULARIES } from "~/resources/staticRoutes.ts";
import { directLinks } from "~/routes/interoperabel/UeberblickTab.tsx";
import { dedent } from "~/utils/dedentMultilineStrings";
import { features } from "~/utils/featureFlags";
import getFeatureFlag from "~/utils/featureFlags.server";
import { slugify } from "~/utils/utilFunctions.ts";

export function loader() {
  if (!getFeatureFlag(features.showCoreVocabularies)) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Not found", { status: 404 });
  }
}

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
      <MetaTitle
        prefix={ROUTE_INTEROPERABILITY_SOLUTIONS_CORE_VOCABULARIES.title}
      />
      <main>
        <div className="breakout-grid-toc space-y-16 bg-blue-100 pt-40 pb-48">
          <h1>{ROUTE_INTEROPERABILITY_SOLUTIONS_CORE_VOCABULARIES.title}</h1>
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
              <p>Text</p>
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
                <li>TODO</li>

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
            <table className="mt-16 min-w-full overflow-auto [&_td]:w-2/9 [&_td:nth-child(4)]:w-1/3 [&_th,&_td]:px-6 [&_th,&_td]:py-3">
              <thead className="">
                <tr>
                  <th scope="col" className="bg-blue-400 text-left">
                    Deutsches Register
                  </th>
                  <th scope="col" className="bg-blue-200 text-left">
                    Core Business Vocabularies
                  </th>
                  <th scope="col" className="bg-blue-400 text-left">
                    Spanisches Register
                  </th>
                  <th scope="col" className={"w-1/3"}></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-100">
                  <td>Firmenname offiziell</td>
                  <td className="bg-blue-200">legalName</td>
                  <td lang="es">Nombre legal</td>
                  <td>
                    Beide Systeme verstehen, dass hier der Firmenname erfasst
                    wird.
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td>HRB-Nummer</td>
                  <td className="bg-blue-200">registration</td>
                  <td>Reg_Id</td>
                  <td>
                    Die Registernummern werden eindeutig zugeordnet, egal wie
                    sie lokal heißen.
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td>Unternehmensform</td>
                  <td className="bg-blue-200">legalForm</td>
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
            <DetailsSummary title={"Wann ist eine Ausnahme zulässig?"}>
              <p>
                Der Interoperable Europe Act (IEA) sieht vor, dass die Nutzung
                von Standards wie DCAT-AP in begründeten Fällen abgelehnt werden
                kann. Prüfen Sie folgende Punkte:
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
                  <strong>Unverhältnismäßigkeit:</strong> Übersteigt der Aufwand
                  für die Anpassung von etablierten Altsystemen (sog.
                  Legacy-Systemen) den Nutzen für den grenzüberschreitenden
                  digitalen Binnenmarkt deutlich?
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
            <DetailsSummary title="Als Hilfsmittel für die Informationsmodellierung verwenden Sie eine gemeinsame Tabelle mit nachgelagerter Behörde und IT-Diensleister.">
              <p>
                Eine solche Tabelle hilft Ihnen, gemeinsam mit nachgelagerter
                Behörde und IT-Diensleister, die Datenfelder des deutschen
                Dienstes mit den passenden Begriffen aus den Core Vocabularies
                zu verknüpfen.
              </p>
              <p>TODO</p>
            </DetailsSummary>
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
            <div>
              <AccordionItem
                headline={
                  "XHochschule - Grenzüberschreitender Austausch von Bildungsnachweisen"
                }
              >
                {dedent`
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
              
              Hier finden das offizielle Handbuch zur Nutzung von Core Vocabularies
              `}
              />
            </InfoBox>
          </section>
        </SidebarContainer>
      </main>
    </>
  );
}
