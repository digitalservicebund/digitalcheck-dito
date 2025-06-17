import { useLoaderData } from "react-router";
import Background from "~/components/Background";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import HighlightBox from "~/components/HighlightBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import Tabs, { TabItem } from "~/components/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import { methodsTasksProcesses } from "~/resources/content/methode-ablaeufe-aufgaben-erfassen";
import { interviewBanner } from "~/resources/content/shared/interview-banner";
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
            heading={{
              text: methodsTasksProcesses.intro.visibility.headline,
              tagName: "h2",
            }}
            content={methodsTasksProcesses.intro.visibility.content}
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
          <InfoBoxList>
            <InfoBoxList.List>
              <InfoBoxList.Item
                heading={{
                  text: methodsTasksProcesses.anleitung.ablaufe.headline,
                  tagName: "h2",
                }}
                content={methodsTasksProcesses.anleitung.ablaufe.content}
              />
              <InfoBoxList.Item
                heading={{
                  text: methodsTasksProcesses.anleitung.visualisierung.headline,
                  tagName: "h3",
                }}
                content={methodsTasksProcesses.anleitung.visualisierung.content}
              />
            </InfoBoxList.List>
          </InfoBoxList>

          <HighlightBox>
            <InfoBox
              badge={methodsTasksProcesses.anleitung.tipp.badge}
              content={methodsTasksProcesses.anleitung.tipp.content}
            />
          </HighlightBox>

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
      <Hero
        subtitle={methodsTasksProcesses.subtitle}
        title={methodsTasksProcesses.title}
      />

      <Container>
        <Tabs tabs={tabsData} />
      </Container>

      <Container className="ds-stack ds-stack-40">
        <HighlightBox>
          <InfoBox
            heading={{ tagName: "h2", text: interviewBanner.title }}
            content={interviewBanner.text}
          />
        </HighlightBox>
        <InfoBox
          badge={methodsTasksProcesses.furtherSteps.badge}
          heading={{
            text: methodsTasksProcesses.furtherSteps.headline,
            tagName: "h3",
          }}
          content={methodsTasksProcesses.furtherSteps.content}
          buttons={methodsTasksProcesses.furtherSteps.buttons}
        />
      </Container>

      <Background backgroundColor="blue">
        <Container>
          <InfoBox
            badge={methodsTasksProcesses.support.badge}
            heading={{
              text: methodsTasksProcesses.support.headline,
              tagName: "h2",
            }}
            content={methodsTasksProcesses.support.content}
          />
        </Container>
      </Background>
    </>
  );
}
