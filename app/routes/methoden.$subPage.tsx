import { useLoaderData } from "react-router";

import Box from "~/components/Box";
import Card from "~/components/Card";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import { methodsITSystems } from "~/resources/content/methode-it-systeme-erfassen";
import { methodsTechnicalFeasibility } from "~/resources/content/methode-technische-umsetzbarkeit";
import { methodsResponsibleActors } from "~/resources/content/methode-zustaendige-akteurinnen-auflisten";
import { interviewBanner } from "~/resources/content/shared/interview-banner";
import {
  ROUTE_METHODS,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTES,
} from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";
import type { Route } from "./+types/methoden.$subPage";

const contentMap = {
  [ROUTE_METHODS_RESPONSIBLE_ACTORS.title]: methodsResponsibleActors,
  [ROUTE_METHODS_COLLECT_IT_SYSTEMS.title]: methodsITSystems,
  [ROUTE_METHODS_TECHNICAL_FEASIBILITY.title]: methodsTechnicalFeasibility,
};

const notFound = new Response("Method page not found", {
  status: 404,
  statusText: "Not Found",
});

export function loader({ params }: Route.LoaderArgs) {
  const { subPage } = params;
  if (!subPage) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw notFound;
  }

  const route = ROUTES.find((route) => route.url.endsWith(subPage));
  if (!route || !contentMap[route.title]) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw notFound;
  }

  return { route };
}

export function meta({ data }: Route.MetaArgs) {
  return constructMetaTitle(data ? data.route.title : ROUTE_METHODS.title);
}

export default function Index() {
  const { route } = useLoaderData<typeof loader>();
  // We have to get the content here to use the icons from the content file
  const content = contentMap[route.title];

  return (
    <>
      <Hero subtitle={content.subtitle} title={content.title} />

      {"accordion" in content && (
        <Container className="pb-0">
          <DetailsSummary
            title={content.accordion.title}
            content={content.accordion.text}
          />
        </Container>
      )}
      <Container className="ds-stack ds-stack-32">
        <Box
          heading={{ text: content.content.title, look: "ds-heading-03-reg" }}
          badge={{ text: content.content.label, Icon: content.content.icon }}
          content={{ markdown: content.content.text }}
          buttons={"buttons" in content.content ? content.content.buttons : []}
        />
        {content.boxes.map((box) => (
          <Card
            key={box.title}
            image={{ url: box.image.src, alternativeText: box.image.alt }}
            heading={{ text: box.title, look: "ds-heading-03-reg" }}
            badge={{ text: box.label, Icon: box.icon }}
            content={{ markdown: box.text }}
            buttons={"buttons" in box ? box.buttons : []}
            className="px-96 py-64 max-sm:px-16 max-sm:py-32"
          />
        ))}
      </Container>
      {"tip" in content && (
        <div className="bg-yellow-300">
          <Container>
            <InfoBox
              heading={{ text: content.tip.title, tagName: "h3" }}
              badge={{ text: content.tip.label, Icon: content.tip.icon }}
              content={content.tip.text}
            />
          </Container>
        </div>
      )}

      <Container>
        <InfoBox
          heading={{ tagName: "h2", text: interviewBanner.title }}
          content={interviewBanner.text}
          look="highlight"
        />
      </Container>

      {"support" in content && (
        <div className="bg-blue-100">
          <Container>
            <Box
              heading={{
                text: content.support.title,
                look: "ds-heading-03-reg",
              }}
              badge={{
                text: content.support.label,
                Icon: content.support.icon,
              }}
              content={{ markdown: content.support.text }}
              buttons={content.support.buttons}
            />
          </Container>
        </div>
      )}
    </>
  );
}
