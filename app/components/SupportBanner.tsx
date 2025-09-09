import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox.tsx";

export type SupportBannerProps = {
  title: string;
  text: string;
};

export default function SupportBanner({
  title,
  text,
}: Readonly<SupportBannerProps>) {
  return (
    <div className="bg-blue-300">
      <Container className="ds-stack ds-stack-16">
        <InfoBox
          heading={{
            tagName: "h2",
            look: "ds-subhead font-bold",
            text: title,
          }}
          content={text}
        />
      </Container>
    </div>
  );
}
