import { interoperabel_nationaleKontaktstelle } from "@/config/routes.ts";
import { QuestionMarkOutlined } from "@digitalservicebund/icons";
import { Link } from "react-router";

export function IEAContactBanner() {
  return (
    <div className="mt-8 flex gap-16 bg-blue-300 p-16">
      <QuestionMarkOutlined className="size-80 fill-blue-800" />
      <p>
        <span className="ds-label-01-bold block">
          Bei Fragen und Rückmeldungen
        </span>
        wenden Sie sich an die{" "}
        <Link
          className="text-link"
          to={interoperabel_nationaleKontaktstelle.path}
        >
          nationale Kontaktstelle für ein interoperables Europa
        </Link>
        .
      </p>
    </div>
  );
}
