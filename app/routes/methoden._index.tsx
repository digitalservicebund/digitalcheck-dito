import { ButtonLinkProps } from "~/components/Button";
import Heading from "~/components/Heading";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import InfoBoxSideBySide from "~/components/InfoBoxSideBySide";
import MetaTitle from "~/components/Meta";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import SupportBanner from "~/components/SupportBanner";
import Timeline from "~/components/Timeline.tsx";
import { methods } from "~/resources/content/methoden";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_METHODS } from "~/resources/staticRoutes";
import { renderButtonContainer } from "~/utils/resourceUtils.tsx";

const renderStep = (
  step: (typeof methods.steps.items)[number],
  index: number,
) => {
  const headingId = `step-h-${index}`;

  if (step.isSubstep)
    return (
      <Timeline.Item
        key={step.headline.text}
        bullet
        aria-labelledby={headingId}
      >
        <Timeline.ItemContent
          backgroundClasses="bg-blue-100 px-16 py-32 sm:px-32 sm:pt-40 sm:pb-48"
          headline={{
            text: step.headline.text,
            look: "ds-heading-03-bold",
            tagName: "h3",
            id: headingId,
          }}
          buttons={step.buttons}
          content={step.text}
        />
      </Timeline.Item>
    );
  return (
    <Timeline.Item
      className="mt-4 space-y-16"
      key={step.headline.text}
      aria-labelledby={headingId}
    >
      <Timeline.ItemContent
        content={step.text}
        headline={{ ...step.headline, id: headingId }}
      />
    </Timeline.Item>
  );
};

export default function Methoden() {
  return (
    <>
      <MetaTitle prefix={ROUTE_METHODS.title} />
      <Hero subtitle={methods.subtitle} title={methods.title} />

      <div className="container my-40 space-y-40 lg:my-80 lg:space-y-80">
        <Timeline>{methods.steps.items.map(renderStep)}</Timeline>

        <section className="space-y-40">
          <InfoBox
            heading={{ tagName: "h2", text: methods.furtherMethods.heading }}
            content={methods.furtherMethods.content}
          />

          <InfoBoxSideBySide>
            <InfoBox
              look="method"
              badge={{ children: methods.itSystems.badge, look: "hint" }}
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
                children: methods.technicalFeasibility.badge,
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
        </section>
      </div>
      <SupportBanner {...supportBanner} />
      <section className="container my-40 space-y-32 lg:my-80">
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
              {"buttons" in item &&
                renderButtonContainer(item.buttons as ButtonLinkProps[])}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </section>
    </>
  );
}
