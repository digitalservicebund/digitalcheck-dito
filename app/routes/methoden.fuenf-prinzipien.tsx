import Background from "~/components/Background";
import Badge, { PrincipleNumber } from "~/components/Badge";
import Box from "~/components/Box";
import Container from "~/components/Container";
import FeedbackForm from "~/components/FeedbackForm";
import Header from "~/components/Header";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import InfoBoxItem from "~/components/InfoBoxItem";
import LinkListBox from "~/components/LinkListBox";
import Separator from "~/components/Separator";
import {
  getDetailsSummary,
  methodsFivePrinciples,
} from "~/resources/content/methode-fuenf-prinzipien";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

import { slugify } from "~/utils/utilFunctions";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS_PRINCIPLES.title);
}

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
            links={[
              {
                id: "instruction",
                title: methodsFivePrinciples.anchor.instruction,
              },
              ...methodsFivePrinciples.principles.map((principle) => {
                return {
                  id: slugify(principle.title),
                  title: `${methodsFivePrinciples.anchor.principle} ${principle.title}`,
                };
              }),
            ]}
          />
        </Container>
      </Background>

      <Container className="ds-stack ds-stack-40">
        <div id="instruction">
          <Badge Icon={methodsFivePrinciples.instruction.badge.Icon}>
            {methodsFivePrinciples.instruction.badge.text}
          </Badge>
          <Heading tagName="h2">
            {methodsFivePrinciples.instruction.title}
          </Heading>
        </div>

        <ul className="list-unstyled ds-stack ds-stack-40">
          {methodsFivePrinciples.instruction.items.map((item) => (
            <InfoBoxItem
              key={item.headline}
              headline={{ text: item.headline }}
              content={item.content}
              linkList={
                item.link && {
                  links: [{ title: item.link.text, url: item.link.url }],
                }
              }
            ></InfoBoxItem>
          ))}
        </ul>

        <Separator />
      </Container>

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
            badge={{
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
            badge={{
              text: methodsFivePrinciples.nextStep.label,
              Icon: methodsFivePrinciples.nextStep.icon,
            }}
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
