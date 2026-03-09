import { Link } from "react-router";
import ContentWrapper from "~/components/ContentWrapper";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox";
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
          <Image
            url="/images/DCAT-AP-books.png"
            alternativeText="Beispielbild, dass DCAT-AP mit einem strukturierten Katalog vergleicht"
          />

          <Heading tagName="h2">
            Ein verbindlicher Standard für Deutschland
          </Heading>
          <p>
            <strong>DCAT-AP.de</strong> ist das deutsche Profil dieses
            europäischen Standards. Es stellt sicher, dass deutsche Spezifika
            berücksichtigt werden, während die volle Kompatibilität mit der EU
            gewahrt bleibt. Der IT-Planungsrat empfiehlt diesen Standard
            verbindlich für den Austausch offener Verwaltungsdaten. Unter&nbsp;
            <Link to="www.dcat-ap.de" className="ds-link-01-reg">
              www.dcat-ap.de
            </Link>
            &nbsp;steht das deutsche Profil frei zur Verfügung.
          </p>
          <Image
            url="/images/DCAT-AP-books.png"
            alternativeText="Beispielbild, dass DCAT-AP mit einem strukturierten Katalog vergleicht"
          />
          <p>
            <Link
              to="https://youtu.be/_JB93__aj_M?si=RNpW3uc_f7kcLxUA&t=279"
              className="ds-link-01-reg"
            >
              https://www.youtube.com/watch?v=_JB93__aj_M
            </Link>
            &nbsp;(4:39min)
          </p>

          <Heading tagName="h2">So stellen Sie die Nutzung sicher</Heading>
          <p>
            Integrieren Sie bereits im Gesetzentwurf eine klare Vorgabe zur
            Nutzung des Standards. Damit schaffen Sie die rechtliche Grundlage,
            dass die spätere technische Umsetzung zwingend nach DCAT-AP erfolgt,
            um die EU-weite Auffindbarkeit zu garantieren.
          </p>
          <Heading tagName="h3">Ihr Weg zum interoperablen Dienst</Heading>
          <p>
            Um DCAT-AP erfolgreich in Ihr Regelungsvorhaben zu integrieren,
            folgen Sie diesen Schritten:
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

          {/* <section className="ds-stack ds-stack-32">
            <Heading tagName="h2">Häufige Fragen zu DCAT-AP</Heading>
            <div className="ds-stack ds-stack-16">
              <AccordionItem key={item.headline} headline={item.headline}>
                <RichText markdown={item.content} />
              </AccordionItem>
            </div>
          </section> */}
        </ContentWrapper>
      </main>
    </>
  );
}
