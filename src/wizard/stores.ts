import { persistentAtom } from "@nanostores/persistent";
import { createWizardStore } from "./createWizardStore";
import { dokumentationFlow } from "./dokumentationFlow";
import { dokumentationFields } from "./dokumentationSchema";
import { pruefbereich, type Pruefbereich } from "./pruefbereichSchema";
import {
  pruefbereichStorageKey,
  wizardStorageKeys,
  type WizardId,
} from "./session";
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

// Shared by both wizards, as both usually check the same Regelungsvorhaben.
// Undefined until chosen on a start page; an unknown one (e.g. a Land without
// the feature flag) counts as none, so the Bund is assumed.
export const $pruefbereich = persistentAtom<Pruefbereich | undefined>(
  pruefbereichStorageKey,
  undefined,
  {
    // Plain strings, undefined removes the key
    encode: (value) => value,
    decode: (encoded) => pruefbereich.safeParse(encoded).data,
  },
);
