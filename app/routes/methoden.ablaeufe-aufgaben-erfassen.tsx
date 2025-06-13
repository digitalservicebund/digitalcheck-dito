import { useLoaderData } from "react-router";
import Background from "~/components/Background";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Header from "~/components/Header";
import HighlightBox from "~/components/HighlightBox";
import InfoBox from "~/components/InfoBox";
import InterviewBanner from "~/components/InterviewBanner";
import Tabs, { TabItem } from "~/components/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import { methodsTasksProcesses } from "~/resources/content/methode-ablaeufe-aufgaben-erfassen";
import {
  fetchStrapiData,
  visualisationFields,
  Visualisierung,
} from "~/utils/strapiData.server";

const GET_VISUALISATION_QUERY = `
${visualisationFields}
query GetVisualisierung($documentId: ID!) {
  visualisierung(documentId: $documentId) {
    ...VisualisationFields
  }
}
`;

export const loader = async () => {
  const visualisationsData = await fetchStrapiData<{
    visualisierung: Visualisierung;
  }>(GET_VISUALISATION_QUERY, {
    documentId: methodsTasksProcesses.intro.example.documentId,
  });

  if ("error" in visualisationsData) {
    console.error(visualisationsData.error);

    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(methodsTasksProcesses.errorMessage, { status: 500 });
  }

  return visualisationsData.visualisierung;
};

export default function Visualization() {
  const visualisationsData = useLoaderData<typeof loader>();

  const tabsData: TabItem[] = [
    {
      title: methodsTasksProcesses.intro.title,
      plausibleEventName: methodsTasksProcesses.intro.plausibleEventName,
      content: (
        <div className="ds-stack ds-stack-40">
          <InfoBox
            items={[
              {
                headline: {
                  text: methodsTasksProcesses.intro.visibility.headline,
                  tagName: "h2",
                },
                content: methodsTasksProcesses.intro.visibility.content,
              },
            ]}
          />
          {visualisationsData && (
            <VisualisationItem
              plausibleEventName={
                methodsTasksProcesses.intro.example.plausibleEventName
              }
              visualisierung={visualisationsData}
            />
          )}
        </div>
      ),
    },

    {
      title: methodsTasksProcesses.anleitung.title,
      plausibleEventName: methodsTasksProcesses.anleitung.plausibleEventName,
      content: (
        <div className="ds-stack ds-stack-40">
          <InfoBox
            separator={false}
            items={[
              {
                headline: {
                  text: methodsTasksProcesses.anleitung.ablaufe.headline,
                  tagName: "h2",
                },
                content: methodsTasksProcesses.anleitung.ablaufe.content,
              },
              {
                headline: {
                  text: methodsTasksProcesses.anleitung.visualisierung.headline,
                  tagName: "h3",
                },
                content: methodsTasksProcesses.anleitung.visualisierung.content,
              },
            ]}
          />

          <HighlightBox
            items={[
              {
                badge: methodsTasksProcesses.anleitung.tipp.badge,
                content: methodsTasksProcesses.anleitung.tipp.content,
              },
            ]}
          />

          <Card
            image={methodsTasksProcesses.anleitung.vorlage.image}
            heading={{
              text: methodsTasksProcesses.anleitung.vorlage.heading,
              tagName: "h3",
            }}
            content={{
              markdown: methodsTasksProcesses.anleitung.vorlage.content,
            }}
            buttons={methodsTasksProcesses.anleitung.vorlage.buttons}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: methodsTasksProcesses.title,
            }}
            content={{
              markdown: methodsTasksProcesses.subtitle,
              className: "md:text-2xl",
            }}
          ></Header>
        </Container>
      </Background>

      <Container>
        <Tabs tabs={tabsData} />
      </Container>

      <Container className="ds-stack ds-stack-40">
        <InterviewBanner />
        <InfoBox
          items={[
            {
              badge: methodsTasksProcesses.furtherSteps.badge,
              headline: {
                text: methodsTasksProcesses.furtherSteps.headline,
                tagName: "h3",
              },
              content: methodsTasksProcesses.furtherSteps.content,
              buttons: methodsTasksProcesses.furtherSteps.buttons,
            },
          ]}
        />
      </Container>

      <Background backgroundColor="blue">
        <Container>
          <InfoBox
            items={[
              {
                badge: methodsTasksProcesses.support.badge,
                headline: {
                  text: methodsTasksProcesses.support.headline,
                  tagName: "h2",
                },
                content: methodsTasksProcesses.support.content,
              },
            ]}
          />
        </Container>
      </Background>
    </>
  );
}
