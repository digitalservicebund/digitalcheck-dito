import { z } from "zod";
import {
  bereichOptions,
  bewertungOptions,
  ebeneFieldNames,
  isAnforderungFilled,
  prinzipFieldNames,
  type anforderungSchema,
  type Bewertung,
  type Ebene,
  type PrinzipOrder,
} from "./dokumentationSchema";
import { wizardStorageKeys } from "./session";

// Migrates the answers of the old Dokumentation (removed with the new wizard)
// once to the flat data of the new one. Self-contained, as the old code is gone.

export const legacyStorageKey = "documentationData";

const LEGACY_VERSION = "2";

// The old Dokumentation identified the Prinzipien by their documentId, the new
// one by their order (see the Prinzipien in src/content/prinzipien)
export const legacyPrinzipOrders: Readonly<Record<string, PrinzipOrder>> = {
  r57rc9d82ulv2bsc3gdbnj73: 1,
  s18bibg9sdf0jt8up7h8btup: 2,
  habu0yjh39lc5wug5mqsqzaj: 3,
  got436pv8femeqmv6ee8wlm1: 4,
  bnx9lmblnceu1m3uy3rziy0i: 5,
};

// The old answers were stored as their labels, which haven't changed
const bewertungByLabel = new Map<string, Bewertung>(
  bewertungOptions.map((option) => [option.label, option.value]),
);

const bewertungByRating: Readonly<Record<string, Bewertung>> = {
  positive: "yes",
  risky: "no",
  "not-applicable": "not-relevant",
};

const ebenen = {
  legal: "rechtlich",
  organizational: "organisatorisch",
  semantic: "semantisch",
  technical: "technisch",
} as const satisfies Record<string, Ebene>;

// The old "Für wen gilt diese verbindliche Anforderung?" offered these options,
// the new one is free text, so their labels are taken over
const betroffeneLabels: Readonly<Record<string, string>> = {
  localPublicSectorBody: "Öffentliche Stelle (Kommunen / lokal)",
  regionalPublicSectorBody: "Öffentliche Stelle (Länder / regional)",
  nationalPublicSectorBody: "Öffentliche Stelle (Bund / national)",
  europeanUnionInstitution: "EU-Institution",
  europeanUnionAgency: "EU-Agentur",
  europeanUnionBody: "EU-Einrichtung",
  privateBusinesses: "Private Unternehmen",
};

type Bereich = (typeof bereichOptions)[number]["value"];

const bereiche = new Set<string>(bereichOptions.map((option) => option.value));

const isBereich = (value: string): value is Bereich => bereiche.has(value);

// Lenient on purpose: unknown values are left out by the mapping below and
// invalid ones by the store's decode, instead of dropping all the data.
const text = z.string().optional().catch(undefined);
const texts = z.array(z.string()).optional().catch(undefined);

const legacySchema = z.object({
  version: z.literal(LEGACY_VERSION),
  policyTitle: z.object({ title: text, organization: text }).optional(),
  participation: z.object({ formats: text, results: text }).optional(),
  principles: z
    .array(
      z.object({ id: text, answer: text, aspects: texts, reasoning: text }),
    )
    .optional(),
  euInteroperabilityOutcome: z.object({ outcomeId: text }).optional(),
  bindingRequirements: z
    .object({
      requirements: z
        .array(
          z.object({
            legalReference: text,
            description: text,
            services: text,
            serviceAreas: texts,
            stakeholderGroups: texts,
          }),
        )
        .optional(),
    })
    .optional(),
  interoperabilityAssessment: z
    .object(
      Object.fromEntries(
        Object.keys(ebenen).map((key) => [
          key,
          z.object({ rating: text, detail: text }).optional(),
        ]),
      ) as Record<
        keyof typeof ebenen,
        z.ZodOptional<z.ZodObject<{ rating: typeof text; detail: typeof text }>>
      >,
    )
    .optional(),
  interoperabilityMeta: z
    .object({
      publicationStatus: text,
      publicationDate: text,
      publicationLink: text,
    })
    .optional(),
});

type LegacyData = z.infer<typeof legacySchema>;

// Empty strings count as no answer
const answer = (value?: string) => (value?.trim() ? value : undefined);

const toPrinzipFields = (principles: LegacyData["principles"] = []) =>
  principles.flatMap((principle): [string, unknown][] => {
    const order = principle.id && legacyPrinzipOrders[principle.id];
    const antwort = principle.answer && bewertungByLabel.get(principle.answer);
    if (!order || !antwort) return [];
    const names = prinzipFieldNames(order);
    return [
      [names.antwort, antwort],
      [
        names.schwerpunkte,
        antwort === "yes" && principle.aspects?.length
          ? principle.aspects
          : undefined,
      ],
      [names.erklaerung, answer(principle.reasoning)],
    ];
  });

const toAnforderungen = (
  requirements: NonNullable<LegacyData["bindingRequirements"]>["requirements"],
) => {
  const anforderungen: z.infer<typeof anforderungSchema>[] = (
    requirements ?? []
  )
    .map((requirement) => ({
      titel: requirement.description ?? "",
      rechtsgrundlage: requirement.legalReference ?? "",
      dienste: requirement.services ?? "",
      bereiche: (requirement.serviceAreas ?? []).filter(isBereich),
      betroffene: (requirement.stakeholderGroups ?? [])
        .map((group) => betroffeneLabels[group])
        .filter(Boolean)
        .join(", "),
    }))
    .filter(isAnforderungFilled);
  return anforderungen.length > 0 ? anforderungen : undefined;
};

const toEbeneFields = (
  assessment: LegacyData["interoperabilityAssessment"] = {},
) =>
  Object.entries(ebenen).flatMap(([key, ebene]): [string, unknown][] => {
    const level = assessment[key as keyof typeof ebenen];
    const names = ebeneFieldNames(ebene);
    return [
      [names.bewertung, bewertungByRating[level?.rating ?? ""]],
      [names.erklaerung, answer(level?.detail)],
    ];
  });

const toVeroeffentlichung = (meta: LegacyData["interoperabilityMeta"]) => {
  const status = meta?.publicationStatus;
  if (status !== "planned" && status !== "published") return {};
  // The date is only asked for "planned" and the link for "published"
  return {
    "veroeffentlichung-status": status,
    "veroeffentlichung-datum":
      status === "planned" ? answer(meta?.publicationDate) : undefined,
    "veroeffentlichung-link":
      status === "published" ? answer(meta?.publicationLink) : undefined,
  };
};

const outcomeBezug: Readonly<Record<string, string>> = {
  REQUIRED: "yes",
  NOT_REQUIRED: "no",
};

/** Converts the old data to the fields of the new Dokumentation, leaving out missing answers */
export const fromLegacyDokumentation = (legacy: LegacyData) => {
  const data: Record<string, unknown> = {
    "regelungsvorhaben-titel": answer(legacy.policyTitle?.title),
    "regelungsvorhaben-organisation": answer(legacy.policyTitle?.organization),
    "beteiligungsformate-erklaerung": answer(legacy.participation?.formats),
    "beteiligungsformate-erkenntnisse": answer(legacy.participation?.results),
    ...Object.fromEntries(toPrinzipFields(legacy.principles)),
    "eu-interoperabilitaet-bezug":
      outcomeBezug[legacy.euInteroperabilityOutcome?.outcomeId ?? ""],
    "verbindliche-anforderungen": toAnforderungen(
      legacy.bindingRequirements?.requirements,
    ),
    ...Object.fromEntries(toEbeneFields(legacy.interoperabilityAssessment)),
    ...toVeroeffentlichung(legacy.interoperabilityMeta),
  };
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );
};

const parseLegacy = (encoded: string) => {
  try {
    return legacySchema.safeParse(JSON.parse(encoded)).data;
  } catch {
    return undefined;
  }
};

/**
 * Moves the old Dokumentation to the new storage key, unless the new wizard
 * already has data, and removes it. Old data of another version or that can't
 * be read is only removed, as the old Dokumentation discarded it as well.
 * Has to run before the store reads its data (see stores.ts).
 */
export const migrateLegacyDokumentation = (
  storage: Storage | undefined = globalThis.localStorage,
) => {
  // No storage on the server
  if (!storage) return;
  const encoded = storage.getItem(legacyStorageKey);
  if (encoded === null) return;

  const legacy = parseLegacy(encoded);
  if (legacy && storage.getItem(wizardStorageKeys.dokumentation) === null) {
    const data = fromLegacyDokumentation(legacy);
    if (Object.keys(data).length > 0) {
      try {
        storage.setItem(wizardStorageKeys.dokumentation, JSON.stringify(data));
      } catch {
        // Kept for the next attempt, e.g. when the storage is full
        return;
      }
    }
  }
  storage.removeItem(legacyStorageKey);
};
