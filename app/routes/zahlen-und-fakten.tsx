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
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { ROUTE_NUMBERS_FACTS } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

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
    title: "Anwendung des Digitalchecks",
    elements: [
      {
        badge: {
          Icon: LocalActivityOutlined,
          text: "Digitalcheck",
        },
        count: "850+",
        description: "Regelungen wurden auf Digitalbezug geprüft.",
      },
      {
        badge: {
          Icon: LocalActivityOutlined,
          text: "Digitalcheck",
        },
        count: "470+",
        description: "Regelungen sind den gesamten Digitalcheck durchlaufen.",
      },
      {
        badge: {
          Icon: LocalActivityOutlined,
          text: "Digitalcheck",
        },
        count: "120+",
        description:
          "Visualisierungen wurden erstellt und dem Regelungstext beigefügt.",
      },
    ],
  },
  {
    title: "Beratung & Schulungen",
    elements: [
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "400+",
        description:
          "Ministeriums-mitarbeitende wurden durch das Digitalcheck-Team geschult.",
      },
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "15+",
        description: "Regelungsvorhaben wurden durch Tasks Forces begleitet.",
      },
      {
        badge: {
          Icon: VolunteerActivismOutlined,
          text: "Unterstützung",
        },
        count: "170+",
        description:
          "Service Anrufe & Mails wurden vom Digitalcheck-Team bearbeitet.",
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
        description: "Vorhaben mit Interoperabilitätsbezug wurden eingereicht.",
      },
      {
        badge: {
          Icon: StarOutlineOutlined,
          text: "Interoperabilität",
        },
        count: "18",
        description:
          "Interoperabilitäts-beratunggespräche hat das Team durchgeführt.",
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
          "Interministerielle Arbeitsgruppen haben zum Austausch & Vernetzung stattgefunden.",
      },
    ],
  },
];

export default function ZahlenUndFakten() {
  return (
    <>
      <MetaTitle prefix={ROUTE_NUMBERS_FACTS.title} />
      <main>
        <Hero title="Der Digitalcheck in Zahlen">
          <RichText
            markdown={dedent`
          So wird der Digitalcheck in der Praxis genutzt: Hier finden Sie
          aktuelle Daten zur Anwendung, unseren Unterstützungsangeboten und der
          ressortübergreifenden Vernetzung.
          
          Stand der Datenerhebung: 01.01.2023
          `}
          />
        </Hero>

        <ContentWrapper className="space-y-80">
          {dsData.map(({ title, elements }) => (
            <Fragment key={title}>
              <Heading tagName="h2" className="mb-40">
                {title}
              </Heading>
              <ul className="list-unstyled grid items-stretch justify-between gap-40 sm:grid-cols-2 lg:grid-cols-3">
                {elements.map((el, i) => (
                  <li
                    key={`${el.badge.text}-${i}`}
                    className="min-w-240 space-y-16 bg-blue-100 px-32 py-40"
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
      </main>
    </>
  );
}
