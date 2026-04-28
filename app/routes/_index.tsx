import { Close as CloseIcon } from "@digitalservicebund/icons";
import { ContactPhoneOutlined as ContactPhoneOutlinedIcon } from "@digitalservicebund/icons";
import { Dvr as DvrIcon } from "@digitalservicebund/icons";
import { FactCheckOutlined as FactCheckOutlinedIcon } from "@digitalservicebund/icons";
import { WidgetsOutlined as WidgetsOutlinedIcon } from "@digitalservicebund/icons";
import { useState } from "react";
import Badge from "~/components/Badge";
import Button, { LinkButton } from "~/components/Button";
import Heading from "~/components/Heading";
import { BreakoutHero } from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_METHODS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_VISUALIZE,
  ROUTE_PRECHECK,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

const steps = [
  {
    number: 1,
    title: "Digitalbezug einschätzen",
    link: {
      text: "Digitalbezug einschätzen",
      to: ROUTE_PRECHECK.url,
      look: "primary" as const,
      plausibleEventName: "Content.Schritte.Button+Vorprüfung",
    },
    procedure:
      "Sie identifizieren Digitalbezug und Inter&shy;operabilitäts&shy;an&shy;for&shy;der&shy;un&shy;gen für Ihr Vorhaben.",
    duration: "Wenige Minuten",
    result: dedent`
      - Individueller Digital- und Interoperabilitätsbezug
      - Ergebnis als E-Mail zum Versenden an den Nationalen Normenkontrollrat
    `,
  },
  {
    number: 2,
    title: "Digitaltauglichkeit der Regelung sicherstellen",
    link: {
      text: "Regelung erarbeiten",
      to: ROUTE_METHODS.url,
      look: "tertiary" as const,
      plausibleEventName: "Content.Schritte.Link+Erarbeiten",
    },
    procedure:
      "Bei einer positiven Vorprüfung wenden Sie die Werkzeuge und Methoden an, die die Digitaltauglichkeit Ihres Vorhabens sicherstellen.",
    duration: "Punktuell über die gesamte Zeit der Regelungsausarbeitung",
    result: dedent`
      - Ihre Regelung wird digitaltauglich
      - Visualisierungen zur digitaltauglichen Umsetzung Ihrer Regelung
    `,
  },
  {
    number: 3,
    title: "Dokumentieren der Digitaltauglichkeit",
    link: {
      text: "Dokumentation erstellen",
      to: ROUTE_DOCUMENTATION.url,
      look: "tertiary" as const,
      plausibleEventName: "Content.Schritte.Link+Dokumentieren",
    },
    procedure:
      "Sie dokumentieren, wie Sie Digitaltauglichkeit in Ihrer Regelung sichergestellt haben.",
    procedureHighlight: { badge: "NEU", text: "Jetzt auch online ausfüllbar." },
    duration: "Ein bis zwei Stunden",
    result: dedent`
      - Ausgefülltes Word-Dokument, welches Sie dem Nationalen Normenkontrollrat senden
      - Ihr Vorhaben ist formal bereit für die Ressortabstimmung
    `,
  },
];

export default function Index() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <MetaTitle />
      <main className="breakout-grid">
        <BreakoutHero
          title="Digitaltaugliche Regelungen erarbeiten"
          subtitle="Der Digitalcheck ist eine Prozessbegleitung für Ihr Regelungsvorhaben. Sie stellen damit Digitaltauglichkeit sicher."
          className="bg-blue-800 text-white"
        />

        <div className="py-40 lg:py-80">
          <Heading tagName="h2" text="Schritt für Schritt" className="mb-40" />

          <div className="relative">
            <div className="absolute h-16 w-16 rounded-full bg-blue-300 max-lg:-bottom-8 max-lg:left-10 lg:-top-6 lg:-right-1" />
            <ol className="list-unstyled max-w-none max-lg:mx-16 lg:grid lg:grid-flow-col lg:grid-cols-3 lg:grid-rows-[repeat(6,auto)]">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="relative border-blue-300 max-lg:border-l-3 max-lg:pb-40 max-lg:pl-40 lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:border-t-3 lg:pr-40"
                >
                  <div className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-blue-800 font-bold text-white max-lg:-left-[22px] lg:-top-20">
                    {step.number}
                  </div>
                  <Heading
                    tagName="h3"
                    text={step.title}
                    className="ds-heading-03-bold lg:mt-40"
                  />
                  <div className="mt-40 self-center">
                    <LinkButton
                      to={step.link.to}
                      look={step.link.look}
                      plausibleEventName={step.link.plausibleEventName}
                    >
                      {step.link.text}
                    </LinkButton>
                  </div>
                  <div className="mt-40">
                    <p className="font-bold">Vorgehen:</p>
                    <RichText markdown={step.procedure} />
                    {step.procedureHighlight && (
                      <div className="ds-label-02-reg mt-16">
                        <Badge look="hint" className="mr-8">
                          {step.procedureHighlight.badge}
                        </Badge>
                        {step.procedureHighlight.text}
                      </div>
                    )}
                  </div>
                  <div className="mt-24 border-t-2 border-gray-400 pt-16">
                    <p className="font-bold">Dauer:</p>
                    <RichText markdown={step.duration} />
                  </div>
                  <div className="mt-24">
                    <p className="font-bold">Ergebnis:</p>
                    <RichText markdown={step.result} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="breakout space-y-40 bg-blue-100 py-40 lg:py-80">
          <Heading tagName="h2" text="Grundlagen zum Digitalcheck" />

          <InfoBox
            visual={{ type: "icon", Icon: WidgetsOutlinedIcon }}
            look="highlight"
            className="bg-white"
          >
            <Heading tagName="h3">
              Was ist Digitaltauglichkeit? Und wie unterstützt Sie der
              Digitalcheck dabei?
            </Heading>
            <RichText markdown="Digitaltaugliche Regelungen ermöglichen eine rechtlich und technisch reibungslose digitale Umsetzung und fördern die automatisierte Bearbeitung von Verfahrensschritten." />
            <InfoBox.LinkList
              links={[
                {
                  text: "Mehr zur Digitaltauglichkeit erfahren",
                  to: ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url,
                  plausibleEventName:
                    "Content.Grundlagen.Link+Digitaltauglichkeit",
                  look: "link",
                },
              ]}
            />
          </InfoBox>

          <InfoBox
            visual={{ type: "icon", Icon: FactCheckOutlinedIcon }}
            look="highlight"
            className="bg-white"
          >
            <Heading tagName="h3">
              Worauf achtet der Nationale Normenkontrollrat?
            </Heading>
            <RichText markdown="Der Nationale Normenkontrollrat (NKR) prüft das Vorhaben auf Digitaltauglichkeit. Mit der Anwendung der **Prinzipien** und Erstellung von **Visualisierungen** kann der Nationale Normenkontrollrat die Digitaltauglichkeit besser und schneller nachvollziehen." />
            <InfoBox.LinkList
              links={[
                {
                  text: "Mehr zum NKR erfahren",
                  to: ROUTE_FUNDAMENTALS_NKR.url,
                  plausibleEventName: "Content.Grundlagen.Link+NKR",
                  look: "link",
                },
              ]}
            />
          </InfoBox>
        </div>

        <div className="breakout bg-[url('/images/trainings.jpg')] bg-cover bg-center">
          <div className="py-40 lg:py-80">
            <InfoBoxSideBySide>
              <InfoBox look="method" className="bg-white">
                <Heading tagName="h3">
                  Das Potenzial von Visualisierungen nutzen
                </Heading>
                <RichText markdown="Visualisierungen helfen bestehende Abläufe Ihrer Regelung einfach sichtbar zu machen und Digitaltauglichkeit einzuschätzen." />
                <InfoBox.LinkList
                  links={[
                    {
                      text: "Zu Visualisierungen",
                      to: ROUTE_METHODS_VISUALIZE.url,
                      look: "tertiary",
                      plausibleEventName:
                        "Content.Teaser+Visualisierungen.Link+Visualisierungen",
                    },
                    {
                      text: "Beispiele",
                      to: ROUTE_EXAMPLES_VISUALISATIONS.url,
                      look: "ghost",
                      plausibleEventName:
                        "Content.Teaser+Visualisierungen.Link+Beispiele",
                    },
                  ]}
                />
              </InfoBox>

              <InfoBox look="method" className="bg-white">
                <Heading tagName="h3">
                  Prinzipien als Grundlage für Digitaltauglichkeit einsetzen
                </Heading>
                <RichText markdown="Fünf Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen." />
                <InfoBox.LinkList
                  links={[
                    {
                      text: "Zu den Prinzipien",
                      to: ROUTE_METHODS_PRINCIPLES.url,
                      look: "tertiary",
                      plausibleEventName:
                        "Content.Teaser+Prinzipien.Link+Prinzipien",
                    },
                    {
                      text: "Beispiele",
                      to: ROUTE_EXAMPLES_PRINCIPLES.url,
                      look: "ghost",
                      plausibleEventName:
                        "Content.Teaser+Prinzipien.Link+Beispiele",
                    },
                  ]}
                />
              </InfoBox>
            </InfoBoxSideBySide>
          </div>
        </div>

        <div className="space-y-48 py-40 lg:py-80">
          <InfoBox>
            <Heading tagName="h2">
              Individuelle Unterstützung für Ihr Vorhaben
            </Heading>
            <RichText markdown="Nutzen Sie unsere persönlichen Unterstützungsangebote, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Prozess erfolgreich zu durchlaufen." />
            <InfoBox.LinkList
              links={[
                {
                  text: "Angebote kennenlernen",
                  to: ROUTE_SUPPORT.url,
                  look: "tertiary",
                  plausibleEventName: "Content.Support.Button+Support",
                },
              ]}
            />
          </InfoBox>

          <InfoBox
            look="highlight"
            className="bg-blue-100"
            visual={{ type: "icon", Icon: ContactPhoneOutlinedIcon }}
          >
            <Heading tagName="h3" className="ds-heading-03-reg mb-16">
              „Der Digitalcheck erscheint mit den Hilfestellungen
              unkomplizierter als gedacht.“
            </Heading>
            <RichText markdown="**Referentin**<br>aus einem Bundesministerium" />
          </InfoBox>
        </div>
      </main>
      {showBanner && (
        <aside className="relative flex items-center justify-center gap-40 bg-yellow-200 p-24">
          <DvrIcon className="size-96 fill-yellow-300 max-md:hidden" />
          <div className="space-y-8">
            <Heading
              tagName="h2"
              look="ds-label-01-bold"
              className="flex gap-8 max-md:flex-col-reverse md:items-end"
            >
              Digitalcheck-Dokumentation: Jetzt online ausfüllen
              <Badge text="NEU" look="hint" />
            </Heading>

            <RichText
              markdown={
                "Dokumentieren wird einfacher für Sie - jetzt Schritt für Schritt mit Hilfestellungen ausfüllen: [Online-Dokumentation öffnen](/dokumentation)"
              }
            />
          </div>
          <Button
            look="ghost"
            onClick={() => setShowBanner(false)}
            className="absolute top-0 right-0 w-auto p-24"
            aria-label="Schließen"
            type="button"
          >
            <CloseIcon className="fill-blue-800" />
          </Button>
        </aside>
      )}
    </>
  );
}
