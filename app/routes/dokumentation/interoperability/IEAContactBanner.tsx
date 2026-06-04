import { interoperabel_nationaleKontaktstelle } from "@/config/routes.ts";
import { Link } from "react-router";

export function IEAContactBanner() {
  return (
    <div className="mt-8 border-2 border-blue-800 bg-blue-300 p-16">
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
