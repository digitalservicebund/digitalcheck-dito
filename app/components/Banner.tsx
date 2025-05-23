import { banner } from "~/resources/content/components/banner";
import Container from "./Container";
import Label from "./Label";
import RichText from "./RichText";

export default function Banner() {
  return (
    <div role="banner" aria-label={banner.ariaLabel} className="bg-yellow-300">
      <Container className="ds-stack ds-stack-8 py-24">
        <div className="flex flex-row items-start gap-16">
          <h2 className="ds-subhead font-bold">{banner.title}</h2>
          <Label>{banner.titleLabel}</Label>
        </div>
        <RichText markdown={banner.content} />
      </Container>
    </div>
  );
}
