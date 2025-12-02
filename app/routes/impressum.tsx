import ContentWrapper from "~/components/ContentWrapper.tsx";
import Hero from "~/components/Hero";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import {
  ROUTE_A11Y,
  ROUTE_IMPRINT,
  ROUTE_PRIVACY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

const content = dedent`
    ## Das Internetangebot wird herausgegeben vom
    
    Bundesministerium für Digitales und Staatsmodernisierung (BMDS)<br />
    Alt-Moabit 140<br />
    10557 Berlin<br />
    E-Mail: info@bmds.bund.de
    
    ## Weitere Kontaktmöglichkeiten
    
    **Redaktionsleitung**
    
    Abteilung SB (Staatsmodernisierung und Bürokratierückbau)<br />
    Referat SB II 3 (Methoden und Instrumente der besseren Rechtsetzung)

    E-Mail: SBII3@bmds.bund.de
    
    ## Realisierung, Design, Hosting
    
    DigitalService GmbH des Bundes<br />
    Frau Christina Lang<br />
    Frau Anja Theurer<br />
    Prinzessinnenstraße 8-14<br />
    10969 Berlin<br />
    E-Mail: [hallo@digitalservice.bund.de](mailto:hallo@digitalservice.bund.de)
    
    ## Datenschutz
    
    Erfahren Sie mehr hierzu in der [Datenschutzerklärung](${ROUTE_PRIVACY.url})
    
    ## Barrierefreiheit
    
    Erfahren Sie mehr hierzu in der [Barrierefreiheitserklärung](${ROUTE_A11Y.url})
  `;

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_IMPRINT.title} />
      <Hero title={"Impressum"} />

      <ContentWrapper>
        <RichText
          markdown={content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </ContentWrapper>
    </>
  );
}
