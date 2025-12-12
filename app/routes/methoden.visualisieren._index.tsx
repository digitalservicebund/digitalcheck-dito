import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox";
import InfoBox from "~/components/InfoBox";
import InfoBoxList from "~/components/InfoBoxList";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { methodsTasksProcesses } from "~/resources/content/methode-visualisieren.ts";
import { ROUTE_METHODS_VISUALIZE } from "~/resources/staticRoutes.ts";

export default function Visualization() {
  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS_VISUALIZE.title} />
      <main>
        <Hero
          subtitle={methodsTasksProcesses.subtitle}
          title={methodsTasksProcesses.title}
        />

        <Container className="space-y-40 md:my-40 md:space-y-80">
          <section className="space-y-32 md:space-y-40">
            <Heading tagName="h2" className="ds-heading-02-reg">
              {methodsTasksProcesses.usage.title}
            </Heading>
            <div className="space-y-32 md:grid md:grid-cols-4 md:space-y-0 md:gap-x-40">
              {methodsTasksProcesses.usage.description.map((item, i) => (
                <div key={i} className="space-y-16">
                  <item.icon className="size-40 fill-yellow-500 md:size-80" />
                  <RichText className="ds-label-01-reg" markdown={item.text} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-24">
            <Heading tagName="h3" className="ds-heading-03-reg">
              {methodsTasksProcesses.usage.visualization.title}
            </Heading>
            <ImageBox
              image={{
                url: "/images/von-schriftform-zur-visualisierung.png",
                caption: methodsTasksProcesses.usage.visualization.caption,
                alternativeText:
                  methodsTasksProcesses.usage.visualization.altText,
              }}
              border
            />
          </section>

          <section className="space-y-24 md:space-y-40">
            <Heading tagName="h2" className="ds-heading-02-reg mb-8">
              {methodsTasksProcesses.visualizationTypes.title}
            </Heading>
            <p>{methodsTasksProcesses.visualizationTypes.subtitle}</p>

            <InfoBoxList
              /* TODO: Replace structure once InfoBoxList is updated to support children */
              items={methodsTasksProcesses.visualizationTypes.types.map(
                (item) => ({
                  ...item,
                  children: item.workInProgress && (
                    <ButtonContainer className={"pt-8"}>
                      <Button type="button" disabled look="tertiary">
                        Anleitung
                      </Button>
                    </ButtonContainer>
                  ),
                }),
              )}
              separator
            />
          </section>

          <InfoBox
            look="highlight"
            badge={methodsTasksProcesses.goodToKnow.badge}
            heading={{
              text: methodsTasksProcesses.goodToKnow.title,
              tagName: "h3",
            }}
          >
            <RichText markdown={methodsTasksProcesses.goodToKnow.content} />
            <InfoBox.LinkList links={methodsTasksProcesses.goodToKnow.links} />
          </InfoBox>
        </Container>
      </main>
    </>
  );
}
