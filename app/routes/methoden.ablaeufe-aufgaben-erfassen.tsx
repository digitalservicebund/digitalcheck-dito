import { useLoaderData } from "react-router";
import { twJoin } from "tailwind-merge";
import Background from "~/components/Background";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Header from "~/components/Header";
import HighlightBox from "~/components/HighlightBox";
import InfoBox from "~/components/InfoBox";
import InterviewBanner from "~/components/InterviewBanner";
import Tabs, { TabItem } from "~/components/Tabs";
import VisualisationItem from "~/components/VisualisationItem";
import {
  type ContentItem,
  ContentVisualisation,
  methodsTasksProcesses,
} from "~/resources/content/methode-ablaeufe-aufgaben-erfassen";
import {
  fetchStrapiData,
  visualisationFields,
  Visualisierung,
} from "~/utils/strapiData.server";

const GET_VISUALISATIONS_QUERY = `
${visualisationFields}
query GetVisualisierung($documentId: ID!) {
  visualisierung(documentId: $documentId) {
    ...VisualisationFields
  }
}`;

export const loader = async () => {
  const visualisationsData = await fetchStrapiData<{
    visualisierung: Visualisierung;
  }>(GET_VISUALISATIONS_QUERY, {
    // TODO: loop over all and then query
    documentId: (
      methodsTasksProcesses.tabs[0].content[1] as ContentVisualisation
    ).documentId,
  });

  if ("error" in visualisationsData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(visualisationsData.error, { status: 400 });
  }

  return visualisationsData.visualisierung;
};

export default function Visualization() {
  const visualisationsData = useLoaderData<typeof loader>();

  const createContent = (items: ContentItem[]) => (
    <div className={twJoin("ds-stack ds-stack-80")}>
      {items.map((contentItem, i) => {
        if (contentItem.element === "infoBox") {
          return (
            <InfoBox
              key={(contentItem.props.heading?.text as string) + i}
              {...contentItem.props}
            />
          );
        } else if (contentItem.element === "highlightBox") {
          return (
            <HighlightBox
              key={(contentItem.props.heading?.text as string) + i}
              {...contentItem.props}
            />
          );
        } else if (contentItem.element === "card") {
          return (
            <Card
              key={(contentItem.props.heading?.text as string) + i}
              {...contentItem.props}
            />
          );
        } else if (contentItem.element === "visualisation") {
          return (
            <VisualisationItem
              key={visualisationsData.Bild.documentId}
              visualisierung={visualisationsData}
            />
          );
        }
      })}
    </div>
  );

  const tabsData: TabItem[] = methodsTasksProcesses.tabs.map((tabData) => ({
    title: tabData.title,
    plausibleEventName: "TODO",
    content: createContent(tabData.content),
  }));

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
        <InfoBox {...methodsTasksProcesses.furtherSteps} />
      </Container>

      <Background backgroundColor="blue">
        <Container>
          <InfoBox {...methodsTasksProcesses.support} />
        </Container>
      </Background>
    </>
  );
}
