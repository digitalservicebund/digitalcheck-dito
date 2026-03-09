import DataObjectOutlined from "@digitalservicebund/icons/DataObjectOutlined";
import AccordionItem from "~/components/AccordionItem";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Timeline from "~/components/Timeline";
import { dedent } from "~/utils/dedentMultilineStrings";

export default function InteroperableSolutionsDcatAp() {
  return (
    <>
      <MetaTitle prefix="Data Catalogue Vocabulary Application Profile (DCAT-AP)" />
      <main>
        <Hero title="Data Catalogue Vocabulary Application Profile (DCAT-AP)">
          <p className="ds-subhead">
            Der Standard dafür, dass Offene Daten nicht nur vorhanden, sondern
            europaweit einheitlich auffindbar sind.
          </p>
        </Hero>

        <ContentWrapper>
          <InfoBox
            heading={{ text: "Auf einen Blick" }}
            className="bg-blue-100"
            look="method"
          >
            <ul>
              <li>
                <strong>Was ist DCAT-AP?</strong> Ein Standard für die
                Beschreibung (nicht den Inhalt!) von offenen Datensätzen.
              </li>
              <li>
                <strong>Warum ist das wichtig?</strong> Damit Ihr Gesetz im
                digitalen Zeitalter funktioniert und offene Daten für
                Bürgerinnen und Bürger, Wirtschaft und Wissenschaft in der EU
                auffindbar werden.
              </li>
              <li>
                <strong>Was kostet mich das?</strong> Als Legistin nur einen
                Textbaustein in ihrem Regelungsvorhaben. Die technische Arbeit
                leisten dann die IT-Experten.
              </li>
              <li>
                <strong>Wo gibt es Hilfe?</strong> Beim DigitalService /
                Nationale Kontaktstelle für Interoperabilität.
              </li>
            </ul>
            <div className="flex gap-16">
              <span className="text-6xl">🇪🇺</span>
              Status: Beschlossen als „interoperable europäische Lösung“ im
              Rahmen des Interoperable Europe Act (EU) 2024/903.
            </div>
          </InfoBox>

          <DetailsSummary title="Wofür ist das gedacht?">
            <RichText
              markdown={dedent`
              Wie stellen wir sicher, dass offene Verwaltungsdaten nicht in digitalen Silos verschwinden, sondern EU-weit gefunden werden?
              
              Stellen Sie sich vor, ein Startup möchte eine europaweite Wander-App entwickeln. Damit die App-Entwickler nicht mühsam tausende einzelne Behördenseiten in Spanien, Frankreich und Deutschland durchsuchen müssen, brauchen sie eine zentrale Anlaufstelle.
              
              Hier hilft der Metadatenstandard **DCAT-AP**. Er dient als **genormtes digitales Etikett** für Datensätze. Er legt nicht fest, was in der Datei steht (z. B. die Koordinaten einer Schutzhütte), sondern wie der **Datensatz als Ganzes** beschrieben wird (z. B. „Wanderwege Thüringen“, „Herausgeber: Forstamt“, „Letztes Update: gestern“).
              
              Wenn alle Behörden dieses einheitliche Etikett nutzen, können Portale wie [govdata.de](govdata.de) (national) und [data.europa.eu](data.europa.eu) (EU-weit) die Datensätze automatisch „ernten“. Das Ergebnis: Elena aus Berlin findet die aktuellen Sperrinfos für ihren Wanderweg in den Pyrenäen sofort, weil die App-Entwickler den Datensatz dank DCAT-AP mühelos identifizieren konnten.
              `}
            />
          </DetailsSummary>

          <Heading tagName="h2">
            Stellen Sie sich den Standard DCAT-AP als den Katalog einer
            Bibliothek vor
          </Heading>
          <InfoBoxSideBySide>
            <InfoBox
              look="method"
              badge={{ children: "Ohne Standards", look: "danger" }}
              heading={{
                text: "Der ungeordnete Bücherstapel",
                tagName: "h3",
                className: "ds-heading-03-bold",
              }}
            >
              <RichText
                markdown={dedent`
                  Ohne standardisierte Beschreibung (Metadaten) sind Daten wie Bücher, die wild auf einem Haufen liegen. Niemand weiß, wer der Autor ist, worum es geht oder in welcher Sprache das Buch geschrieben ist.
                  
                  **Folge:** Die Daten sind rechtlich vorhanden, aber faktisch unauffindbar.`}
              />
            </InfoBox>

            <InfoBox
              look="method"
              badge={{ children: "Mit DCAT-AP", look: "success" }}
              heading={{
                text: "Der strukturierte Katalog",
                tagName: "h3",
                className: "ds-heading-03-bold",
              }}
            >
              <RichText
                markdown={dedent`
                  DCAT-AP ist die Karteikarte für jedes Buch. Es zwingt dazu, **Titel, Autor (Herausgeber) und Thema** nach festen Regeln anzugeben. So können Suchmaschinen (wie das EU-Portal) die Daten automatisch finden und kategorisieren.
                  
                  **Ziel:** Die Regelung stellt sicher, dass diese Karteikarte korrekt ausgefüllt wird.`}
              />
            </InfoBox>
          </InfoBoxSideBySide>
        </ContentWrapper>

        <div className="bg-blue-100 py-80 max-lg:px-16">
          <Container className="bg-white">
            <InfoBox
              visual={{
                type: "icon",
                Icon: DataObjectOutlined,
                className: "fill-blue-300",
              }}
              heading={{
                tagName: "h2",
                text: "Ein verbindlicher Standard für Deutschland",
                look: "ds-heading-03-reg",
              }}
            >
              <RichText
                markdown={dedent`
              **DCAT-AP.de** ist das deutsche Profil des europäischen Metadatenstandards. Es sorgt dafür, dass deutsche Spezifika berücksichtigt werden – bei voller Kompatibilität zur EU. Der IT-Planungsrat empfiehlt diesen Standard verbindlich für den Austausch offener Verwaltungsdaten. Das deutsche Profil ist frei verfügbar unter [www.dcat-ap.de](https://www.dcat-ap.de).

              [YouTube-Video: Einführung zu DCAT-AP.de (4:39 min)](https://youtu.be/_JB93__aj_M?si=RNpW3uc_f7kcLxUA&t=279)
            `}
              />
            </InfoBox>
          </Container>
        </div>

        <ContentWrapper>
          <Heading tagName="h2">So stellen Sie die Nutzung sicher</Heading>
          <p>
            Integrieren Sie bereits im Gesetzentwurf eine klare Vorgabe zur
            Nutzung des Standards. Damit schaffen Sie die rechtliche Grundlage,
            dass die spätere technische Umsetzung zwingend nach DCAT-AP erfolgt,
            um die EU-weite Auffindbarkeit zu garantieren. Um DCAT-AP
            erfolgreich in Ihr Regelungsvorhaben zu integrieren, folgen Sie
            diesen Schritten:
          </p>

          <Timeline>
            <Timeline.Item bullet>
              <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                <Heading tagName="h4" className="ds-label-01-bold">
                  Schritt 1: Bedarf & Prüfung (Ihre Domäne)
                </Heading>
                <p>
                  Sie definieren das Ziel (z. B. „Umweltdaten vergleichbar
                  machen“). Nutzen Sie den <strong>Digitalcheck</strong>, um zu
                  prüfen: Führt das Gesetz neue Register oder Berichte ein, die
                  als offene Daten EU-weit auffindbar sein sollen? Lautet die
                  Antwort „Ja“, ist DCAT-AP der im Interoperable Europe Act zu
                  nutzende Standard.
                </p>
              </Timeline.ItemContent>
            </Timeline.Item>

            <Timeline.Item bullet>
              <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                <Heading tagName="h4" className="ds-label-01-bold">
                  Schritt 2: Technische Vorgabe
                </Heading>
                <p>
                  Sie legen im Entwurf fest, dass für die Beschreibung der Daten
                  der Standard <strong>DCAT-AP.de</strong> zu nutzen ist.
                  IT-Experten setzen dies dann technisch um, indem sie die
                  Metadaten entsprechend strukturieren.
                </p>
              </Timeline.ItemContent>
            </Timeline.Item>

            <Timeline.Item bullet>
              <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
                <Heading tagName="h4" className="ds-label-01-bold">
                  Schritt 3: Betrieb & Wirkung
                </Heading>
                <p>
                  Sobald der Dienst live geht, werden die Daten automatisch von
                  nationalen und europäischen Portalen erkannt. Ihre Regelung
                  entfaltet maximale Wirkung, da die Daten ohne manuellen
                  Aufwand EU-weit gefunden werden.
                </p>
              </Timeline.ItemContent>
            </Timeline.Item>
          </Timeline>

          <DetailsSummary title="Wann ist eine Ausnahme zulässig?">
            <RichText
              markdown={dedent`
                          Der _Interoperable Europe Act (IEA)_ sieht vor, dass die Nutzung von
            Standards wie DCAT-AP in begründeten Fällen abgelehnt werden kann.
            Prüfen Sie folgende Punkte:

            - **Sicherheit & Geheimhaltung:** Enthält die Beschreibung des Datensatzes (die „Katalogkarte“) Informationen, die aus Gründen der öffentlichen Sicherheit oder des Datenschutzes nicht veröffentlicht werden dürfen?
            - **Rechte Dritter:** Verhindern bestehende Lizenzen oder Urheberrechte Dritter die Nutzung dieses offenen Standards?
            - **Unverhältnismäßigkeit:** Übersteigt der Aufwand für die Umstellung eines bestehenden, isolierten Systems den Nutzen für den grenzüberschreitenden digitalen Binnenmarkt deutlich?
              `}
            />
          </DetailsSummary>
        </ContentWrapper>

        <div className="bg-blue-100 py-40 max-lg:px-16">
          <Container className="space-y-40">
            <Heading tagName="h2">
              DCAT-AP in Anwendung in bestehenden Gesetzen und Richtlinien
            </Heading>
            <div>
              <AccordionItem headline="Gesetz für die Nutzung von Daten des öffentlichen Sektors (Datennutzungsgesetz - DNG)">
                <RichText
                  markdown={dedent`
              Mit der Umsetzung der EU-Richtlinie über offene Daten (2019/1024) wurde in Deutschland das Datennutzungsgesetz (DNG) geschaffen. Dieses verpflichtet die Verwaltung, hochwertige Datensätze (High-Value Datasets) in maschinenlesbaren Formaten bereitzustellen.

              **Warum reicht Maschinenlesbarkeit allein nicht aus?**

              Damit diese Daten nicht nur lesbar, sondern auch EU-weit auffindbar und nutzbar sind, braucht es eine einheitliche Beschreibung – das „digitale Etikett“. Hier setzt der Standard **DCAT-AP** (in Deutschland: **DCAT-AP.de**) an:

              * **Vom Datensatz zur Auffindbarkeit:** Während das DNG die Qualität des Datensatzes (z. B. als CSV oder JSON) vorgibt, sorgt DCAT-AP für die **semantische Interoperabilität** der beschreibenden Metadaten.
              * **Grenzüberschreitender Standard:** Durch den Standard DCAT-AP werden Datensätze automatisch zwischen lokalen, nationalen (govdata.de) und europäischen Portalen (data.europa.eu) synchronisiert.

              **EU-Empfehlung:** Als offiziell anerkannte „Interoperable Europe Solution“ ist DCAT-AP die Brücke, die dafür sorgt, dass offene Verwaltungsdaten im gesamten europäischen Binnenmarkt ohne manuellen Aufwand gefunden werden können.

              **Wem nützt das?**

              * **Der Wirtschaft:** Start-ups nutzen diese Daten für neue Geschäftsmodelle (z. B. Mobilitäts-Apps oder KI-Training).
              * **Der Verwaltung:** Behörden finden Daten anderer Stellen schneller, was die Effizienz steigert und Doppelerhebungen vermeidet.
              * **Der Wissenschaft:** Durch europaweit einheitliche Metadaten können Forschende hochwertige Verwaltungsdaten über Fach- und Ländergrenzen hinweg effizient identifizieren, automatisiert zusammenführen und als verlässliche Basis nachnutzen.
              `}
                />
              </AccordionItem>
              <AccordionItem headline="Die INSPIRE-Richtlinie (Geodateninfrastruktur in Europa)">
                <RichText
                  markdown={dedent`
              Ein Meilenstein der rechtlich verankerten Interoperabilität. Die Richtlinie verpflichtete die Mitgliedstaaten, Geodaten (z. B. zu Schutzgebieten oder Gewässernetzen) interoperabel bereitzustellen.

              Da INSPIRE technisch sehr komplex war, wurde für die Auffindbarkeit der Daten in nationalen Katalogen und im EU-Geoportal eine Metadaten-Struktur genutzt, die heute in weiten Teilen mit DCAT-AP kompatibel ist oder darin aufgegangen ist, um eine sektorübergreifende Suche zu ermöglichen.

              **Warum man das braucht:**

              Umweltprobleme (wie Hochwasser oder Luftverschmutzung) halten sich nicht an Staatsgrenzen. Um eine europäische Strategie (z. B. den Green Deal) umzusetzen, müssen die Daten der Mitgliedstaaten technisch zueinander passen.

              **Wem nützt das?**

              * **Bürgerinnen & Bürger:** Sie können sich grenzübergreifend über Umweltbelastungen informieren.
              * **Legistinnen & Politik:** Sie erhalten eine verlässliche Datenbasis für grenzübergreifende Infrastrukturprojekte und Klimaschutzmaßnahmen.`}
                />
              </AccordionItem>
            </div>

            <Heading tagName="h2">Weiterführende Links</Heading>
            <RichText
              markdown={dedent`
            - [DCAT Application Profile for data portals in Europe](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe)
            - [EIF Perspective attributes of DCAT Application Profile for data portals in Europe](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/eif-perspective)
            - [DCAT-AP.de](https://www.dcat-ap.de/)
            `}
            />
          </Container>
        </div>
      </main>
    </>
  );
}
