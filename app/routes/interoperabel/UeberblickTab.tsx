import {
  interoperabel,
  methoden_fuenfPrinzipien,
  vorpruefung,
} from "@/config/routes";
import { ContactPhoneOutlined } from "@digitalservicebund/icons";
import { LinkButton } from "~/components/Button";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox.tsx";
import NewTabLink from "~/components/NewTabLink";
import Timeline from "~/components/Timeline";
import { contact } from "~/resources/content/shared/contact";
import { Link } from "~/utils/routerCompat";
import { getTabAnchorLink } from "~/utils/tabs";
import { tabIds } from "./tabIds";

export const anchors = {
  assessment: "bewertung",
};
export const directLinks = {
  assessment:
    interoperabel.path +
    getTabAnchorLink(tabIds.overviewTabId, anchors.assessment),
};

export const UeberblickTab = () => (
  <section className="space-y-40">
    <Heading tagName="h2">Überblick</Heading>

    <div className="space-y-8">
      <Heading tagName="h3">Koordination ist der Schlüssel</Heading>
      <p>
        Damit ein digitales Europa ohne Grenzen Wirklichkeit wird, müssen die
        Mitgliedsstaaten verbindlich koordiniert zusammenarbeiten. Die
        Verordnung soll Insellösungen verhindern und schafft deshalb einen
        gemeinsamen Rahmen für die Zusammenarbeit. Seit Anfang 2025 sind die
        Mitgliedsstaaten verpflichtet, Anforderungen an die Interoperabilität zu
        berücksichtigen.
      </p>
    </div>

    <div className="space-y-8">
      <Heading tagName="h3">
        Was bedeutet das für die Erarbeitung von Regelungen?
      </Heading>
      <p>
        Für Sie bedeutet das, dass Sie grenzüberschreitende Auswirkungen eines
        Regelungsvorhaben einschätzen sollten, bevor Regelungen geschrieben
        werden. Denn nur wenn Sie die Interoperabilität von Anfang an mitdenken,
        schaffen Sie die rechtliche Grundlage für Behörden, um europaweit Daten
        auszutauschen und funktionierende, grenzüberschreitende
        Verwaltungsleistungen anzubieten. Abschließend dokumentieren Sie in
        einem Fragebogen auf dem{" "}
        <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
          interoperable Europe-Portal
        </NewTabLink>
        , wie sich die Regelungsinhalte sich auf die Interoperabilität
        auswirken.
      </p>
    </div>

    <div className="space-y-8">
      <Heading tagName="h4" className="font-bold">
        Fragen sie sich:
      </Heading>
      <ul>
        <li>
          Können nach der aktuellen Rechtslage andere EU-Bürgerinnen und -Bürger
          ein digitales Angebot in diesem Zusammenhang nutzen?
        </li>
        <li>Was ist nötig, um das zu ermöglichen?</li>
      </ul>
    </div>

    <div className="space-y-8" id={anchors.assessment}>
      <Heading tagName="h3">Die Interoperabilitäts-Bewertung</Heading>
      <p>
        Die{" "}
        <NewTabLink to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission">
          Interoperabilitäts-Bewertung
        </NewTabLink>{" "}
        ist wie auch die Digitalcheck-Dokumentation ein formeller, letzter
        Schritt, in dem Sie einige Fragen zu Inhalten der Regelung beantworten.
        Es geht darum, darzulegen, wie sich Ihre Regelung auf die EU-weite
        Interoperabilität auswirkt. Der wesentliche Inhalt besteht aus fünf
        Fragen. Die Bewertung fragt nach sogenannten „
        {/* TODO: helper function for links */}
        <Link
          className="text-link"
          to={getTabAnchorLink(
            tabIds.backgroundTabId,
            "verbindliche-anforderungen",
          )}
          reloadDocument
        >
          {" "}
          {/* TODO: add link */}
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
          {" "}
          {/* TODO: add link */}
          vier Ebenen der Interoperabilität
        </Link>
        .
      </p>
      <LinkButton
        look="tertiary"
        to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission"
        target="_blank"
        className="mt-16"
      >
        Zur Interoperabilitäts-Bewertung
      </LinkButton>
    </div>

    <Heading tagName="h3" className="mt-80">
      Der Ablauf im Überblick
    </Heading>
    <Timeline>
      <Timeline.Item bullet>
        <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
          <Heading tagName="h4" className="ds-heading-03-reg">
            Führen Sie die Vorprüfung durch
          </Heading>
          <p>
            Finden Sie in der{" "}
            <Link className="text-link" to={vorpruefung.path}>
              Vorprüfung
            </Link>{" "}
            in 6 Fragen heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der
            digitalen Umsetzung und EU-Anforderungen an Interoperabilität
            beachten müssen.
          </p>
          <p>
            Wenn Sie EU-Anforderungen an Interoperabilität beachten müssen,
            meldet sich das Digitalcheck-Team bei Ihnen für kostenlose,
            vertrauliche Unterstützung.
          </p>
        </Timeline.ItemContent>
      </Timeline.Item>

      <Timeline.Item bullet>
        <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
          <Heading tagName="h4" className="ds-heading-03-reg">
            Erarbeiten Sie die Regelung
          </Heading>
          <p>
            Erarbeiten Sie Ihre Regelung anhand der{" "}
            <Link className="text-link" to={methoden_fuenfPrinzipien.path}>
              Fünf Prinzipien für digitaltaugliche Gesetzgebung
            </Link>
            . Diese enthalten die Anforderungen an die Interoperabilität. So
            stellen Sie sicher, dass Ihre Regelung sowohl digitaltauglich als
            auch interoperabel ist. Kostenlose, vertrauliche Unterstützung
            erhalten Sie vom Digitalcheck-Team.
          </p>
        </Timeline.ItemContent>
      </Timeline.Item>

      <Timeline.Item bullet>
        <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
          <Heading tagName="h4" className="ds-heading-03-reg">
            Optional: Lösungen für ein interoperables Europa nutzen
          </Heading>
          <p>
            Lösungen für ein interoperables Europa (Art. 7 EU 2024/903) sind
            technische Standards für den grenzüberschreitenden Datenaustausch
            zwischen Verwaltungseinheiten. Das Interoperable Europe Board legt
            fest, welche Lösungen zu prüfen sind. Mehr dazu im Reiter
            <strong>„Interoperable Lösungen”</strong>
          </p>
        </Timeline.ItemContent>
      </Timeline.Item>

      <Timeline.Item bullet>
        <Timeline.ItemContent backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48">
          <Heading tagName="h4" className="ds-heading-03-reg">
            Reichen Sie die Interoperabilitäts-Bewertung ein
          </Heading>
          <p>
            Sie dokumentieren in einem Fragebogen auf dem{" "}
            <NewTabLink
              className="text-link"
              to="https://interoperable-europe.ec.europa.eu/collection/assessments/submission"
            >
              interoperable Europe-Portal
            </NewTabLink>
            , wie sich die Regelungsinhalte sich auf die Interoperabilität
            auswirken.
          </p>
        </Timeline.ItemContent>
      </Timeline.Item>
    </Timeline>

    <LinkButton to={vorpruefung.path}>Anforderungen prüfen</LinkButton>

    <InfoBox
      look="highlight"
      heading={{
        text: "Unterstützung durch das Team des Digitalcheck",
      }}
      visual={{ Icon: ContactPhoneOutlined, type: "icon" }}
    >
      <p>
        Das Digitalcheck-Team unterstützt Sie im gesamten Prozess. Wir helfen
        bei Fragen zur Interoperabilität, beim Ausfüllen der Bewertung und beim
        Identifizieren{" "}
        <Link
          to={getTabAnchorLink("hintergrund", "verbindliche-anforderungen")}
          className="text-link"
          reloadDocument
        >
          verbindlicher Anforderungen
        </Link>{" "}
        – inklusive ihrer Auswirkungen auf die vier{" "}
        <Link
          to={getTabAnchorLink(
            "hintergrund",
            "vier-ebenen-der-interoperabilitaet",
          )}
          className="text-link"
          reloadDocument
        >
          Interoperabilitätsebenen
        </Link>
        .
      </p>
      <p>
        <strong>Rufen Sie uns an:</strong>{" "}
        <Link className="text-link" to={contact.phone}>
          {contact.phoneDisplay}
        </Link>
        <br />
        Schreiben Sie uns - egal ob Legist oder Institution:{" "}
        <Link
          className="text-link"
          to={`mailto:${contact.interoperabilityEmail}`}
        >
          {contact.interoperabilityEmail}
        </Link>
      </p>
    </InfoBox>
  </section>
);
