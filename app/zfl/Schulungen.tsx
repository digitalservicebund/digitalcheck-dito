import HourglassEmptyOutlinedIcon from "@digitalservicebund/icons/HourglassEmptyOutlined";
import TimerOutlinedIcon from "@digitalservicebund/icons/TimerOutlined";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBox from "~/components/InfoBox";
import RichText from "~/components/RichText";
import twMerge from "~/utils/tailwindMerge";
import { Contact } from "./components/Contact";
import { ZFL_EMAIL } from "./constants";
import { ROUTE_ZFL_TRAININGS } from "./routes";
import MetaTitle from "./ZFLMeta";

export default function ZFLTrainings() {
  return (
    <>
      <MetaTitle prefix={ROUTE_ZFL_TRAININGS.title} />
      <Hero title={ROUTE_ZFL_TRAININGS.title} className="bg-white" />

      <Container className="space-y-80 py-80">
        <InfoBox
          visual={{
            type: "image",
            image: {
              url: "/zfl/Schulungen.png",
              alternativeText: "",
              size: "medium",
            },
          }}
          heading={{
            tagName: "h2",
            text: "In Schulungen praktisches Wissen erlangen",
          }}
          content="Neue Wege durch umsetzungsorientierte Kurz-Schulungen sowie umfassende Module kennenlernen."
        />
        <TrainingInfo
          title="Zu diesen Schulungen können Sie sich direkt anmelden"
          Icon={TimerOutlinedIcon}
          shortTitle="Nächste Termine"
          className="bg-zfl-main20"
        >
          <Training
            title="Schulungstitel (Kurz-Schulung)"
            instances={[
              {
                date: "Dienstag, 05. September",
                time: "10:00-12:00 Uhr",
                location: "Berlin (online oder in Präsenz)",
              },
              {
                date: "Mittwoch, 05. November",
                time: "10:00-12:00 Uhr",
                location: "Berlin (online oder in Präsenz)",
              },
              {
                date: "Freitag, 05. Dezember",
                time: "10:00-12:00 Uhr",
                location: "Berlin (online oder in Präsenz)",
              },
            ]}
          />
          <Training
            title="Schulungstitel"
            instances={[
              {
                date: "Dienstag, 04. November",
                time: "10:00-12:00 Uhr",
                location: "Berlin (online oder in Präsenz)",
              },
              {
                date: "Mittwoch, 05. November",
                time: "10:00-12:00 Uhr",
                location: "Berlin (online oder in Präsenz)",
              },
            ]}
          />
          <TrainingInfoItem
            title="Anmeldung"
            content={`Schicken Sie uns für eine Anmeldung den Schulungs- oder Modul-Namen und Termin an die E-Mail ${ZFL_EMAIL.markdown} und wir bestätigen die Anmeldung.`}
          />
        </TrainingInfo>
        <TrainingInfo
          title="Für diese Schulungen können Sie sich vormerken lassen. Sie werden kontaktiert, sobald Termine feststehen."
          Icon={HourglassEmptyOutlinedIcon}
          shortTitle="Warteliste"
          className="bg-blue-100"
        >
          <Training title="Schulungstitel (Kurz-Schulung)" />
          <Training title="Schulungstitel" />
          <Training title="Schulungstitel (Kurz-Schulung)" />
          <TrainingInfoItem
            title="Auf die Warteliste setzen"
            content={`Schicken Sie uns für eine Vormerkung den Schulungs- oder Modul-Namen an die E-Mail ${ZFL_EMAIL.markdown} und wir kontaktieren Sie, wenn die Termine verfügbar sind.`}
          />
          <TrainingInfoItem
            title="Ihnen fehlt hier ein Thema?"
            content={`Wir nehmen gerne Wünsche für Schulungen entgegen. Schicken Sie uns Ihren Vorschlag an die E-Mail ${ZFL_EMAIL.markdown} und wir kontaktieren Sie bei Rückfragen.`}
          />
        </TrainingInfo>
      </Container>
      <section className="bg-zfl-main20">
        <Container className="py-40">
          <Contact />
        </Container>
      </section>
    </>
  );
}

type TrainingInfoProps = {
  title: string;
  shortTitle: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  className?: string;
};

const TrainingInfo = ({
  title,
  Icon,
  shortTitle,
  children,
  className,
}: TrainingInfoProps) => {
  return (
    <section className={twMerge("space-y-32 rounded-lg p-32", className)}>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Icon className="size-24 fill-black/50" />
          <span className="ds-body-02-reg">{shortTitle}</span>
        </div>
        <h2 className="ds-heading-03-reg">{title}</h2>
      </div>
      {children}
    </section>
  );
};

type TrainingProps = {
  title: string;
  instances?: {
    date: string;
    time: string;
    location: string;
  }[];
};

const Training = ({ title, instances }: TrainingProps) => {
  return (
    <div className="space-y-8">
      <h3 className="ds-subhead">{title}</h3>
      {instances && (
        <ul className="list-unstyled space-y-8">
          {instances.map((instance) => (
            <li key={instance.date} className="flex w-full justify-between">
              <p className="w-1/3 font-bold">{instance.date}</p>
              <p className="w-1/3">{instance.time}</p>
              <p className="w-1/3">{instance.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type TrainingInfoItemProps = {
  title: string;
  content: string;
};

const TrainingInfoItem = ({ title, content }: TrainingInfoItemProps) => {
  return (
    <div className="space-y-8">
      <h3 className="ds-heading-03-bold">{title}</h3>
      <RichText markdown={content} />
    </div>
  );
};
