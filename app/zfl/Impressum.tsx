import ContentWrapper from "~/components/ContentWrapper.tsx";
import RichText from "~/components/RichText.tsx";
import { dedent } from "~/utils/dedentMultilineStrings.ts";
import MetaTitle from "./ZFLMeta";
import { ROUTE_ZFL_A11Y, ROUTE_ZFL_IMPRINT, ROUTE_ZFL_PRIVACY } from "./routes";

const content = dedent`
    ## Das Internetangebot wird herausgegeben vom
    
    Bundesministerium für Digitales und Staatsmodernisierung (BMDS)<br />
    Alt-Moabit 140<br />
    10557 Berlin<br />
    E-Mail: info@bmds.bund.de
    
    ### Weitere Kontaktmöglichkeiten
    
    **Redaktionsleitung**
    
    Abteilung SB (Staatsmodernisierung und Bürokratierückbau)<br />
    Referat SB II 3 (Methoden und Instrumente der besseren Rechtsetzung)

    E-Mail: SBII3@bmds.bund.de
    
    ### Realisierung, Design, Hosting
    
    DigitalService GmbH des Bundes<br />
    Frau Christina Lang<br />
    Frau Anja Theurer<br />
    Prinzessinnenstraße 8-14<br />
    10969 Berlin<br />
    E-Mail: [hallo@digitalservice.bund.de](mailto:hallo@digitalservice.bund.de)
    
    ### Datenschutz
    
    Erfahren Sie mehr hierzu in der [Datenschutzerklärung](${ROUTE_ZFL_PRIVACY.url})
    
    ### Barrierefreiheit
    
    Erfahren Sie mehr hierzu in der [Barrierefreiheitserklärung](${ROUTE_ZFL_A11Y.url})
  `;

export default function ZFLImpressum() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_IMPRINT.title} />
      <ContentWrapper>
        <h1>{ROUTE_ZFL_IMPRINT.title}</h1>
        <RichText
          markdown={content}
          className="ds-stack-16 [&>h2]:mt-40 [&>h3]:mt-32"
        />
      </ContentWrapper>
    </>
  );
}
