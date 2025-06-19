import {
  ArrowCircleRightOutlined,
  LayersOutlined,
  SupportOutlined,
} from "@digitalservicebund/icons";
import { useLoaderData } from "react-router";
import Background from "~/components/Background";
import Badge from "~/components/Badge";
import ButtonContainer from "~/components/ButtonContainer";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import HighlightBox from "~/components/HighlightBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import RichText from "~/components/RichText";
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
          <InfoBox>
            <Heading tagName="h2">
              {methodsTasksProcesses.intro.visibility.headline}
            </Heading>
            <RichText>
              {methodsTasksProcesses.intro.visibility.content}
            </RichText>
          </InfoBox>
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
            <InfoBox>
              <Heading tagName="h2">
                {methodsTasksProcesses.anleitung.ablaufe.headline}
              </Heading>
              <RichText>
                {methodsTasksProcesses.anleitung.ablaufe.content}
              </RichText>
            </InfoBox>
            <InfoBox>
              <Heading tagName="h3">
                {methodsTasksProcesses.anleitung.visualisierung.headline}
              </Heading>
              <RichText>
                {methodsTasksProcesses.anleitung.visualisierung.content}
              </RichText>
            </InfoBox>
          </InfoBoxList>

          <HighlightBox>
            <InfoBox>
              <Badge Icon={LayersOutlined}>
                {methodsTasksProcesses.anleitung.tipp.badge}
              </Badge>
              <RichText>
                {methodsTasksProcesses.anleitung.tipp.content}
              </RichText>
            </InfoBox>
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
          <InfoBox>
            <Heading tagName="h2">{interviewBanner.title}</Heading>
            <RichText>{interviewBanner.text}</RichText>
          </InfoBox>
        </HighlightBox>
        <InfoBox>
          <Badge Icon={ArrowCircleRightOutlined}>
            {methodsTasksProcesses.furtherSteps.badge}
          </Badge>
          <Heading tagName="h3">
            {methodsTasksProcesses.furtherSteps.headline}
          </Heading>
          <RichText>{methodsTasksProcesses.furtherSteps.content}</RichText>
          <ButtonContainer
            buttons={methodsTasksProcesses.furtherSteps.buttons}
          ></ButtonContainer>
        </InfoBox>
      </Container>

      <Background backgroundColor="blue">
        <Container>
          <InfoBox>
            <Badge Icon={SupportOutlined}>
              {methodsTasksProcesses.support.badge}
            </Badge>
            <Heading tagName="h2">
              {methodsTasksProcesses.support.headline}
            </Heading>
            <RichText>{methodsTasksProcesses.support.content}</RichText>
          </InfoBox>
        </Container>
      </Background>
    </>
  );
}
