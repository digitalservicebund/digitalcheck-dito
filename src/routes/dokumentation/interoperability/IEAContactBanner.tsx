import { interoperabel_nationaleKontaktstelle } from "@/config/routes.ts";
import { QuestionMarkOutlined } from "@digitalservicebund/icons";

export function IEAContactBanner() {
  return (
    <div className="bg-ds-blue-300 mt-8 flex gap-16 p-16">
      <QuestionMarkOutlined className="fill-ds-blue-800 size-80" />
      <p>
        <span className="ds-label-01-bold block">
          Bei Fragen und Rückmeldungen
        </span>
        wenden Sie sich an die{" "}
        <a href={interoperabel_nationaleKontaktstelle.path}>
          nationale Kontaktstelle für ein interoperables Europa
        </a>
        {"."}
      </p>
    </div>
  );
}
