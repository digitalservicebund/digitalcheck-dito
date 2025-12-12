import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Button, { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import { general } from "~/resources/content/shared/general.ts";
import { ROUTE_DOCUMENTATION_PARTICIPATION } from "~/resources/staticRoutes";
import { NavigationContext } from "./dokumentation._documentationNavigation";

const notes = `
## Datenspeicherung

Ihre eingegebenen Daten werden **unbegrenzt lange** in der Sitzung gespeichert, bis

a) Sie eine neue Dokumentation starten, oder<br />
b) Ihr SINA-Rechner die Daten löscht (falls das bei Ihnen voreingestellt ist)

**Bitte beachten Sie:** Es ist jeweils nur die Bearbeitung einer Dokumentation möglich. Sie können den Vorgang unterbrechen und später fortsetzen. Der aktuelle Stand bleibt auch nach Schließen des Fensters erhalten.

## Zwischenspeicherung als Word-Dokument

Zur externen Weiterbearbeitung, internen Abstimmung oder für Änderungen können Sie den aktuellen Stand Ihrer Angaben als Word-Dokument exportieren und lokal speichern. Die finale Datei können Sie zu jedem Zeitpunkt per E-Mail an den NKR versenden.
`;

export default function DocumentationParticipation() {
  const { nextUrl, previousUrl } = useOutletContext<NavigationContext>();
  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_PARTICIPATION.title}`}
      />
      <Heading
        text="Wichtige Hinweise"
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText
        className="[&>h2]:ds-heading-03-reg [&>h2]:mt-40"
        markdown={notes}
      />

      <label className="ds-label-01-reg flex flex-row items-center gap-16">
        <input
          type="checkbox"
          className="ds-checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {/* silence warning about ambiguous spacing
         */}
        Ich habe die oberen Hinweise gelesen.
      </label>
      <ButtonContainer>
        <Button
          look={"primary"}
          disabled={!checked}
          type={"button"}
          onClick={() => navigate(nextUrl)}
        >
          Verstanden und weiter
        </Button>
        <LinkButton to={previousUrl} look="tertiary">
          {general.buttonBack.text}
        </LinkButton>
      </ButtonContainer>
    </>
  );
}
