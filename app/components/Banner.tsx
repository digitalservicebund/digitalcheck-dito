import { WarningAmberOutlined } from "@digitalservicebund/icons";
import Heading from "./Heading";
import RichText from "./RichText";

export default function Banner() {
  return (
    <div className="relative bg-yellow-200 py-16">
      <div className="container flex items-center gap-40">
        <WarningAmberOutlined className="size-80 fill-yellow-300 max-md:hidden" />
        <div className="space-y-8">
          <Heading tagName="h2" look="ds-label-01-bold">
            Hinweis
          </Heading>

          <RichText
            markdown={
              "Am Donnerstag, den 22.01.2026, ist die Website aufgrund einer Server-Änderung in der Zeit von 16:00 Uhr bis 17:00 Uhr nicht erreichbar."
            }
          />
        </div>
      </div>
    </div>
  );
}
