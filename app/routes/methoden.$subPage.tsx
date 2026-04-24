import type { Route } from "@/config/routes";
import { methoden_itSystemeErfassen, methoden_technischeUmsetzbarkeit, methoden_zustaendigeAkteurinnenAuflisten } from "@/config/routes";
import Container from "~/components/Container";
import ContentWrapper from "~/components/ContentWrapper.tsx";
import DetailsSummary from "~/components/DetailsSummary";
import Hero from "~/components/Hero";
import Image from "~/components/Image.tsx";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
import MethodCard from "~/components/MethodCard";
import RichText from "~/components/RichText.tsx";
import { methodsITSystems } from "~/resources/content/methode-it-systeme-erfassen";
import { methodsTechnicalFeasibility } from "~/resources/content/methode-technische-umsetzbarkeit";
import { methodsResponsibleActors } from "~/resources/content/methode-zustaendige-akteurinnen-auflisten";
import { interviewBanner } from "~/resources/content/shared/interview-banner";

const contentMap: Record<string, typeof methodsResponsibleActors | typeof methodsITSystems | typeof methodsTechnicalFeasibility> = {
  [methoden_zustaendigeAkteurinnenAuflisten.title]: methodsResponsibleActors,
  [methoden_itSystemeErfassen.title]: methodsITSystems,
  [methoden_technischeUmsetzbarkeit.title]: methodsTechnicalFeasibility,
};

export default function Index({
  route: propRoute,
}: { route?: Route } = {}) {
  const route = propRoute;
  if (!route) return null;
  // We have to get the content here to use the icons from the content file
  const content = contentMap[route.title];

  return (
    <>
      <MetaTitle prefix={route.title} />
      <main>
        <Hero subtitle={content.subtitle} title={content.title} />

        <ContentWrapper>
          {"accordion" in content && (
            <div className="pb-0">
              <DetailsSummary title={content.accordion.title}>
                <RichText markdown={content.accordion.text} />
              </DetailsSummary>
            </div>
          )}
          <div className="mb-40 space-y-40 lg:space-y-80">
            <InfoBox
              heading={{
                text: content.content.title,
                look: "ds-heading-03-reg",
                tagName: "h2",
              }}
              badge={{
                children: content.content.label,
                Icon: content.content.icon,
              }}
            >
              <RichText markdown={content.content.text} />
              {"links" in content.content && (
                <InfoBox.LinkList links={content.content.links} />
              )}
            </InfoBox>

            {content.boxes.map((box) => (
              <MethodCard
                key={box.title}
                image={
                  <Image url={box.image.src} alternativeText={box.image.alt} />
                }
                infoBox={
                  <MethodCard.InfoBox
                    heading={{ text: box.title, look: "ds-heading-03-reg" }}
                    badge={{ children: box.label, Icon: box.icon }}
                  >
                    {box.text && <RichText markdown={box.text} />}
                    {"links" in box && box.links && box.links.length > 0 && (
                      <InfoBox.LinkList links={box.links} />
                    )}
                  </MethodCard.InfoBox>
                }
              />
            ))}
          </div>
        </ContentWrapper>
        {"tip" in content && (
          <div className="bg-yellow-300">
            <Container>
              <InfoBox
                heading={{ text: content.tip.title, tagName: "h3" }}
                badge={{ children: content.tip.label, Icon: content.tip.icon }}
              >
                <RichText markdown={content.tip.text} />
              </InfoBox>
            </Container>
          </div>
        )}

        <Container className="mt-40 lg:pb-80">
          <InfoBox
            heading={{ tagName: "h2", text: interviewBanner.title }}
            look="highlight"
          >
            <RichText markdown={interviewBanner.text} />
          </InfoBox>
        </Container>

        {"support" in content && (
          <div className="bg-blue-100">
            <Container>
              <InfoBox
                heading={{
                  text: content.support.title,
                  look: "ds-heading-03-reg",
                  tagName: "h2",
                }}
                badge={{
                  children: content.support.label,
                  Icon: content.support.icon,
                }}
              >
                <RichText markdown={content.support.text} />
                <InfoBox.LinkList links={content.support.links} />
              </InfoBox>
            </Container>
          </div>
        )}
      </main>
    </>
  );
}
