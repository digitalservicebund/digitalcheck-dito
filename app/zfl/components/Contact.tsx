import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import InfoBox from "~/components/InfoBox";
import { dedent } from "~/utils/dedentMultilineStrings";
import twMerge from "~/utils/tailwindMerge";
import { ZFL_EMAIL, ZFL_PHONE } from "../constants";

export const Contact = ({ className }: { className?: string }) => (
  <InfoBox
    look="highlight"
    className={twMerge("bg-white", className)}
    visual={{
      type: "icon",
      Icon: PhoneOutlined,
      className: "fill-zfl-main80",
    }}
    heading={{
      tagName: "h2",
      text: "Kontaktieren Sie uns",
    }}
    content={dedent`
      Wir unterstützen Sie gerne persönlich in allen Phasen der Regelungsarbeit.
      
      Telefon: ${ZFL_PHONE.markdown}
      
      E-Mail: ${ZFL_EMAIL.markdown}
    `}
  />
);
