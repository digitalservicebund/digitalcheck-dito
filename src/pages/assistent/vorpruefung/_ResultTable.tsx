import { wizardStores } from "@/wizard/stores";
import {
  answerLabels,
  questionNames,
  resultRows,
} from "@/wizard/vorpruefungResult";
import { useStore } from "@nanostores/react";

/** Lists every answer with its effect on the result and a link to change it */
export default function ResultTable() {
  // Rendered client-only (no HTML from the build), so the stored data is known
  const data = useStore(wizardStores.vorpruefung.$data);

  return (
    <div className="kern-table-responsive">
      <table className="kern-table">
        <thead className="kern-table__head sr-only">
          <tr className="kern-table__row">
            <th className="kern-table__header" scope="col">
              Frage
            </th>
            <th className="kern-table__header" scope="col">
              Antwort
            </th>
            <th className="kern-table__header" scope="col">
              Auswirkung
            </th>
            <th
              className="kern-table__header kern-table__header--action print:hidden"
              scope="col"
            >
              Aktion
            </th>
          </tr>
        </thead>
        <tbody className="kern-table__body">
          {questionNames.map((name) => {
            const { route, explanations } = resultRows[name];
            const answer = data[name];
            return (
              <tr key={name} className="kern-table__row">
                <th className="kern-table__header" scope="row">
                  {route.title}
                </th>
                <td className="kern-table__cell">
                  {answer ? answerLabels[answer] : "–"}
                </td>
                <td className="kern-table__cell">
                  {answer ? explanations[answer] : "Noch nicht beantwortet."}
                </td>
                <td className="kern-table__cell kern-table__cell--action print:hidden">
                  <a href={route.path} className="kern-link">
                    <span
                      className="kern-icon kern-icon--edit"
                      aria-hidden="true"
                    />
                    Bearbeiten<span className="sr-only">: {route.title}</span>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
