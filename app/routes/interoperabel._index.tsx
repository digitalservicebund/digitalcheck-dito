import QuizIcon from "@digitalservicebund/icons/QuizOutlined";
import { Link } from "react-router";
import { LinkButton } from "~/components/Button";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import Image from "~/components/Image";
import InfoBox from "~/components/InfoBox.tsx";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { SearchParamTabs } from "~/components/Tabs/Tabs";
import { interoperability } from "~/resources/content/interoperabel";
import { contact } from "~/resources/content/shared/contact";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_INTEROPERABILITY_FAQ,
} from "~/resources/staticRoutes";
import { EuRechtTab } from "./interoperabel/EuRechtTab";
import { HintergrundTab } from "./interoperabel/HintergrundTab";
import { InteroperableLoesungenTab } from "./interoperabel/InteroperableLoesungenTab";
import { UeberblickTab } from "./interoperabel/UeberblickTab";
import { tabIds } from "./interoperabel/tabIds";

export default function Interoperability() {
  return (
    <>
      <MetaTitle prefix={ROUTE_INTEROPERABILITY.title} />
      <main>
        <Hero
          title={interoperability.headline}
          subtitle={interoperability.content}
        />

        <div className="bg-blue-300">
          <Container className="flex flex-col py-0 lg:h-[626px] lg:flex-row">
            <div className="py-32 sm:py-48 lg:w-1/2 lg:self-center lg:pr-48">
              <Heading
                tagName="h2"
                text={interoperability.andDigitalReadiness.headline}
                className="mb-8"
              />
              <RichText
                markdown={interoperability.andDigitalReadiness.content}
              />
            </div>
            <div className="relative max-lg:mb-48 max-sm:hidden lg:w-1/2">
              <div className="flex h-full w-[630px] flex-col justify-center bg-[#9FB6C6] align-middle lg:w-[50vw] [&>img]:object-contain lg:[&>img]:h-[550px]">
                <Image
                  url={interoperability.andDigitalReadiness.image.url}
                  alternativeText={
                    interoperability.andDigitalReadiness.image.alternativeText
                  }
                />
              </div>
            </div>
          </Container>
          <div className="sm:hidden">
            <Image
              url={interoperability.andDigitalReadiness.image.url}
              alternativeText={
                interoperability.andDigitalReadiness.image.alternativeText
              }
            />
          </div>
        </div>
        <ContentWrapper compactTopSpacing>
          <SearchParamTabs>
            <SearchParamTabs.Tab
              tabId={tabIds.overviewTabId}
              label="Überblick"
              className="mb-80 space-y-40"
            >
              <UeberblickTab />
            </SearchParamTabs.Tab>
            <SearchParamTabs.Tab
              tabId={tabIds.backgroundTabId}
              label="Hintergrund"
              className="mb-80 space-y-40"
            >
              <HintergrundTab />
            </SearchParamTabs.Tab>
            <SearchParamTabs.Tab
              tabId={tabIds.euLawTabId}
              label="Angrenzendes EU-Recht"
              className="mb-80"
            >
              <EuRechtTab />
            </SearchParamTabs.Tab>
            <SearchParamTabs.Tab
              tabId={tabIds.interoperableSolutionsId}
              label="Interoperable Lösungen"
              className="mb-80 space-y-40"
            >
              <InteroperableLoesungenTab />
            </SearchParamTabs.Tab>
          </SearchParamTabs>
        </ContentWrapper>

        <div className="px-[clamp(1rem, 5vw, 3rem)] bg-blue-100 py-48">
          <Container>
            <Container overhangingBackground className="bg-white">
              <Heading
                tagName="h2"
                text={interoperability.resources.headline}
                className="mb-8"
              />
              <p>{interoperability.resources.subtitle}</p>
              {interoperability.resources.groups.map((group) => (
                <div key={group.title} className="mt-10 p-24 pl-0">
                  <div className="mb-10 flex items-center">
                    <group.icon className="mr-10 size-32" />
                    <Heading
                      tagName="h3"
                      look="ds-label-01-bold"
                      text={group.title}
                    />
                  </div>
                  <p className="mb-20">{group.subtitle}</p>
                  <RichText markdown={group.content} />
                </div>
              ))}
            </Container>
          </Container>
        </div>

        <Container className="py-80">
          <InfoBox visual={{ type: "icon", Icon: QuizIcon }}>
            <Heading tagName="h3">Häufig gestellte Fragen</Heading>
            <p>
              Weitere Informationen zur Umsetzung der
              EU-Interoperabilitäts-Vorgaben und zur Erarbeitung von Regelungen
              finden Sie in unseren Bereich “Fragen und Antworten”.
            </p>
            <p>
              Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter:{" "}
              <Link
                className="text-link"
                to={`mailto:${contact.interoperabilityEmail}`}
              >
                {contact.interoperabilityEmail}
              </Link>{" "}
              oder unter{" "}
              <Link className="text-link" to={contact.phone}>
                {contact.phoneDisplay}
              </Link>
              .
            </p>
            <div className="mt-24">
              <LinkButton to={ROUTE_INTEROPERABILITY_FAQ.url} look="tertiary">
                Zu Fragen und Antworten{" "}
              </LinkButton>
            </div>
          </InfoBox>
        </Container>
      </main>
    </>
  );
}
