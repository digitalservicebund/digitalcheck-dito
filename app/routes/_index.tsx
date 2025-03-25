import { Link } from "react-router";
import Background from "~/components/Background";
import Box from "~/components/Box";
import Container from "~/components/Container";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import { NumberedList } from "~/components/List";
import SupportBanner from "~/components/SupportBanner";
import { index } from "~/resources/content/startseite";
import { features } from "~/resources/features";
import { useFeatureFlag } from "~/utils/featureFlags";

export default function Index() {
  const showInteroperabilitySection = useFeatureFlag(
    features.showIOLandingPage,
  );

  return (
    <>
      <Background backgroundColor="darkBlue" className="py-24">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: index.title,
            }}
            content={{
              markdown: index.subtitle,
              className: "md:text-2xl",
            }}
          ></Header>
        </Container>
      </Background>
      <Container>
        <NumberedList
          heading={{
            tagName: "h2",
            text: index.list.title,
          }}
          items={index.list.items}
        />
      </Container>
      {/* <Container className="max-sm:!p-0">
        <InlineNotice
          look="warning"
          title={landing.dataNotice.headline}
          tagName="h2"
          content={landing.dataNotice.content}
        />
      </Container> */}
      <div className="bg-[url('/images/trainings.jpeg')] bg-cover bg-[0%_35%]">
        <Container>
          <div className="max-w-[630px] rounded-lg bg-white px-16 py-28 md:px-80 md:py-40">
            {showInteroperabilitySection ? (
              <Box
                heading={{ text: index.interoperability.title }}
                content={{ markdown: index.interoperability.text }}
                buttons={[index.interoperability.link]}
              />
            ) : (
              <Box
                heading={{ text: index.trainings.title }}
                content={{ markdown: index.trainings.text }}
                buttons={[index.trainings.link]}
              />
            )}
          </div>
        </Container>
      </div>
      <Container>
        <InfoBox
          heading={{
            tagName: "h2",
            text: index.summary.title,
          }}
          items={index.summary.items}
        />
      </Container>
      <SupportBanner />
      <Background backgroundColor="darkBlue" className="py-24">
        <Container>
          <div className="scroll-my-40 ds-stack-32">
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
      </Background>
    </>
  );
}
