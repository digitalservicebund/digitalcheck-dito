import { useLoaderData } from "react-router";

import Card from "~/components/Card";
import Container from "~/components/Container";
import DetailsSummary from "~/components/DetailsSummary";
import Hero from "~/components/Hero";
import Image from "~/components/Image.tsx";
import InfoBox from "~/components/InfoBox";
import MetaTitle from "~/components/Meta";
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
      <Hero subtitle={content.subtitle} title={content.title} />

      {"accordion" in content && (
        <Container className="pb-0">
          <DetailsSummary
            title={content.accordion.title}
            content={content.accordion.text}
          />
        </Container>
      )}
      <Container className="space-y-32">
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
          content={content.content.text}
          buttons={"buttons" in content.content ? content.content.buttons : []}
        />
        {content.boxes.map((box) => (
          <Card
            key={box.title}
            heading={{ text: box.title, look: "ds-heading-03-reg" }}
            badge={{ children: box.label, Icon: box.icon }}
            content={box.text}
            buttons={"buttons" in box ? box.buttons : []}
            className="px-96 py-64 max-sm:px-16 max-sm:py-32"
          >
            <Image url={box.image.src} alternativeText={box.image.alt} />
          </Card>
        ))}
      </Container>
      {"tip" in content && (
        <div className="bg-yellow-300">
          <Container>
            <InfoBox
              heading={{ text: content.tip.title, tagName: "h3" }}
              badge={{ children: content.tip.label, Icon: content.tip.icon }}
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
              content={content.support.text}
              buttons={content.support.buttons}
            />
          </Container>
        </div>
      )}
    </>
  );
}
