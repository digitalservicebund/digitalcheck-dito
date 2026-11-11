import { assistent_vorpruefung_datenaustausch } from "@/config/routes";
import { wizardStores } from "@/wizard/stores";
import { getVorpruefungResult } from "@/wizard/vorpruefungResult";
import { useStore } from "@nanostores/react";
import type { ReactNode } from "react";

export function WarningAlert({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  return (
    <div className="kern-alert kern-alert--warning max-w-736">
      <div className="kern-alert__header">
        <span className="kern-icon kern-icon--warning" aria-hidden="true" />
        <h2 className="kern-title">{title}</h2>
      </div>
      <div className="kern-alert__body space-y-16">{children}</div>
    </div>
  );
}

/** Datenaustausch with the EU, but none at all, see getVorpruefungResult */
export function ContradictionAlert() {
  return (
    <WarningAlert title="Widersprüchliche Angaben – bitte prüfen">
      <ul className="kern-body space-y-8">
        <li>
          Ihre Angabe in Frage 3 (Datenaustausch):
          <ul>
            <li>
              Datenaustausch <b>findet nicht statt</b>
            </li>
          </ul>
        </li>
        <li>
          Ihre Angabe in Frage 6 (Datenaustausch mit EU-Bezug):
          <ul>
            <li>
              Datenaustausch <b>findet statt</b>
            </li>
          </ul>
        </li>
      </ul>
      <a href={assistent_vorpruefung_datenaustausch.path} className="kern-link">
        <span
          className="kern-icon kern-icon--arrow-forward"
          aria-hidden="true"
        />
        Frage 3 zum Datenaustausch überprüfen
      </a>
    </WarningAlert>
  );
}

/** Shown on the question as soon as the stored answers contradict each other */
export default function ContradictionHint() {
  // Empty during hydration, matching the HTML from the build, then the stored data
  const data = useStore(wizardStores.vorpruefung.$data, { ssr: () => ({}) });
  // Own margin, as the island's wrapper is ignored by the parent's spacing
  return getVorpruefungResult(data) === "contradiction" ? (
    <div className="mt-32">
      <ContradictionAlert />
    </div>
  ) : null;
}
