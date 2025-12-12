import { useLoaderData } from "react-router";

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
import {
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTES,
} from "~/resources/staticRoutes";
import type { Route } from "./+types/methoden.$subPage";

const contentMap = {
  [ROUTE_METHODS_RESPONSIBLE_ACTORS.title]: methodsResponsibleActors,
  [ROUTE_METHODS_COLLECT_IT_SYSTEMS.title]: methodsITSystems,
  [ROUTE_METHODS_TECHNICAL_FEASIBILITY.title]: methodsTechnicalFeasibility,
};

export function loader({ params }: Route.LoaderArgs) {
  const { subPage } = params;
  if (!subPage) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Method page not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const route = ROUTES.find((route) => route.url.endsWith(subPage));
  if (!route || !contentMap[route.title]) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Method page not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { route };
}

export default function Index() {
  const { route } = useLoaderData<typeof loader>();
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
                    content={box.text}
                    links={"links" in box ? box.links : []}
                  />
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
