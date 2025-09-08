import BulletList from "~/components/BulletList.tsx";
import { ButtonLinkProps } from "~/components/Button";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import { methods } from "~/resources/content/methoden";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_METHODS } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_METHODS.title);
}

const renderStep = (
  step: (typeof methods.steps.items)[number],
  index: number,
) => {
  const headingId = `step-h-${index}`;

  if (step.isSubstep)
    return (
      <BulletList.Item
        key={step.headline.text}
        bullet
        aria-labelledby={headingId}
      >
        <InfoBox
          look="method"
          heading={{
            text: step.headline.text,
            look: "ds-heading-03-bold",
            id: headingId,
          }}
          content={step.text}
          buttons={step.buttons}
        />
      </BulletList.Item>
    );
  return (
    <BulletList.Item
      className="mt-4 space-y-16"
      key={step.headline.text}
      aria-labelledby={headingId}
    >
      <h2 id={headingId}>{step.headline.text}</h2>
      <RichText markdown={step.text} />
    </BulletList.Item>
  );
};

export default function Methoden() {
  return (
    <>
      <Hero subtitle={methods.subtitle} title={methods.title} />

      <Container className="my-80 py-0">
        <BulletList>{methods.steps.items.map(renderStep)}</BulletList>
      </Container>

      <Container className="my-80 space-y-40 py-0">
        <InfoBox
          heading={{ tagName: "h2", text: methods.furtherMethods.heading }}
          content={methods.furtherMethods.content}
        />

        <InfoBoxSideBySide>
          <InfoBox
            look="method"
            badge={{ text: methods.itSystems.badge, look: "hint" }}
            heading={{
              text: methods.itSystems.heading,
              tagName: "h3",
              className: "ds-heading-03-bold",
            }}
            content={methods.itSystems.content}
            buttons={methods.itSystems.buttons}
          />

          <InfoBox
            look="method"
            badge={{
              text: methods.technicalFeasibility.badge,
              look: "hint",
            }}
            heading={{
              text: methods.technicalFeasibility.heading,
              tagName: "h3",
              className: "ds-heading-03-bold",
            }}
            content={methods.technicalFeasibility.content}
            buttons={methods.technicalFeasibility.buttons}
          />
        </InfoBoxSideBySide>
      </Container>

      <SupportBanner {...supportBanner} />
      <div id={"weiter"} />
      <Container className="my-80 space-y-32 py-0">
        <Heading tagName="h2">{methods.nextSteps.title}</Heading>
        <NumberedList>
          {methods.nextSteps.items.map((item) => (
            <NumberedList.Item
              key={item.headline.text}
              className="space-y-16"
              disabled={item.isDisabled}
            >
              <p className="ds-heading-03-reg">{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
              {"buttons" in item && (
                <ButtonContainer buttons={item.buttons as ButtonLinkProps[]} />
              )}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
    </>
  );
}
