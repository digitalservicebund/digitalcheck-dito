import {
  LocalActivityOutlined,
  ShareOutlined,
  StarOutlineOutlined,
  VolunteerActivismOutlined,
} from "@digitalservicebund/icons";
import { FC, Fragment, SVGProps } from "react";
import Badge from "~/components/Badge";
import ContentWrapper from "~/components/ContentWrapper";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import { ROUTE_NUMBERS_FACTS } from "~/resources/staticRoutes";

type DsData = {
  title: string;
  elements: {
    badge: {
      Icon: FC<SVGProps<SVGSVGElement>>;
      text: string;
    };
    count: string;
    description: string;
  }[];
}[];

const dsData: DsData = [
  {
    title: "Digitalcheck und Visualisierungen (seit 2023)",
    elements: [
      {
        badge: {
          Icon: LocalActivityOutlined,
          text: "Regelungschecks",
        },
        count: "850+",
        description:
          "Regelungsvorhaben haben sich mit der digitalen Umsetzung auseinandergesetzt.",
      },
      {
        badge: {
          Icon: LocalActivityOutlined,
          text: "Regelungschecks",
        },
        count: "120+",
        description:
          "visualisierte Wirklogiken, durch die Komplexität reduziert und Verständlichkeit geschaffen wurde.",
      },
    ],
  },
  {
    title: "Wissenstransfer und Unterstützung (seit 2023)",
    elements: [
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "400+",
        description:
          "geschulte Mitarbeitende: Seit 2023 gibt es Schulungen und Roadshows zu Visualisierungen und Digitaltauglichkeit, in denen wir langfristige Kompetenzen aufbauen.",
      },
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "15+",
        description:
          "Begleitungen durch interdisziplinäre Teams: Bei besonders komplexen Vorhaben standen unsere Taskforces den Legistinnen und Legisten direkt zur Seite.",
      },
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "170+",
        description:
          "Service-Anfragen: Der kurze Dienstweg zu Expertinnen und Experten, für Fragen und Sparring.",
      },
    ],
  },
  {
    title: "Fokusfeld Interoperabilität (seit Juni 2025)",
    elements: [
      {
        badge: {
          Icon: StarOutlineOutlined,
          text: "Interoperabilität",
        },
        count: "17",
        description:
          "Vorhaben hatten einen Interoperabilitätsbezug und wurden zur Transparenz auf EU-Ebene eingereicht.",
      },
      {
        badge: {
          Icon: StarOutlineOutlined,
          text: "Interoperabilität",
        },
        count: "18",
        description:
          "ausführliche Beratungsfälle zum Thema Interoperabilität hat das Team durchgeführt.",
      },
    ],
  },
  {
    title: "Ressortübergreifende Vernetzung",
    elements: [
      {
        badge: {
          Icon: ShareOutlined,
          text: "Vernetzung",
        },
        count: "20+",
        description:
          "Interministerielle Arbeitsgruppen haben die Erarbeitung des Digitalcheck begleitet.",
      },
    ],
  },
];

export default function ZahlenUndFakten() {
  return (
    <>
      <MetaTitle prefix={ROUTE_NUMBERS_FACTS.title} />
      <ContentWrapper className="space-y-80">
        <div>
          <h1>Das Zentrum für Legistik in Zahlen</h1>
          <div className="mt-16 space-y-8">
            <p>
              Seit Januar 2023 setzt die Bundesregierung den Fokus auf
              digitaltaugliche Regelungen (Digitalcheck) und begleitet
              Legistinnen und Legisten in den Bundesministerien auf dem Weg
              dorthin.
            </p>
            <p>2026 markiert den Beginn des Zentrum für Legistik.</p>
            <p>
              Die Daten auf dieser Seite zeigen, wie unsere Instrumente und
              Unterstützungsangebote – zum Beispiel Digitalcheck, Begleitungen,
              Schulungen und Prozessvisualisierung – die Gesetzgebung in der
              Praxis verändern. Die verschiedenen Werkzeuge und Prozesse der
              Frühphase werden jetzt im Zentrum für Legistik schrittweise
              zusammengeführt und weiterentwickelt.
            </p>
          </div>
        </div>
        {dsData.map(({ title, elements }) => (
          <Fragment key={title}>
            <Heading tagName="h2" className="mb-40">
              {title}
            </Heading>
            <ul className="list-unstyled grid items-stretch justify-between gap-40 sm:grid-cols-2 lg:grid-cols-3">
              {elements.map((el, i) => (
                <li
                  key={`${el.badge.text}-${i}`}
                  className="bg-zfl-main20 min-w-240 space-y-16 px-32 py-40"
                >
                  <Badge look="white" Icon={el.badge.Icon}>
                    {el.badge.text}
                  </Badge>
                  <p>
                    <strong className="ds-heading-02-bold">{el.count}</strong>
                  </p>
                  <p>{el.description}</p>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </ContentWrapper>
    </>
  );
}
