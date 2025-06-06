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
  methodsTasksProcesses,
} from "~/resources/content/methode-ablaeufe-aufgaben-erfassen";
import {
  fetchStrapiData,
  visualisationFields,
  Visualisierung,
} from "~/utils/strapiData.server";

const GET_VISUALISATIONS_QUERY = `
${visualisationFields}
query GetVisualisierungen($filters: VisualisierungFiltersInput) {
  visualisierungen(filters: $filters) {
    ...VisualisationFields
  }
}
`;

export const loader = async () => {
  const visualisationsData = await fetchStrapiData<{
    visualisierungen: Visualisierung[];
  }>(GET_VISUALISATIONS_QUERY, {
    filters: {
      documentId: {
        in: methodsTasksProcesses.tabs
          .flatMap(({ content }) =>
            content.filter((item) => item.element === "visualisation"),
          )
          .map(({ documentId }) => documentId),
      },
    },
  });

  if ("error" in visualisationsData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(visualisationsData.error, { status: 400 });
  }

  return visualisationsData.visualisierungen;
};

export default function Visualization() {
  const visualisationsData = useLoaderData<typeof loader>();

  const createContent = (items: ContentItem[]) => (
    <div className={twJoin("ds-stack ds-stack-40")}>
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
          const visualisationsItem = visualisationsData.find(
            ({ documentId }) => documentId === contentItem.documentId,
          );
          if (!visualisationsItem) return <></>;

          return (
            <VisualisationItem
              key={visualisationsItem.Bild.documentId}
              visualisierung={visualisationsItem}
              plausibleEventName={contentItem.plausibleEventName}
            />
          );
        }
      })}
    </div>
  );

  const tabsData: TabItem[] = methodsTasksProcesses.tabs.map((tabData) => ({
    title: tabData.title,
    plausibleEventName: tabData.plausibleEventName,
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
