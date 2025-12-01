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
    
    Bundesministerium des Innern (BMI)<br />
    vorübergehend für das Bundesministerium für Digitales und Staatsmodernisierung (BMDS)<br />
    Alt-Moabit 140<br />
    10557 Berlin<br />
    Telefon: [+49 30 18681-0](tel:+4930186810)<br />
    Fax: [+49 30 18681-12926](tel:+49301868112926)<br />
    E-Mail: [poststelle@bmi.bund.de](mailto:poststelle@bmi.bund.de)<br />
    DE-Mail: [poststelle@bmi-bund.de-mail.de](mailto:poststelle@bmi-bund.de-mail.de)
    
    ### Weitere Kontaktmöglichkeiten
    
    **Redaktionsleitung**<br />
    Abteilung DV (Digitale Verwaltung; Steuerung OZG)<br />
    Referat DV I 3 — Digitale Verwaltungstransformation; Digitalcheck<br />
    Verantwortlich: Dany Homilius (Referatsleiterin DV I 3)<br />
    E-Mail: [DVI3@bmi.bund.de](mailto:DVI3@bmi.bund.de) 
    
    ### Realisierung, Design, Hosting
    
    DigitalService GmbH des Bundes<br />
    Frau Christina Lang<br />
    Frau Anja Theurer<br />
    Prinzessinnenstraße 8-14<br />
    10969 Berlin<br />
    E-Mail: [hallo@digitalservice.bund.de](mailto:hallo@digitalservice.bund.de)
    
    ### Datenschutz
    
    Erfahren Sie mehr hierzu in der [Datenschutzerklärung](${ROUTE_PRIVACY.url})
    
    ### Barrierefreiheit
    
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
