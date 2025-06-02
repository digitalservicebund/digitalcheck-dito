import { type MetaArgs } from "react-router";
import Background from "~/components/Background";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import InfoBox from "~/components/InfoBox";
import LinkListBox from "~/components/LinkListBox";
import {
  getDetailsSummary,
  methodsFivePrinciples,
} from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import prependMetaTitle from "~/utils/metaTitle";
// import {
//   fetchStrapiData,
//   GET_PRINZIPS_QUERY,
//   Prinzip,
// } from "~/utils/strapiData.server";
import { PrincipleNumber } from "~/components/Badge";
import Box from "~/components/Box";
import LabelWithIcon from "~/components/LabelWithIcon";
import { slugify } from "~/utils/utilFunctions";

export const meta = ({ matches }: MetaArgs) => {
  return prependMetaTitle(ROUTE_METHODS_PRINCIPLES.title, matches);
};

// NOTE: disabled for the 70 day quick implementation, will be enabled as soon as we have new examples for principles
// export function loader({ request }: Route.LoaderArgs) {
//   const referer = request.headers.get("referer");
//   let pathname = "/";

//   if (referer) {
//     pathname = new URL(referer).pathname;
//   }

//   // const prinzipData = await fetchStrapiData<{ prinzips: Prinzip[] }>(
//   //   GET_PRINZIPS_QUERY,
//   // );

//   // if ("error" in prinzipData) {
//   //   // eslint-disable-next-line @typescript-eslint/only-throw-error
//   //   throw new Response(prinzipData.error, { status: 400 });
//   // }

//   return {
//     referrer: pathname,
//     // prinzips: prinzipData.prinzips,
//   };
// }

export default function FivePrinciples() {
  const feedbackOptions = [
    { label: "Ich stimme gar nicht zu", value: 1 },
    { label: "Ich stimme eher nicht zu", value: 2 },
    { label: "Ich stimme teilweise zu", value: 3 },
    { label: "Ich stimme eher zu", value: 4 },
    { label: "Ich stimme voll und ganz zu", value: 5 },
  ];

  return (
    <>
      <Background backgroundColor="blue">
        <Container>
          <Header
            heading={{
              tagName: "h1",
              text: methodsFivePrinciples.title,
            }}
            content={{
              markdown: methodsFivePrinciples.subTitle,
            }}
          />
          <LinkListBox
            heading={methodsFivePrinciples.contentOverviewTitle}
            links={methodsFivePrinciples.principles.map((principle) => {
              return {
                id: slugify(principle.title),
                title: principle.title,
              };
            })}
          />
        </Container>
      </Background>

      {methodsFivePrinciples.principles.map((principle) => (
        <Container className="pb-64" key={slugify(principle.title)}>
          <InfoBox
            identifier={slugify(principle.title)}
            separator={false}
            Icon={principle.icon}
            heading={{
              tagName: "h2",
              text: principle.title,
            }}
            label={{
              children: principle.label,
              principleNumber: principle.principleNumber as PrincipleNumber,
            }}
            items={[
              {
                content: principle.content,
                detailsSummary: getDetailsSummary(principle.detailsSummary),
              },
            ]}
          />
        </Container>
      ))}

      {methodsFivePrinciples.nextStep && (
        <Container>
          <Box
            heading={{
              text: methodsFivePrinciples.nextStep.title,
              look: "ds-heading-03-reg",
            }}
            label={{ text: LabelWithIcon(methodsFivePrinciples.nextStep) }}
            content={{ markdown: methodsFivePrinciples.nextStep.text }}
            buttons={methodsFivePrinciples.nextStep.buttons}
          />
        </Container>
      )}

      <FeedbackForm
        heading="Ihr Feedback hilft uns weiter!"
        trackingEvent="feedback"
        questions={[
          {
            id: "principles-simple",
            trackingEvent: "principles-simple",
            text: "Die Prinzipien sind einfach zu nutzen.",
            options: feedbackOptions,
          },
          {
            id: "principles-useful-drafting",
            trackingEvent: "principles-useful-drafting",
            text: "Die Prinzipien sind hilfreich für das Erarbeiten meines Regelungsvorhabens.",
            options: feedbackOptions,
          },
          {
            id: "principles-useful-implementation",
            trackingEvent: "principles-useful-implementation",
            text: "Die Prinzipien sind hilfreich für die Umsetzung meines Regelungsvorhabens.",
            options: feedbackOptions,
          },
        ]}
        contact={"feedback@digitalservicebund.de"}
        button={"Feedback senden"}
        success={{
          heading: "Feedback gesendet",
          text: "Vielen Dank für Ihr Feedback!",
        }}
      />
    </>
  );
}
