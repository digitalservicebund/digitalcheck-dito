import { Link } from "react-router";
import Box from "~/components/Box";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import ImageBox from "~/components/ImageBox.tsx";
import InfoBoxList from "~/components/InfoBoxList";
import { NumberedList } from "~/components/List";
import Tabs, { type TabItem } from "~/components/Tabs.tsx";
import { index } from "~/resources/content/startseite";

export default function Index() {
  const tabsData: TabItem[] = [
    {
      title: index.stepByStep.tabName,
      plausibleEventName: index.stepByStep.plausibleEventName,
      content: (
        <>
          <NumberedList
            className="pb-40"
            heading={{
              tagName: "h2",
              text: index.stepByStep.title,
            }}
            items={index.stepByStep.items}
          />
          <ImageBox
            className="pb-40"
            image={index.stepByStep.processImage.img}
            plausibleEventName={
              index.stepByStep.processImage.plausibleEventName
            }
            border
          />
          {/* currently not used and hidden */}
          <div className="relative left-1/2 hidden w-screen -translate-x-1/2 bg-[url('/images/trainings.jpeg')] bg-cover bg-[0%_35%]">
            <Container>
              <div className="max-w-[630px] rounded-lg bg-white px-16 py-28 md:px-80 md:py-40">
                <Box
                  heading={{ text: index.interoperability.title }}
                  content={{ markdown: index.interoperability.text }}
                  buttons={[index.interoperability.link]}
                />
              </div>
            </Container>
          </div>

          {/* currently not used and hidden */}
          <div className="relative left-1/2 hidden w-screen -translate-x-1/2 bg-blue-800 py-24">
            <Container>
              <div className="ds-stack ds-stack-32 scroll-my-40">
                <Heading tagName="h2" text={index.principles.title} />
                <ol className="list-unstyled space-y-8">
                  {index.principles.content.map((principle) => (
                    <li
                      key={principle}
                      className="before:mb-8 before:block before:w-1/2 before:border-t before:border-blue-700 before:content-[''] first:before:content-none"
                    >
                      {principle}
                    </li>
                  ))}
                </ol>
                <Link
                  to={index.principles.link.href}
                  className="text-link font-bold"
                >
                  {index.principles.link.text}
                </Link>
              </div>
            </Container>
          </div>
        </>
      ),
    },
    {
      title: index.summary.tabName,
      plausibleEventName: index.summary.plausibleEventName,
      content: (
        <InfoBoxList
          heading={{ text: index.summary.title }}
          items={index.summary.items}
          separator
        />
      ),
    },
  ];

  return (
    <>
      <Hero
        title={index.title}
        subtitle={index.subtitle}
        className="bg-blue-800 text-white"
      />

      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
