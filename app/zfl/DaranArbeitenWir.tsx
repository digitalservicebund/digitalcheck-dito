import { JSX } from "react";
import { data } from "react-router";
import Container from "~/components/Container.tsx";
import Hero from "~/components/Hero.tsx";
import RichText from "~/components/RichText.tsx";
import getFeatureFlag from "~/utils/featureFlags.server.ts";
import { features } from "~/utils/featureFlags.ts";
import MetaTitle from "~/zfl/ZFLMeta.tsx";
import { ROUTE_ZFL_DARAN_ARBEITEN_WIR } from "~/zfl/routes.ts";

const generateMailtoLink = (topic: string) => {
  const subject = `Interesse am Thema "${topic}"`;
  return `mailto:support@zfl.bund.de?subject=${encodeURIComponent(subject)}`;
};

const content = `
Das Zentrum für Legistik wird gemeinsam mit Ihnen als Legistinnen und Legisten weiterentwickelt. Wir passen unsere Unterstützungsangebote regelmäßig an Ihre Rückmeldungen und die Erfahrungen aus der Praxis an. So stellen wir sicher, dass die angebotenen Hilfen tatsächlich Ihren Arbeitsalltag erleichtern.

Wir möchten Sie einladen, uns Rückmeldung zu unseren Angeboten zu geben oder an kurzen Praxistests teilzunehmen. Ihr Erfahrungswissen hilft uns, die Hilfsmittel und Werkzeuge so zu gestalten, dass sie in der täglichen Arbeit tatsächlich nützlich sind. Der zeitliche Aufwand ist überschaubar und wird vorab mit Ihnen abgestimmt.

Kontaktieren Sie uns zu diesem Zweck unter [0151 / 4076 7839](tel:+4915140767839) oder [support@zfl.bund.de](mailto:support@zfl.bund.de).

## Aktuelle Arbeitspakete in Konzeption und Umsetzung

*In dieser Phase erarbeiten wir fachliche Anforderungen, prüfen Lösungswege und stellen die Inhalte dann zur Nutzung bereit. Ihr Rückmeldungen an dieser Stelle stellt die Praxistauglichkeit sicher.*

- **Strukturierung der Frühphase für Regelungsvorhaben:** Ein gutes, frühzeitiges Verständnis von Anforderungen und Umfeld ist die Basis dafür, Gesetze wirksam und effizient umzusetzen. Wie können wir diese frühe Phase in der Rechtsetzung, für Legistinnen und Legisten, besser strukturieren und unterstützen?<br>
[Kontakt aufnehmen zu diesem Thema](${generateMailtoLink("Strukturierung der Frühphase für Regelungsvorhaben")})

- **Konsolidierung der Instrumente:** Unterschiedliche Checks und Arbeitshilfen (wie z.B. der [Digitalcheck](https://digitalcheck.bund.de/) oder [Jugendcheck](https://jugend-check.de/)) zielen in Teilen auf die gleiche Wirkung ab: Praxis- und digitaltaugliche Regelungen und Bürokratierückbau. Bei der Zusammenführung diverser Ansätze verfolgen wir das Ziel, Ihre Regelungsarbeit einfacher und effizienter zu gestalten.<br>
[Kontakt aufnehmen zu diesem Thema](${generateMailtoLink("Konsolidierung der Instrumente")})

- **Erweiterung der Schulungs-Angebote:** In den umsetzungsorientierten Schulungen des Zentrum für Legistik lernen Sie Methoden und Werkzeuge kennen, die Sie bei der Erarbeitung von praxisnahen und bürokratiearmen Regelungen unterstützen.<br>
[Kontakt aufnehmen zu diesem Thema](${generateMailtoLink("Erweiterung der Schulungs-Angebote")})


- **Ausbau der Regelungsbegleitung:** Wir unterstützen Sie dabei, Umsetzungsprozesse zu verstehen und Anforderungen an praxisnahe und bürokratiearme Regelungen umzusetzen. Wir erweitern das Angebot in Inhalt und Umfang.<br>
[Kontakt aufnehmen zu diesem Thema](${generateMailtoLink("Ausbau der Regelungsbegleitung")})

⠀
## Verfügbare Angebote

*Bereits für Ihre Arbeit an Regelungen nutzbar.*

**05.01.2026**
<br>
Launch der ersten Version der Website des Zentrum für Legistik unter der Domain zfl.bund.de, ab sofort zur Verfügung:
- **Schulungen**: In Schulungen praktisches Wissen erlangen
- **Projektbegleitung**: Unterstützung Ihres Regelungsvorhabens durch interdisziplinäre Expertise
- **Digitaltauglichkeit**: Zugang zur Prüfung und Beratung via ~[Digitalcheck](https://digitalcheck.bund.de/)~
`;

export function loader() {
  if (!getFeatureFlag(features.enableZflDaranArbeitenWir)) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }
}

export default function DaranArbeitenWir(): JSX.Element {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_DARAN_ARBEITEN_WIR.title} />
      <Hero
        title={ROUTE_ZFL_DARAN_ARBEITEN_WIR.title}
        className="bg-white md:p-40"
      />

      <Container className="space-y-40 pt-0 pb-40 md:space-y-80 md:pb-80">
        <RichText
          className="[&_h1]:mb-64 [&_h2]:mt-40 [&_h2]:mb-16"
          markdown={content}
        />
      </Container>
    </>
  );
}
