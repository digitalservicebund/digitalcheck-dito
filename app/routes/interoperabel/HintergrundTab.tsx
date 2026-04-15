import { Link } from "react-router";
import DetailsSummary from "~/components/DetailsSummary";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import ImageZoomable from "~/components/ImageZoomable";
import NewTabLink from "~/components/NewTabLink";
import { contact } from "~/resources/content/shared/contact";
import {
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import { assetPath } from "~/utils/assetPath";
import { getTabAnchorLink } from "~/utils/tabs";
import { tabIds } from "./tabIds";

export const HintergrundTab = () => (
  <section className="space-y-40">
    <Heading tagName="h2">Hintergrund</Heading>
    <div className="space-y-8">
      <Heading tagName="h3">
        Das Ziel der Verordnung für ein interoperables Europa
      </Heading>
      <p>
        Das Ziel der{" "}
        <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903">
          Verordnung für ein interoperables Europa (EU) 2024/903
        </NewTabLink>{" "}
        ist es, digitale öffentliche Dienste zu verbessern. Die Dienste
        einzelner Mitgliedstaaten sollen miteinander kompatibel sein. Dafür
        braucht es gemeinsame Standards, um Daten zwischen den Mitgliedstaaten
        auszutauschen. Um digitale Potenziale und Hindernisse zu
        berücksichtigen, müssen öffentliche Stellen die Interoperabilität neuer
        Dienste berücksichtigen.
      </p>
      <DetailsSummary title="Welche positiven Effekte sollen dadurch erreicht werden?">
        <div className="space-y-8">
          <p>
            Regelungen, die Interoperabilität berücksichtigen, erleichtern den
            Datenaustausch und die Wiederverwendung von Lösungen, indem sie
            bürokratische Hürden abbauen. Dies spart Kosten und Zeit für
            Bürgerinnen und Bürger, Unternehmen und Verwaltungen. Bis 2030 soll
            eine verbesserte Interoperabilität öffentliche Verwaltungen enger
            vernetzen und transeuropäische digitale Dienste fördern.
          </p>
          <p>Quellen:</p>
          <ul>
            <li>
              <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903">
                EUR Lex - Verordnung für ein interoperables Europa (EU) 2024/903
              </NewTabLink>
            </li>
            <li>
              <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
                Interoperable Europe Portal - FAQs
              </NewTabLink>
            </li>
          </ul>
        </div>
      </DetailsSummary>
    </div>

    <div className="space-y-8">
      <Heading tagName="h3">
        So stehen Interoperabilität und Digitaltauglichkeit zueinander
      </Heading>
      <Image
        className="max-w-a11y w-full py-16"
        url={assetPath(
          "/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit-old.png",
        )}
        alternativeText="Zusammenhang zwischen Digitaltauglichkeit und EU-Interoperabilität. Zwei sich überschneidende Kreise. In der Schnittmenge sind EU-weite digitale Verwaltungsdienste"
      />
      <p>
        Es gibt eine große Schnittmenge zwischen der EU-Interoperabilität und
        Digitaltauglichkeit. Daher sind die{" "}
        <strong>
          Aspekte der Interoperabilität in die Prinzipien für digitaltaugliche
          Gesetzgebung integriert
        </strong>{" "}
        worden.
      </p>
      <p>
        Da sich die Interoperabilitäts-Verordnung auf digitale
        Verwaltungsdienste bezieht,{" "}
        <strong>
          hat jedes Vorhaben mit Interoperabilitätsbezug auch Digitalbezug
        </strong>
        {". "}
        Umgekehrt gilt das nicht zwingend.
      </p>
      <p>
        Mit Hilfe der <strong>Vorprüfung</strong> können Sie feststellen, ob
        Ihre Regelung die Anforderungen an Interoperabilität erfüllt.
      </p>
      <p>
        Hier gelangen Sie zur{" "}
        <Link className="text-link" to={ROUTE_PRECHECK.url}>
          Vorprüfung
        </Link>
        .
      </p>
    </div>

    <div className="space-y-8">
      <Heading tagName="h3">
        Das soll mit Interoperabilitäts-Bewertungen erreicht werden
      </Heading>
      <p>
        Die{" "}
        <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
          Interoperabilitäts-Bewertung
        </NewTabLink>{" "}
        ist wie auch die Digitalcheck-Dokumentation ein formeller, letzter
        Schritt, in dem Sie einige Fragen zu Inhalten der Regelung beantworten.
      </p>
      <p>
        Wichtig ist, dass Sie die Interoperabilität von Anfang an mitdenken. So
        schaffen Sie die rechtliche Grundlage für Behörden, um europaweit Daten
        auszutauschen und funktionierende, grenzüberschreitende
        Verwaltungsleistungen anzubieten.
      </p>
      <p>
        Dabei helfen Ihnen die{" "}
        <Link className="text-link" to={ROUTE_METHODS_PRINCIPLES.url}>
          5 Prinzipien für digitaltaugliche, interoperable Regelungen
        </Link>
        . Auch{" "}
        <Link className="text-link" to={ROUTE_EXAMPLES_VISUALISATIONS.url}>
          Prozessvisualisierungen
        </Link>{" "}
        sind hilfreich, z.B. um grenzüberschreitende Datenflüsse zu
        identifizieren. Die Vorgehensweise ist also ganz ähnlich zur bekannten
        Arbeit an digitaltauglichen Regelungen.
      </p>
      <p>
        Die Interoperabilitäts-Bewertung ist schließlich ein Online-Formular auf{" "}
        <NewTabLink to="https://interoperable-europe.ec.europa.eu/">
          interoperable Europe-Portal
        </NewTabLink>{" "}
        in dem Sie darzulegen, wie sich Ihre Regelung auf die EU-weite
        Interoperabilität auswirkt: Der wesentliche Inhalt besteht aus fünf
        Fragen. Die Bewertung fragt nach sogenannten „
        <Link
          className="text-link"
          to={getTabAnchorLink(
            tabIds.backgroundTabId,
            "verbindliche-anforderungen",
          )}
          reloadDocument
        >
          verbindlichen Anforderungen
        </Link>
        “ und prüft deren Einfluss auf die{" "}
        <Link
          className="text-link"
          to={getTabAnchorLink(
            tabIds.backgroundTabId,
            "vier-ebenen-der-interoperabilitaet",
          )}
          reloadDocument
        >
          vier Ebenen der Interoperabilität
        </Link>
        .
      </p>
      <DetailsSummary title="Wie sind die Inhalte der Interoperabilitäts-Bewertung?">
        <ol>
          <li>
            Allgemeine Angaben
            <ul>
              <li>Angaben zur einreichenden Stelle</li>
              <li>Betreffende Initiative, Projekt oder Maßnahme</li>
            </ul>
          </li>
          <li>
            Anforderungen
            <ul>
              <li>Bewertete verbindliche Anforderungen</li>
              <li>
                Festgestellte Auswirkungen auf die grenzüberschreitende
                Interoperabilität
              </li>
            </ul>
          </li>
          <li>
            Ergebnisse
            <ul>
              <li>
                Lösungen für ein interoperables Europa, die genutzt werden
                sollen
              </li>
              <li>
                andere einschlägige Interoperabilitätslösungen, einschließlich
                Maschine-Maschine-Schnittstellen (Sofern zutreffend)
              </li>
              <li>
                Verbleibende Hindernisse für die grenzüberschreitende
                Interoperabilität
              </li>
            </ul>
          </li>
        </ol>
      </DetailsSummary>
    </div>

    <div>
      <p className="mb-24">
        Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter:{" "}
        <Link
          to={`mailto:${contact.interoperabilityEmail}?subject=Supportanfrage:%20digitalcheck.bund.de`}
          className="ds-link-01-bold"
        >
          {contact.interoperabilityEmail}
        </Link>{" "}
        oder rufen Sie uns an unter{" "}
        <Link to={contact.phone} className="ds-link-01-bold">
          {contact.phoneDisplay}
        </Link>
        .
      </p>

      <p>Weitere Quellen:</p>
      <ul>
        <li>
          <NewTabLink to="https://ec.europa.eu/isa2/eif_en/">
            European Commission - European Interoperability Framework
          </NewTabLink>
        </li>
        <li>
          <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
            Interoperable Europe Portal - FAQs
          </NewTabLink>
        </li>
      </ul>
    </div>

    <div className="space-y-8">
      <Heading tagName="h3" id="verbindliche-anforderungen">
        Verbindliche Anforderungen: In diesen Fällen ist eine
        Interoperabilitätsbewertung verpflichtend
      </Heading>
      <p>
        Eine Interoperabilitäts-Bewertung muss für Regelungen durchgeführt
        werden, wenn:
      </p>
      <ul>
        <li>eine (neue) verbindliche Anforderung definiert wird,</li>
        <li>
          ein oder mehrere transeuropäische digitale öffentliche Dienste
          betroffen sind, das heißt
          <ul>
            <li>eine digitale Umsetzung vorgesehen oder davon betroffen ist</li>
            <li>
              ein Austausch von Daten und Informationen zwischen Verwaltungen
              der EU-Mitgliedstaaten vorgesehen ist
            </li>
            <li>
              die Anforderung von einer öffentlichen Stelle oder einer
              Einrichtung der Union festgelegt werden.
            </li>
          </ul>
        </li>
      </ul>

      <DetailsSummary title="Was ist eine verbindliche Anforderung?">
        <div className="space-y-8">
          <p>
            Eine <strong>verbindliche Anforderung</strong> ist eine
            verpflichtende Regel. Das kann z.B. eine Definition, ein Standard,
            eine Richtlinie, ein Verbot oder eine Beschränkung sein. Eine exakte
            Definition finden Sie in der{" "}
            <NewTabLink to="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903">
              Verordnung in der Präambel, Erwägungsgrund 18
            </NewTabLink>
            .
          </p>
          <p>
            Falls sich eine Berichtspflicht an die Europäische Kommission
            ergibt, dann unterstützt Sie das Digitalcheck-Team dabei, die
            Interoperabilitätsbewertung durchzuführen, sie zu dokumentieren und
            den Bericht einzureichen.
          </p>
          <p>Weitere Quellen:</p>
          <ul>
            <li>
              <NewTabLink to="https://ec.europa.eu/isa2/eif_en/">
                European Commission - European Interoperability Framework
              </NewTabLink>
            </li>
            <li>
              <NewTabLink to="https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs">
                Interoperable Europe Portal - FAQs
              </NewTabLink>
            </li>
          </ul>
        </div>
      </DetailsSummary>
      <ImageZoomable
        image={{
          url: assetPath(
            "/images/kriterien-interoperabilitaetsbewertung-entscheidungsbaum.png",
          ),
          alternativeText:
            "Ein Entscheidungsdiagramm zur Bestimmung der Verpflichtung zur Interoperabilitätsbewertung. Es beginnt mit der Frage, ob es sich um eine verbindliche Anforderung handelt. Je nach Antwort folgen verschiedene Entscheidungsstufen: Offenheit für Änderungen, Verpflichtung, digitale öffentliche Dienstleistungen, betroffene Akteure und Notwendigkeit des Austauschs in Netzwerken oder Informationssystemen. Wenn alle Bedingungen erfüllt sind, führt der Prozess zur verpflichtenden Interoperabilitätsbewertung. Andernfalls ist sie nicht verpflichtend.",
        }}
      />
    </div>

    <div className="space-y-8">
      <Heading tagName="h3" id="vier-ebenen-der-interoperabilitaet">
        Die vier Ebenen der Interoperabilität
      </Heading>
      <p>
        Der{" "}
        <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail">
          Europäische Interoperabilitäts-Rahmen (EIF)
        </NewTabLink>{" "}
        definiert vier Ebenen der Interoperabilität, die bei der Gesetzgebung
        berücksichtigt werden müssen:
      </p>
      <ul>
        <li>
          <strong>Rechtliche Interoperabilität</strong>: Gesetze sollten die
          Grundlage für grenzüberschreitenden Datenaustausch schaffen.
          Regelungen sollten sich dabei nicht gegenseitig widersprechen, sondern
          gegenseitige Anerkennung sicherstellen und dafür sorgen, dass
          rechtliche Rahmenbedingungen jeweils zusammen passen.
        </li>
        <li>
          <strong>Organisatorische Interoperabilität</strong>: Gesetze sollten
          die Zusammenarbeit zwischen den Verwaltungsstellen fördern, indem sie
          gemeinsame Geschäftsprozesse und Modelle festlegen. Dies beinhaltet
          die Koordination von Aufgaben und die Klärung der Rollen.
        </li>
        <li>
          <strong>Semantische Interoperabilität</strong>: Gesetze sollten die
          Verwendung gemeinsamer Vokabulare und Datenformate vorschreiben, um
          sicherzustellen, dass die Bedeutung der ausgetauschten Daten von allen
          Systemen die gleiche ist.
        </li>
        <li>
          <strong>Technische Interoperabilität</strong>: Technische Standards,
          Schnittstellen und Komponenten sollten aufeinander abgestimmt sein,
          damit Datenaustausch zwischen Diensten in Europa ermöglichen.
        </li>
      </ul>
    </div>
    <Image
      className="max-w-a11y w-full py-16"
      url={assetPath("/images/ebenen-der-interoperabilitaet.jpg")}
      alternativeText="Die Grafik veranschaulicht die vier Ebenen der Interoperabilität mit Symbolen und kurzen Erklärungen. Die rechtliche Interoperabilität (dunkelblau, Waage-Icon) definiert die gesetzlichen Grundlagen für den Datenaustausch. Die organisatorische Interoperabilität (hellblau, vernetzte Personen) beschreibt die organisatorischen Prozesse. Die semantische Interoperabilität (graublau, Sprechblasen) stellt sicher, dass Daten und Begriffe einheitlich verstanden werden. Die technische Interoperabilität (hellgrau, Zahnräder) umfasst die technischen Systeme und Standards, die für den Datenaustausch erforderlich sind."
    />
  </section>
);
