import { contact } from "./contact";

interface Bundesland {
  name: string;
  pruefstelleMail?: string;
}

export const bundeslaender = [
  { name: "Bund", pruefstelleMail: contact.nkrEmail },
  { name: "Hessen" },
  { name: "Brandenburg", pruefstelleMail: "TESTTESTTEST@brandenburg.de" },
  { name: "Nordrhein-Westfalen" },
] as const satisfies Bundesland[];

export const pruefstelleMails = new Map<string, string>(
  bundeslaender
    .filter((b) => "pruefstelleMail" in b)
    .map((b) => [b.name, b.pruefstelleMail]),
);
