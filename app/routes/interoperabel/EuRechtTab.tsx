import FlagOutlined from "@digitalservicebund/icons/FlagOutlined";
import PlaylistAddCheckOutlined from "@digitalservicebund/icons/PlaylistAddCheckOutlined";
import SelectAllOutlined from "@digitalservicebund/icons/SelectAllOutlined";
import { ReactNode } from "react";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import ImageBox from "~/components/ImageBox";
import InfoBox from "~/components/InfoBox";
import RichText from "~/components/RichText";
import Separator from "~/components/Separator";
import ToC from "~/components/TableOfContentsInteractive";
import SidebarContainer from "~/layout/SidebarContainer";
import { dedent } from "~/utils/dedentMultilineStrings";
import customTwMerge from "~/utils/tailwindMerge";
import { slugify } from "~/utils/utilFunctions";

type TableLink = {
  title: string;
  href: string;
};
type TableContent = TableLink[];

type SectionInlineComponentProps = {
  batchTitle: string;
  batchIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  infoBoxTitle: string;
  className?: string;
  children: ReactNode;
};

function ContentInlineComponent({
  batchTitle,
  batchIcon,
  infoBoxTitle,
  className,
  children,
}: Readonly<SectionInlineComponentProps>) {
  return (
    <div className={customTwMerge(className, "space-y-16")}>
      <InfoBox
        className="bg-white"
        heading={{
          tagName: "h3",
          text: infoBoxTitle,
        }}
        badge={{
          look: "hint",
          text: batchTitle,
          Icon: batchIcon,
        }}
      ></InfoBox>
      <DetailsSummary title="Mehr dazu erfahren">{children}</DetailsSummary>
    </div>
  );
}

export function EuRechtTab() {
  const tableContent: TableContent = [
    { title: "Zusammenarbeit in der EU", href: "zusammenarbeit" },
    { title: "Zugang zu Diensten", href: "zugang" },
    { title: "Teilen von Daten und Informationen", href: "teilen" },
    { title: "Datenschutz", href: "datenschutz" },
    { title: "Technologien", href: "technologien" },
  ];

  return (
    <>
      <div className="space-y-40">
        <ImageBox
          zoomable={false}
          image={{
            className:
              "border-b-ds-gray-400 h-[500px] w-[848px] rounded-xs border-b px-8 py-16",
            url: "images/european-digital-single-market.png",
            caption:
              "Zusammenspiel europäischer Rechtsakte: Die Infografik zeigt, wie der Interoperable Europe Act und das EIF-Rahmenwerk mit weiteren zentralen Verordnungen des europäischen digitalen Binnenmarkts verzahnt sind.",
            alternativeText:
              "Infografik zum EU-Interoperabilitäts-Ökosystem: Sieben zentrale Rechtsakte (u. a. IEA, AI Act, DSGVO) sind kreisförmig um das Zentrum European Digital Single Market angeordnet. Die Grafik gruppiert diese in die Themenfelder Zusammenarbeit, Technologie & Datenschutz, Teilen von Daten sowie Zugang zu Diensten.",
          }}
        />
        <SidebarContainer
          sidebar={
            <ToC title={"Inhalt"} selector="section[id]">
              <ToC.List className="list-unstyled list-none">
                {tableContent.map((section) => (
                  <ToC.Item
                    key={section.href}
                    href={`#${slugify(section.href)}`}
                    title={section.title}
                  />
                ))}
              </ToC.List>
            </ToC>
          }
        >
          <div className="space-y-40">
            <div className="px-8 py-16">
              <Heading
                tagName="h2"
                id="angrenzendes-eu-recht"
                className="mb-40"
              >
                Angrenzendes EU-Recht
              </Heading>
              <p>
                Im Ökosystem der Interoperabilität spielen einige EU-Rechtsakte
                eine Rolle. So ist beispielsweise die Verordnung für ein
                interoperables Europa (EU) 2024/903 mit einem strategischen
                Leitfaden wie dem Europäischen Interoperabilitätsrahmen (EIF)
                verzahnt. Die folgende Übersicht fasst die zentralen Rechtsakte
                zusammen, die den digitalen Raum strukturieren und gibt Ihnen
                einen Überblick welche davon in Ihrem jeweiligen
                Regelungsbereich Relevanz haben könnten.
              </p>
            </div>
            <section>
              <section className="space-y-40">
                <Heading
                  tagName="h3"
                  className="font-bold"
                  id={tableContent[0].href}
                >
                  {tableContent[0].title}
                </Heading>
                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Verordnung für ein interoperables Europa"
                >
                  <RichText
                    markdown={dedent`
                  **Im Detail**: Verordnung (EU) 2024/903 des Europäischen Parlaments und des Rates vom 13. März 2024 über Maßnahmen für ein hohes Maß an Interoperabilität des öffentlichen Sektors in der Union | [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903).

                Was der Hintergrund der Verordnung ist, finden Sie auf der [Hauptseite](https://digitalcheck.bund.de/interoperabel) in dieser Sektion. Weitere Informationen finden Sie auf dem [Interoperable Europe Portal]() der Europäischen Kommission`}
                  ></RichText>
                </ContentInlineComponent>
                <ContentInlineComponent
                  batchTitle="Framework"
                  batchIcon={SelectAllOutlined}
                  infoBoxTitle="Europäischer Interoperabilitätsrahmen (EIF)"
                >
                  <RichText
                    markdown={dedent`
                  **Im Detail:** Der Europäische Interoperabilitätsrahmen | [Europäische Kommission](https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail)
                  
                  Könnte der Europäische Interoperabilitätsrahmen (EIF) für Ihr Regelungsvorhaben relevant sein?
                  Der Europäische Interoperabilitätsrahmen (EIF) ist ein Leitfaden für die Gestaltung offener, nutzerzentrierter und grenzüberschreitend nahtloser digitaler öffentlicher Dienste. Er bündelt 12 strategische Prinzipien und vier operative Ebenen, um den Datenaustausch und die Prozesskoordination zu ermöglichen. Unter der Verordnung für ein Interoperables Europa (EU) 2024/903 dient er als verbindliches Referenzinstrument für Interoperabilitätsbewertungen zur gezielten Beseitigung digitaler Barrieren.

                  **Rahmenbedingungen für EU-Maßnahmen:**
                  - Subsidiarität und Verhältnismäßigkeit: Entscheidungen sollen so bürgernah wie möglich getroffen werden; EU-Maßnahmen sind auf das notwendige Maß zur Erreichung der Ziele beschränkt.

                  **Kernprinzipien der Interoperabilität:**
                  - Offenheit: Open Data, Nutzung von Open-Source-Software und Bevorzugung offener Spezifikationen.
                  - Transparenz: Einblick in Verwaltungsprozesse und Bereitstellung von Schnittstellen für öffentliche Dienste.
                  - Wiederverwendbarkeit: Lösungen und Daten teilen, bestehende Lösungen nutzen, statt neu zu entwickeln.
                  - Technologische Neutralität und Datenübertragbarkeit: Dienste dürfen nicht von spezifischen Technologien abhängen; Daten müssen zwischen Systemen einfach übertragbar sein.

                  **Nutzerbedürfnisse und Erwartungen:**
                  - Nutzerzentrierung: Berücksichtigung von Nutzerfeedback und Umsetzung des „Once-Only“-Prinzips.
                  - Inklusion und Barrierefreiheit
                  - Sicherheit und Datenschutz
                  - Mehrsprachigkeit

                  **Grundlagen für die Zusammenarbeit:**
                  - Administrative Vereinfachung
                  - Erhaltung von Informationen
                  - Bewertung von Wirksamkeit und Effizienz: Regelmäßige Prüfung des Nutzens und der Kosten von Interoperabilitätslösungen.

                  **Weiterer zentraler Inhalt sind die 4 Ebenen der Interoperabilität:**
                  - **Rechtliche Interoperabilität:** definiert die rechtlichen Grundlagen eines Datenaustauschs
                  - **Organisatorische Interoperabilität:** beschreibt die für den Datenaustausch notwendigen Geschäftsprozesse
                  - **Semantische Interoperabilität:** stellt sicher, dass Daten und Begriffe gleich verstanden werden
                  - **Technische Interoperabilität:** beschreibt die erforderlichen technischen Systeme und Standards, die für den Datenaustausch notwendig sind

                  Quellen: [European Commission - European Interoperability FrameworkInteroperable Europe Portal](https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail)`}
                  ></RichText>
                </ContentInlineComponent>
              </section>
              <Separator className="my-40"></Separator>
              <section className="space-y-40">
                <Heading
                  tagName="h3"
                  className="font-bold"
                  id={tableContent[1].href}
                >
                  {tableContent[1].title}
                </Heading>
                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Verordnung über die Einrichtung eines einheitlichen digitalen Zugangstors (Single-Digital-Gateway-Verordnung)"
                >
                  <RichText
                    className="my-20"
                    markdown={dedent`
                  **Im Detail**: Verordnung (EU) 2018/1724 des Europäischen Parlaments und des Rates vom 2. Oktober 2018 
                  über die Einrichtung eines einheitlichen digitalen Zugangstors zu Informationen, Verfahren, Hilfs- und 
                  Problemlösungsdiensten und zur Änderung der Verordnung (EU) Nr. 1024/2012 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32018R1724).

                  **Die Single-Digital-Gateway-Verordnung könnte für Sie relevant sein, wenn:** 
                  - die Bereitstellung von Informationen oder Verwaltungsdienstleistungen für Bürgerinnen und Bürger oder Unternehmen berührt ist.
                  - das Vorhaben Informationen, Verfahren oder Hilfsdienste betrifft, die Bürgerinnen, Bürger oder Unternehmen benötigen, um ihre Rechte im EU-Binnenmarkt auszuüben oder entsprechende Pflichten zu erfüllen`}
                  />
                  <RichText
                    className="my-20 bg-blue-100"
                    markdown={dedent`
                  **Relevante Informationsbereiche** 
                  ([nach Single Digital Gateway-Verordnung Artikel 2](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#art_2) Absatz 2 Buchstabe a, [Anhang I](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#anx_I))
                  - **Für Bürgerinnen und Bürger**: Reisen innerhalb der Union, Arbeit und Ruhestand innerhalb der Union, Fahrzeuge in der Union, Wohnsitz in einem anderen Mitgliedstaat, Bildung oder Praktikum in einem anderen Mitgliedstaat, Medizinische Versorgung, Bürger- und Familienrechte, Verbraucherrechte, Schutz personenbezogener Daten
                  - **Für Unternehmen**: Gründung, Führung und Schließung eines Unternehmens, Arbeitnehmer, Steuern, Waren, Dienstleistungen, Finanzierung eines Unternehmens, Öffentliche Aufträge, Gesundheit und Sicherheit am Arbeitsplatz

                  **Relevante Ereignisse** 
                  (nach [Single Digital Gateway-Verordnung Artikel 6](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#art_6) Absatz 1, [Anhang II](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#anx_II))
                  Geburt, Wohnsitz, Studium, Arbeit, Umzug, Ruhestand, Gründung, Führung und Schließung eines Unternehmens

                  **Relevante Hilfs- und Problemlösungsdienste** 
                  (nach [Single Digital Gateway-Verordnung Artikel 2](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#art_2) Absatz 2 Buchstabe c, [Anhang III](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724&from=DE#anx_III))
                  Einheitliche Ansprechpartner, Produktinfostellen, Produktinformationsstellen für das Bauwesen, Nationale Beratungszentren für Berufsqualifikationen, Nationale Kontaktstellen für die grenzüberschreitende Gesundheitsversorgung, Europäisches Netz der Arbeitsvermittlungen (EURES), Online-Streitbeilegung.`}
                  />
                </ContentInlineComponent>
                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Die Verordnung über elektronische Identifizierung und Vertrauensdienste (eIDAS / eIDAS 2.0)"
                >
                  <RichText
                    markdown={dedent`
                  **Im Detail**: Verordnung (EU) 2024/1183 des Europäischen Parlaments und des Rates vom 11. April 2024
                  zur Änderung der Verordnung (EU) Nr. 910/2014 im Hinblick auf die Schaffung des europäischen Rahmens für eine digitale Identität | EUR-Lex
                  
                  **eIDAS könnte für Sie relevant sein, wenn Betroffene im Rahmen Ihrer Regelung:**
                  - sich digital ausweisen
                  - elektronische Vertrauensdienste nutzen (wie elektronische Signaturen, Siegel, Zeitstempel, Zustelldienste)
                  - rechtssicher an digitalen Transaktionen mitwirken.

                  **Schlüsselprinzip:**
                  Ermöglicht über Grenzen hinweg sichere und vertrauenswürdige Nutzung elektronischer Identifizierung und von Vertrauensdiensten.

                  **Die wichtigsten Punkte bezüglich Interoperabilität:**
                  - Identifizierungssysteme müssen interoperabel sein und in der EU einheitlich anerkannt werden.
                  - Eine qualifizierte elektronische Signatur hat die gleiche Rechtswirkung wie eine handschriftliche Unterschrift.
                  - Bietet Rechtsrahmen für elektronische Signaturen, Siegel, Zeitstempel, Dokumente, Zustellung digitaler Einschreiben, Website-Authentifizierung.`}
                  />
                </ContentInlineComponent>
              </section>
              <Separator className="my-40"></Separator>
              <section className="space-y-40">
                <Heading
                  tagName="h3"
                  className="font-bold"
                  id={tableContent[2].href}
                >
                  {tableContent[2].title}
                </Heading>
                <ContentInlineComponent
                  batchTitle="Richtlinien"
                  batchIcon={PlaylistAddCheckOutlined}
                  infoBoxTitle="Richtlinie über offene Daten und die Weiterverwendung von Informationen des öffentlichen Sektors (PSI-Richtlinie)"
                >
                  <RichText
                    markdown={dedent`
                **Im Detail**: Richtlinie (EU) 2019/1024 des Europäischen Parlaments und des Rates vom 20. Juni 2019 über offene Daten und die Weiterverwendung von Informationen des öffentlichen Sektors | [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
                
                **Die Richtlinie könnte für Ihr Vorhaben relevant sein, wenn im Rahmen der Regelung:**

                - Handhabung, Bereitstellung oder Weiterverwendung von Informationen des öffentlichen Sektors oder öffentlich finanzierter Forschungsdaten betroffen ist.
                - sich der Anwendungsbereich mit einem Eintrag in [Anhang I](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32019L1024&qid=1754909351558#anx_I)(Kategorien hochwertiger Datensätze) der Durchführungsverordnung über hochwertige Datensätze überschneidet.

                **Schlüsselprinzip:**
                Bestimmte Daten im Besitz öffentlicher Stellen, öffentlicher Unternehmen und Forschungsdaten sollen standardmäßig offen erstellt und grundsätzlich für kommerzielle und nichtkommerzielle Zwecke weiterverwendbar sein. Die Richtlinie legt die Bedingungen der Weiterverwendung von Daten fest, die als offene Daten bereitgestellt werden. Die rechtliche Verpflichtung zur Bereitstellung als offene Daten folgt aus § 12a EGovG und landesrechtlichen Normen.

                **Die wichtigsten Punkte bezüglich Interoperabilität:**
                - Offene Daten sollen kostenlos, maschinenlesbar und ggf. als Massen-Download weiterverwendbar sein.
                - Obwohl nicht primär auf Interoperabilität als technisches Zusammenspiel von Systemen ausgerichtet, trägt die Forderung nach maschinenlesbaren, verfügbaren und offenen Formaten wesentlich zur semantischen und technischen Interoperabilität bei.
                - Die Bedingungen für die Weiterverwendung von Daten müssen objektiv, verhältnismäßig, nichtdiskriminierend und gerechtfertigt sein. Sie dürfen den Wettbewerb nicht behindern und die Möglichkeiten der Weiterverwendung nicht unnötig einschränken.
                - Durch die Durchführungsverordnung über hochwertige Datensätze werden die Anforderungen an bestimmte Kategorien hochwertiger Datensätze (z. B. Geodaten, Statistikdaten) näher bestimmt..
                - Obwohl nicht primär auf Interoperabilität als technisches Zusammenspiel von Systemen ausgerichtet, trägt die Forderung nach maschinenlesbaren und offenen Formaten wesentlich zur semantischen und technischen Interoperabilität bei.`}
                  ></RichText>
                </ContentInlineComponent>
                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Verordnung über europäische Daten-Governance (Daten-Governance-Rechtsakt)"
                >
                  <RichText
                    markdown={dedent`
                  **Im Detail:** Verordnung (EU) 2022/868 des Europäischen Parlaments und des Rates vom 30. Mai 2022 über europäische Daten-Governance und zur Änderung der Verordnung (EU) 2018/1724 (Daten-Governance-Rechtsakt) | [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)

                  **Der Daten-Governance-Rechtsakt könnte für Sie relevant sein Dies könnte der Fall sein, wenn Ihre Regelung:**
                  - die Bereitstellung, der Austausch oder die Wiederverwendung von Daten, insbesondere durch öffentliche Stellen, Datenvermittlungsdienste oder Datenaltruismus-Organisationen betrifft.
                  - sich auf die Governance solcher Aktivitäten auswirkt.

                  **Schlüsselprinzip:** 
                  Schaffung eines vertrauenswürdigen Rahmens für den grenzüberschreitenden und sektorübergreifenden Datenaustausch auf Basis der FAIR-Prinzipien (auffindbar, zugänglich, interoperabel, wiederverwendbar) unter Einhaltung gemeinsamer europäischer Standards.

                  **Die wichtigsten Punkte bezüglich Interoperabilität:**
                  - [Europäisches Data Innovation Board](https://ec.europa.eu/transparency/expert-groups-register/screen/expert-groups/consult?lang=en&groupID=3903) (EDIB): Harmonisiert technische Praktiken und priorisiert Standards im Einklang mit den Prinzipien des Europäischen Interoperabilitätsrahmens.
                  - Datenvermittlungsdienste verpflichten sich zur sektorübergreifenden Interoperabilität durch Nutzung offener Standards.
                  - Zuständige Stellen helfen Behörden, sensible Daten technisch zu strukturieren und über Schnittstellen (APIs) interoperabel bereitzustellen.
                  - Ein Regelwerk für Datenspenden definiert Interoperabilitätsstandards für den Datenaltruismus, um die Nutzbarkeit geteilter Daten für das Gemeinwohl zu sichern.

                  Weiterführende Informationen
                  [Digitalstrategie der Europäischen Kommission](https://digital-strategy.ec.europa.eu/en/policies/data-governance-act)`}
                  ></RichText>
                </ContentInlineComponent>
              </section>
              <Separator className="my-40"></Separator>
              <section className="space-y-40">
                <Heading
                  tagName="h3"
                  className="font-bold"
                  id={tableContent[3].href}
                >
                  {tableContent[3].title}
                </Heading>
                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Datenschutz-Grundverordnung (DSGVO)"
                >
                  <RichText
                    markdown={dedent`
                  **Im Detail**: Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates vom 27. April 2016 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, zum freien Datenverkehr und zur Aufhebung der Richtlinie 95/46/EG | [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)

                  **Die DSGVO könnte für Sie relevant sein, wenn im Rahmen Ihrer Regelung:**
                  - vorgesehen bzw. erforderlich ist, dass personenbezogene Daten verarbeitet werden (erhoben, gespeichert, genutzt, übermittelt etc.).
                  - die Datenverarbeitung ganz oder teilweise automatisiert oder basierend auf einem Dateisystem (Art. 2 Abs. 1 DSGVO) erfolgt

                  **Schlüsselprinzip:**
                  Schutz des/der Einzelnen bei der Verarbeitung personenbezogener Daten.

                  **Die wichtigsten Punkte bezüglich Interoperabilität:**
                  - Für jede Datenübertragung oder -nutzung im Rahmen der Interoperabilität muss eine Rechtsgrundlage vorhanden sein (z.B. Einwilligung der betroffenen Person, Erfüllung eines Vertrags, rechtliche Verpflichtung, berechtigtes Interesse, oder die Wahrnehmung einer Aufgabe im öffentlichen Interesse).
                  - Interoperable Systeme müssen von Grund auf datenschutzfreundlich gestaltet sein ("Privacy by Design"). Das bedeutet, dass technische und organisatorische Maßnahmen zur Sicherung der Daten bereits bei der Konzeption der Systeme berücksichtigt werden müssen (z.B. Verschlüsselung, Pseudonymisierung, Zugriffsbeschränkungen). Bei Verarbeitung personenbezogener Daten durch öffentliche Stellen bedarf es in der Regel zusätzlich zur DSGVO einer gesetzlichen Grundlage im nationalen Recht.`}
                  ></RichText>
                </ContentInlineComponent>
              </section>
              <Separator className="my-40"></Separator>
              <section className="space-y-40">
                <Heading
                  tagName="h3"
                  className="font-bold"
                  id={tableContent[4].href}
                >
                  {tableContent[4].title}
                </Heading>

                <ContentInlineComponent
                  batchTitle="Verordnung"
                  batchIcon={FlagOutlined}
                  infoBoxTitle="Verordnung über künstliche Intelligenz (AI Act)"
                >
                  <RichText
                    className="my-20"
                    markdown={dedent`
                  **Im Detail:** Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates vom 13. Juni 2024 zur Festlegung harmonisierter Vorschriften für künstliche Intelligenz und zur Änderung der Verordnungen (EG) Nr. 300/2008, (EU) Nr. 167/2013, (EU) Nr. 168/2013, (EU) 2018/858, (EU) 2018/1139 und (EU) 2019/2144 sowie der Richtlinien 2014/90/EU, (EU) 2016/797 und (EU) 2020/1828 (Verordnung über künstliche Intelligenz) | EUR-Lex
                  
                  **Diese Verordnung könnte für Sie relevant sein, wenn Ihr Vorhaben:**
                  - die Entwicklung, Bereitstellung oder Nutzung von Systemen berührt, die Merkmale Künstlicher Intelligenz aufweisen.
                  - die Automatisierung von Entscheidungen, die Analyse von Verhaltensweisen oder die Verarbeitung großer Datenmengen zur Erzeugung von Inhalten, Vorhersagen oder Empfehlungen, die Auswirkungen auf die Gesundheit, Sicherheit oder Grundrechte von Personen haben.

                  Die KI-Verordnung legt harmonisierte Vorschriften fest, um die Einführung vertrauenswürdiger KI zu fördern. Sie führt einen strengen risikobasierten Ansatz ein, der KI-Anwendungen in verschiedene Klassen unterteilt: Während gefährliche Praktiken verboten sind, unterliegen „Hochrisiko-Systeme“ strengen Anforderungen an Sicherheit, Transparenz und Qualität. Für Modelle, die in keine dieser Klassen fallen, gelten spezifische Transparenzregeln, um eine verantwortungsvolle Entwicklung entlang der gesamten Wertschöpfungskette sicherzustellen.`}
                  ></RichText>
                  <RichText
                    className="my-20 bg-blue-100"
                    markdown={dedent`
                  **Hochrisiko-KI** ([nach Anhang III](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=OJ:L_202401689#anx_III)):
                  - **Biometrie**: Fernidentifizierung, biometrische Kategorisierung oder Emotionserkennung.
                  - **Kritische Infrastruktur**: Sicherheitsbauteile in der Verwaltung von digitaler Infrastruktur, Straßenverkehr oder Energieversorgung.
                  - **Bildung**: Zulassungsverfahren, Bewertung von Lernergebnissen oder Überwachung bei Prüfungen.
                  - **Beschäftigung & Personal**: Bewerberscreening, Beförderungsentscheidungen oder Überwachung am Arbeitsplatz.
                  - **Öffentliche Dienste & Sozialleistungen**: Bewertung des Anspruchs auf Sozialhilfe, Krankenversorgung oder Notfalltriage.
                  - **Strafverfolgung, Migration & Justiz**: Risikobewertungen von Personen, Lügendetektoren, Prüfung von Asylanträgen oder Unterstützung bei richterlichen Entscheidungen.

                  **Auswahl verbotener Praktiken** ([nach Artikel 5](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=OJ:L_202401689#art_5)):
                  - Unterschwellige Beeinflussung oder Ausnutzung von Schutzbedürftigkeit, die zu erheblichem Schaden führt.
                  - Social Scoring (Bewertung sozialen Verhaltens durch Behörden).
                  - Ungezieltes Auslesen von Gesichtsbildern aus dem Internet/Videoüberwachung.`}
                  ></RichText>
                  <RichText
                    markdown={dedent`
                  **Schlüsselprinzip:**
                  Gewährleistet ein hohes Schutzniveau für Gesundheit, Sicherheit und Grundrechte vor schädlichen KI-Auswirkungen, während gleichzeitig die Innovation durch klare Regeln und einen einheitlichen Rechtsrahmen im digitalen Binnenmarkt gestärkt wird.

                  **Die wichtigsten Punkte bezüglich Interoperabilität:**
                  - Die Verordnung soll die technische Kompatibilität und Robustheit von KI-Systemen über Staatsgrenzen hinweg sicherstellen.
                  - Der AI Act fördert den Zugriff auf hochwertige, interoperable Datensätze für das Training und Testen von KI-Systemen, um die Qualität und Nichtdiskriminierung von Algorithmen sicherzustellen.
                  - Anbieter von KI-Basismodellen müssen nachgelagerten Entwicklern detaillierte technische Informationen bereitstellen, damit diese die KI nahtlos und sicher in ihre eigenen interoperablen Dienste integrieren können.`}
                  ></RichText>
                </ContentInlineComponent>
              </section>
            </section>
          </div>
        </SidebarContainer>
      </div>
    </>
  );
}
