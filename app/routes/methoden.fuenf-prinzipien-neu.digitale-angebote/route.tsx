import { DoneAllOutlined } from "@digitalservicebund/icons";
import BorderColorOutlined from "@digitalservicebund/icons/BorderColorOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import { ReactNode } from "react";
import { data, Link } from "react-router";
import AccordionItem from "~/components/AccordionItem.tsx";
import Hero from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";
import { ROUTE_METHODS_PRINCIPLES_NEW_DIGITALE_ANGEBOTE } from "~/resources/staticRoutes.ts";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import getFeatureFlag from "~/utils/featureFlags.server.ts";

function Aspect({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section className="py-80 nth-[2n+1]:bg-blue-100">
      <div className="container mx-auto space-y-40">{children}</div>
    </section>
  );
}

function AspectHeader({
  children,
  number,
}: Readonly<{
  children: ReactNode;
  number: ReactNode;
}>) {
  return (
    <h2 className="mb-40 flex gap-16">
      <span>{number}</span> {children}
    </h2>
  );
}

function Formulierungsbeispiel({
  children,
}: Readonly<{ children?: ReactNode }>) {
  return (
    <div className="space-y-8 rounded-lg bg-green-300 px-40 py-24">
      <div className="ds-label-02-reg flex items-center gap-8">
        <LightbulbOutlined className={"text-black/200"} /> Formulierungsbeispiel
      </div>
      <div>{children}</div>
    </div>
  );
}

function Textbeispiel({
  children,
  heading = "Ein Textbeispiel",
}: Readonly<{
  children: ReactNode;
  heading?: ReactNode;
}>) {
  return (
    <div className="space-y-8 rounded-lg border border-gray-900 bg-white p-24">
      <div className="ds-heading-03-reg">{heading}</div>
      <div>{children}</div>
    </div>
  );
}

function UmsetzungHeader() {
  return (
    <h3 className="mb-40 flex gap-20">
      <DoneAllOutlined className="size-32" />
      Umsetzung
    </h3>
  );
}

export function loader() {
  if (!getFeatureFlag("principles26")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }
}

export default function PrinzipDigitaleAngebote() {
  return (
    <>
      <MetaTitle
        prefix={ROUTE_METHODS_PRINCIPLES_NEW_DIGITALE_ANGEBOTE.title}
      />
      <main>
        <Hero
          title="Digitale Angebote für alle nutzbar gestalten"
          subtitle={dedent`
            Eine Regelung, die gut digital umgesetzt werden kann, muss sicherstellen, dass
            Kommunikation und Bearbeitung gut digital erfolgen kann. Dieses Prinzip betrifft
            sowohl den Austausch mit der Zivilgesellschaft als auch die Zusammenarbeit
            zwischen Behörden.
            
            Erfahren Sie in diesem Abschnitt,
            - welche Formulierungen Ihre Regelung bezüglich digitaler Umsetzung zukunftsfähig machen,
            - wie Sie digitale Möglichkeiten für einen effizienten Vollzug nutzen,
            - wie Barrierefreiheit zu bedenken ist.
            `}
        ></Hero>

        <Aspect>
          <AspectHeader number="1.1">
            Ermöglichen Sie digitale Kommunikation
          </AspectHeader>
          <div className="space-y-8">
            <p>
              Bürgerinnen und Bürger, Mitarbeitende in Unternehmen, weiteren
              Organisationen und der Verwaltung sind meist an digitale
              Kommunikation gewöhnt. In der Verwaltung und den Behörden erlaubt
              eine durchgehend digitale Dokumentation, Bearbeitung und ggf.
              Prüfung eine effizientere Bearbeitung.
            </p>
            <p>
              Digitale Kommunikation sollte immer bedarfsorientiert und inklusiv
              sein – in bestimmten Fällen kann z. B. ergänzend auch die
              Schriftform sinnvoll sein, sofern eine digitale Weiterverarbeitung
              sichergestellt ist.
            </p>
          </div>
          <h3 className="flex gap-20">
            <BorderColorOutlined className="size-32" />
            So wenden Sie den Aspekt an
          </h3>
          <div>
            <AccordionItem headline="Prüfen Sie Schriftformerfordernisse">
              Inhalt hier
            </AccordionItem>
            <AccordionItem headline="Vermeiden Sie, persönliches Erscheinen erforderlich zu machen">
              Inhalt hier
            </AccordionItem>
            <AccordionItem headline="Dokumente nur nach Bedarf anfordern">
              Inhalt hier
            </AccordionItem>
            <AccordionItem headline="Ermöglichen Sie weiterhin alternative Kommunikationswege">
              Inhalt hier
            </AccordionItem>
          </div>
        </Aspect>
        <Aspect>
          <AspectHeader number="1.2">
            Formulieren Sie die Regelung technologieoffen
          </AspectHeader>

          <p>
            Wenn Sie Übertragungswege – wie DE-Mail oder PDF – festlegen,
            riskieren Sie, dass Ihre Regelung bald nicht mehr dem Stand der
            Technik entspricht. Andererseits kann die Nutzung etablierter
            Basisdienste die Umsetzung erleichtern und die Anwendung für
            Nutzende vereinfachen – im Sinne des Prinzips „Etablierte
            Technologien ermöglichen effiziente Umsetzung“. Ob das sinnvoll ist,
            hängt vom konkreten Einzelfall ab.
          </p>
          <Formulierungsbeispiel>
            „Der Antrag ist <strong>elektronisch oder schriftlich</strong> zu
            stellen.“ oder „Der Antrag ist zu stellen.“
          </Formulierungsbeispiel>
          <Textbeispiel>
            <strong>§ 66a LuftVG</strong>
            <p>
              Das Luftfahrt-Bundesamt übermittelt jedem Betreiber nach Absatz 1
              Satz 1 elektronisch eine Registrierungsnummer [...].
            </p>
          </Textbeispiel>
        </Aspect>
        <Aspect>
          <AspectHeader number={"1.3"}>
            Denken Sie an Antragsstellung, Bearbeitung und Bescheid
          </AspectHeader>
          <div className={"space-y-16"}>
            <p>Nutzen Sie die Potenziale einer Digitalisierung des Vollzugs.</p>
            <p>
              Beispiele:
              <ul>
                <li>
                  Digital erfasste Daten direkt digital weiterzuverarbeiten,
                  spart Zeit, weil Informationen nicht eingescannt oder
                  abgetippt werden müssen.
                </li>
                <li>
                  Digitale Oberflächen, die für Nutzende zusätzliche
                  Hilfestellungen und Kontrollen enthalten, erhöhen die Qualität
                  der Daten. Sogenannte Plausibilitätsprüfungen kontrollieren
                  zum Beispiel, ob Ort und Postleitzahl zusammenpassen oder ob
                  ein angegebener Zeitraum antragsberechtigt ist.
                </li>
              </ul>
            </p>
          </div>
          <UmsetzungHeader />
          <div>
            <AccordionItem
              headline={
                "Beziehen Sie den gesamten Prozess in die Gestaltung der Regelung mit ein."
              }
            >
              Welche Informationen werden von wem an wen übermittelt? Beachtet
              die Regelung auch verwaltungsinterne Kommunikation oder den
              Austausch zwischen Behörden und Unternehmen?
            </AccordionItem>
            <AccordionItem headline="Räumen Sie verwaltungsinterne Medienbrüche aus und vereinfachen Sie Prozesse.">
              Hierzu kann es hilfreich sein, die Technologien und Verfahren der
              umsetzenden Behörden zu erheben. Nutzen Sie hierfür z. B. eine
              Visualisierung. Prüfen Sie, inwiefern bisher analog gespeicherte
              Daten stattdessen digital gespeichert werden können.
            </AccordionItem>
            <AccordionItem headline="Ermöglichen Sie automatische Kontrollen (z. B. Plausibilitätsprüfungen)">
              <div>
                Sogenannte Plausibilitätsprüfungen kontrollieren, ob Ort und
                Postleitzahl zusammenpassen oder ob ein angegebener Zeitraum
                antragsberechtigt ist. Dies reduziert vermeidbare Fehler in
                Anträgen, die ansonsten oft zeitaufwändige Rückfragen nach sich
                ziehen. Hierbei helfen{" "}
                <ol>
                  <li>
                    die Nutzung bestehender Standards entsprechend dem Prinzip{" "}
                    <i>Datenwiederverwendung benötigt einheitliches Recht</i>{" "}
                    sowie
                  </li>
                  <li>Codelisten.</li>
                </ol>
              </div>
            </AccordionItem>
          </div>
        </Aspect>
        <Aspect>
          <AspectHeader number={"1.4"}>
            Denken Sie Barrierefreiheit von Anfang an mit
          </AspectHeader>
          <p>
            Digitale Angebote müssen nach{" "}
            <Link
              className={"text-link"}
              to="https://www.gesetze-im-internet.de/bgg/__12a.html"
            >
              § 12 a Behindertengleichstellungsgesetz
            </Link>{" "}
            barrierefrei sein. Barrierefrei bedeutet, dass Menschen mit und ohne
            Behinderung das Angebot in gleicher Weise nutzen können. Da es viele
            unterschiedliche Arten von Behinderungen gibt, müssen viele Aspekte
            beachtet werden. Etwa die Aufbereitung für blinde und sehbehinderte
            Menschen oder Angebote in deutscher Gebärdensprache oder leichter
            Sprache.
          </p>
          <UmsetzungHeader />
          <p>
            Falls anwendbar: Prüfen Sie, welche Regelwerke für die Umsetzung
            digitaler Barrierefreiheit für Ihr Vorhaben relevant sind. Nutzen
            Sie dafür beispielsweise den{" "}
            <Link
              to="https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/standardanforderungskatalog/standardanforderungskatalog-node.html"
              className="text-link"
            >
              Standardanforderungskatalog
            </Link>
            .
          </p>
          <p>
            <strong>Fragen Sie sich:</strong> Haben Sie die Bedürfnisse von
            Menschen mit unterschiedlichen Arten von Behinderungen
            berücksichtigt?
          </p>
          <Textbeispiel heading={"Textbeispiele"}>
            <div className="mb-16">
              <Link
                to="https://www.gesetze-im-internet.de/sgb_9_2018/__106.html"
                className="ds-link-01-bold"
              >
                § 106 Abs. 1 SGB IX
              </Link>
              <p>
                &quot;Die Beratung erfolgt in einer für den
                Leistungsberechtigten wahrnehmbaren Form&quot;.
              </p>
              <p className="italic">
                So eine Formulierung muss in einer Verordnung ausgestaltet
                werden.
              </p>
            </div>
            <div>
              <Link
                to="https://www.gesetze-im-internet.de/sgb_5/__354.html"
                className="ds-link-01-bold"
              >
                § 354 SGB V
              </Link>
              <p>
                Die Gesellschaft für Telematik hat [...] nach dem Stand der
                Technik auch die erforderlichen technischen und
                organisatorischen Verfahren festzulegen oder technischen
                Voraussetzungen zu schaffen dafür, dass 1. in einer
                elektronischen Patientenakte Daten [...] barrierefrei zur
                Verfügung gestellt und [durch die Versicherten und die
                Zugriffsberechtigten] barrierefrei verarbeitet werden können
                [...].
              </p>
            </div>
          </Textbeispiel>
        </Aspect>
        <Aspect>
          <AspectHeader number={"1.5"}>
            Stellen Sie eine nutzerfreundliche Umsetzung sicher
          </AspectHeader>
          <p>
            Barrierearme Angebote sind oft auch nutzerfreundlicher. Darüber
            hinaus macht eine nutzerzentrierte Entwicklung, die z. B. in kleinen
            Schritten agiert und Texte in einfacher Sprache oder mehrsprachig
            gestaltet, ihr Angebot zugänglicher.
          </p>
          <p>
            <strong className={"mb-8 block"}>Fragen Sie sich:</strong>
            <ul>
              <li>Was ist die wichtigste Aufgabe aus Sicht der Nutzenden?</li>
              <li>
                Wenden die umsetzenden Akteurinnen und Akteure den{" "}
                <Link
                  to="https://servicestandard.gov.de/"
                  className="text-link"
                >
                  Servicestandard
                </Link>{" "}
                an? Dieser stellt eine nutzerzentrierte Entwicklung sicher.
              </li>
            </ul>
          </p>
          <Textbeispiel>
            <strong>Auszug § 1131 ZPO</strong>
            <p>
              (3) Die nach Absatz 2 entwickelte Kommunikationsplattform ist über
              ein Justizportal des Bundes und der Länder für die Nutzer
              bereitzustellen. Sie ist nach Maßgabe der
              Barrierefreie-Informationstechnik-Verordnung barrierefrei zu
              gestalten. Ferner ist bei der Gestaltung der
              Kommunikationsplattform deren Nutzerfreundlichkeit sowie eine
              einfache und intuitive Bedienbarkeit sicherzustellen.
            </p>
          </Textbeispiel>
        </Aspect>
      </main>
    </>
  );
}
