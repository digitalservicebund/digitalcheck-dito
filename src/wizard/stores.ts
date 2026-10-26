import { createWizardStore } from "./createWizardStore";
import { dokumentationFlow } from "./dokumentationFlow";
import { dokumentationFields } from "./dokumentationSchema";
import { wizardStorageKeys, type WizardId } from "./session";
import { vorpruefungFlow } from "./vorpruefungFlow";
import { vorpruefungFields } from "./vorpruefungSchema";

export const wizardStores = {
  vorpruefung: createWizardStore(
    wizardStorageKeys.vorpruefung,
    vorpruefungFlow,
    vorpruefungFields,
  ),
  dokumentation: createWizardStore(
    wizardStorageKeys.dokumentation,
    dokumentationFlow,
    dokumentationFields,
  ),
} as const satisfies Record<WizardId, unknown>;
