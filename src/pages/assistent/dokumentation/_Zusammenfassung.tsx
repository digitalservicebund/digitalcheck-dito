import {
  assistent_dokumentation_beteiligungsformate,
  assistent_dokumentation_euInteroperabilitaet,
  assistent_dokumentation_euInteroperabilitaet_organisatorisch,
  assistent_dokumentation_euInteroperabilitaet_rechtlich,
  assistent_dokumentation_euInteroperabilitaet_semantisch,
  assistent_dokumentation_euInteroperabilitaet_technisch,
  assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen,
  assistent_dokumentation_euInteroperabilitaet_veroeffentlichung,
  assistent_dokumentation_regelungsvorhaben,
  type Route,
} from "@/config/routes";
import {
  bereichOptions,
  bewertungOptions,
  ebeneFieldNames,
  isAnforderungFilled,
  prinzipFieldNames,
  veroeffentlichungOptions,
  type Ebene,
  type PrinzipOrder,
} from "@/wizard/dokumentationSchema";
import { wizardStores } from "@/wizard/stores";
import { useStore } from "@nanostores/react";
import { Fragment, type ReactNode } from "react";

/** Content of a Prinzip, passed from the page as islands can't read collections */
export type PrinzipSummary = {
  order: PrinzipOrder;
  name: string;
  path: string;
  /** Labels of the Schwerpunkte by their stored slug */
  schwerpunkte: Record<string, string>;
};

const toLabels = (options: readonly { value: string; label: string }[]) =>
  Object.fromEntries(options.map(({ value, label }) => [value, label]));

const bewertungLabels = toLabels(bewertungOptions);
const bereichLabels = toLabels(bereichOptions);
const veroeffentlichungLabels = toLabels(veroeffentlichungOptions);
const bezugLabels = { yes: "Ja", no: "Nein" };

// The questions of the levels' pages (see eu-interoperabilitaet/*.astro)
const ebenen = [
  {
    ebene: "rechtlich",
    route: assistent_dokumentation_euInteroperabilitaet_rechtlich,
    question:
      "Schafft das Regelungsvorhaben die rechtlichen Voraussetzungen für einen Datenaustausch innerhalb der EU?",
  },
  {
    ebene: "organisatorisch",
    route: assistent_dokumentation_euInteroperabilitaet_organisatorisch,
    question:
      "Schafft das Regelungsvorhaben die organisatorischen Voraussetzungen für einen Datenaustausch innerhalb der EU?",
  },
  {
    ebene: "semantisch",
    route: assistent_dokumentation_euInteroperabilitaet_semantisch,
    question:
      "Stellt das Regelungsvorhaben sicher, dass semantische Definitionen von Begriffen und Datenfeldern den Datenaustausch über EU-Grenzen ermöglichen?",
  },
  {
    ebene: "technisch",
    route: assistent_dokumentation_euInteroperabilitaet_technisch,
    question:
      "Schafft das Regelungsvorhaben die technischen Voraussetzungen für einen Datenaustausch innerhalb der EU?",
  },
] as const satisfies { ebene: Ebene; route: Route; question: string }[];

/** Empty answers count as missing */
const filled = (value: string | undefined) =>
  value?.trim() ? value : undefined;

function Missing({ children }: { children: ReactNode }) {
  return (
    <span className="kern-badge kern-badge--warning">
      <span className="kern-icon kern-icon--warning" aria-hidden="true" />
      <span className="kern-label">{children}</span>
    </span>
  );
}

// An undefined value is an unanswered question, false skips a question that
// isn't asked for the given answers (like <ShowIf> on the pages)
type Entry = readonly [key: string, value: ReactNode] | false;

function DescriptionList({ entries }: { entries: Entry[] }) {
  return (
    <dl className="kern-description-list">
      {entries
        .filter((entry) => entry !== false)
        .map(([key, value]) => (
          <div key={key} className="kern-description-list-item">
            <dt className="kern-description-list-item__key">{key}</dt>
            <dd className="kern-description-list-item__value whitespace-pre-line">
              {value ?? (
                <Missing>
                  Sie haben diesen Punkt noch nicht vollständig bearbeitet.
                </Missing>
              )}
            </dd>
          </div>
        ))}
    </dl>
  );
}

/**
 * Answers of one step with a link back to it. A step without any answer is
 * marked as a whole. Without a number, the title is only read out, as in the
 * design (e.g. EU-Interoperabilität, the only step of its kind).
 */
function Summary({
  number,
  title,
  path,
  entries = [],
  children,
}: {
  number?: number;
  title: string;
  path: string;
  entries?: Entry[];
  /** Replaces the entries, e.g. for lists */
  children?: ReactNode;
}) {
  const isStarted = entries.some((entry) => entry && entry[1] !== undefined);
  return (
    <div className="kern-summary">
      <div className={number ? "kern-summary__header" : "sr-only"}>
        <h3 className="kern-title kern-title--small kern-summary__title-wrapper">
          {number && <span className="kern-number">{number}</span>}
          <span>{title}</span>
        </h3>
      </div>
      <div className="kern-summary__body">
        {children ??
          (isStarted ? (
            <DescriptionList entries={entries} />
          ) : (
            <Missing>Sie haben diesen Punkt noch nicht bearbeitet.</Missing>
          ))}
        <div className="kern-summary__actions">
          <a href={path} className="kern-link">
            <span className="kern-icon kern-icon--edit" aria-hidden="true" />
            Bearbeiten<span className="sr-only">: {title}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Lists all answers of the Dokumentation, per step with a link to change them */
export default function Zusammenfassung({
  prinzipien,
}: {
  prinzipien: PrinzipSummary[];
}) {
  // Rendered client-only (no HTML from the build), so the stored data is known
  const data = useStore(wizardStores.dokumentation.$data);
  const isReachable = useStore(wizardStores.dokumentation.$isReachable);

  const bezug = data["eu-interoperabilitaet-bezug"];
  const anforderungen = (data["verbindliche-anforderungen"] ?? []).filter(
    isAnforderungFilled,
  );
  const status = data["veroeffentlichung-status"];

  return (
    <div className="space-y-32">
      <div className="kern-summary-group">
        <div className="kern-summary-group__header">
          <h2 className="kern-heading-medium">Prinzipien</h2>
        </div>
        <Summary
          number={1}
          title="Informationen zum Regelungsvorhaben"
          path={assistent_dokumentation_regelungsvorhaben.path}
          entries={[
            [
              "Titel des Regelungsvorhabens",
              filled(data["regelungsvorhaben-titel"]),
            ],
            [
              "Ministerium / Organisation",
              filled(data["regelungsvorhaben-organisation"]),
            ],
          ]}
        />
        <Summary
          number={2}
          title={assistent_dokumentation_beteiligungsformate.title}
          path={assistent_dokumentation_beteiligungsformate.path}
          entries={[
            ["Erklärung", filled(data["beteiligungsformate-erklaerung"])],
            ["Erkenntnisse", filled(data["beteiligungsformate-erkenntnisse"])],
          ]}
        />
        {prinzipien.map(({ order, name, path, schwerpunkte }) => {
          const names = prinzipFieldNames(order);
          const antwort = data[names.antwort];
          const selected = data[names.schwerpunkte] ?? [];
          return (
            <Summary
              key={order}
              number={order + 2}
              title={`Prinzip ${order}: ${name}`}
              path={path}
              entries={[
                [
                  "Wird dieses Prinzip erfüllt?",
                  antwort && bewertungLabels[antwort],
                ],
                antwort === "yes" && [
                  "Schwerpunkte",
                  selected.length > 0 ? (
                    <ul className="flex flex-wrap gap-8">
                      {selected.map((slug) => (
                        <li
                          key={slug}
                          className={`kern-badge kern-badge--prinzip-${order}`}
                        >
                          <span className="kern-label">
                            {schwerpunkte[slug] ?? slug}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : undefined,
                ],
                !!antwort && ["Erläuterung", filled(data[names.erklaerung])],
              ]}
            />
          );
        })}
      </div>

      <div className="kern-summary-group">
        <div className="kern-summary-group__header">
          <h2 className="kern-heading-medium">EU-Interoperabilität</h2>
        </div>
        <Summary
          title="Bezug zu EU-Interoperabilität"
          path={assistent_dokumentation_euInteroperabilitaet.path}
          entries={[
            [
              "Ergab die Vorprüfung Bezug zu EU-Interoperabilität?",
              bezug && bezugLabels[bezug],
            ],
          ]}
        />
        {/* The remaining steps only apply with EU-Bezug, see dokumentationFlow */}
        {isReachable(
          assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen.path,
        ) && (
          <>
            <Summary
              number={1}
              title={
                assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen.title
              }
              path={
                assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen.path
              }
            >
              {anforderungen.length > 0 ? (
                <div className="space-y-24">
                  {anforderungen.map((anforderung, index) => (
                    // Boxes have no ids, their order is stable on this page
                    <Fragment key={index}>
                      {index > 0 && <hr className="kern-divider" />}
                      <DescriptionList
                        entries={[
                          [
                            "Rechtsgrundlage",
                            filled(anforderung.rechtsgrundlage),
                          ],
                          [
                            "Kurzbeschreibung oder Titel",
                            filled(anforderung.titel),
                          ],
                          [
                            "Betroffene grenzüberschreitende digitale Verwaltungsdienste",
                            filled(anforderung.dienste),
                          ],
                          [
                            "Für welche Bereiche sind diese Dienste relevant?",
                            anforderung.bereiche.length > 0 ? (
                              <ul className="list-disc space-y-8 ps-24">
                                {anforderung.bereiche.map((bereich) => (
                                  <li key={bereich}>
                                    {bereichLabels[bereich]}
                                  </li>
                                ))}
                              </ul>
                            ) : undefined,
                          ],
                          [
                            "Für wen gilt diese verbindliche Anforderung?",
                            filled(anforderung.betroffene),
                          ],
                        ]}
                      />
                    </Fragment>
                  ))}
                </div>
              ) : (
                <Missing>Sie haben diesen Punkt noch nicht bearbeitet.</Missing>
              )}
            </Summary>
            {ebenen.map(({ ebene, route, question }, index) => {
              const names = ebeneFieldNames(ebene);
              const bewertung = data[names.bewertung];
              return (
                <Summary
                  key={ebene}
                  number={index + 2}
                  title={route.title}
                  path={route.path}
                  entries={[
                    [question, bewertung && bewertungLabels[bewertung]],
                    // Not asked for "Nicht relevant", see _EbenePage.astro
                    (bewertung === "yes" || bewertung === "no") && [
                      "Begründung",
                      filled(data[names.erklaerung]),
                    ],
                  ]}
                />
              );
            })}
            <Summary
              number={ebenen.length + 2}
              title={
                assistent_dokumentation_euInteroperabilitaet_veroeffentlichung.title
              }
              path={
                assistent_dokumentation_euInteroperabilitaet_veroeffentlichung.path
              }
              entries={[
                [
                  "Wann soll der Referentenentwurf voraussichtlich auf der Webseite Ihres Ministeriums veröffentlicht werden?",
                  status && veroeffentlichungLabels[status],
                ],
                // The date is optional, so it's only listed when given
                status === "planned" &&
                  !!filled(data["veroeffentlichung-datum"]) && [
                    "Voraussichtliches Veröffentlichungsdatum",
                    data["veroeffentlichung-datum"],
                  ],
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
