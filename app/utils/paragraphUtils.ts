import { Absatz, Prinzip } from "./strapiData.server";

export type AbsatzWithNumber = Absatz & { number: number };
export type Node = {
  type: string;
  text?: string;
  children?: Node[];
  format?: string;
  underline?: boolean;
};

// This function returns an ordered array of Absaetze which have a relevant PrinzipErfuellungen
// interlaced with arrays of Absaetze which have no relevant PrinzipErfuellungen that are grouped together.
export function groupAbsaetzeWithoutRelevantPrinciples(
  absaetze: Absatz[],
  principlesToShow: Prinzip[],
): (AbsatzWithNumber | AbsatzWithNumber[])[] {
  // Filter relevant principles
  const principleNumbers = principlesToShow.map(
    (principle) => principle.Nummer,
  );

  const filteredAbsaetzeWithNumber = absaetze.map((absatz, index) => ({
    ...absatz,
    number: index + 1,
    PrinzipErfuellungen: absatz.PrinzipErfuellungen.filter(
      (erfuellung) =>
        erfuellung.Prinzip &&
        principleNumbers.includes(erfuellung.Prinzip.Nummer),
    ),
  }));

  // Group consecutive Absaetze without a relevant PrinzipErfuellungen together
  return filteredAbsaetzeWithNumber.reduce(
    (groups, absatz) => {
      // If the current Absatz has Erfuellungen, add it as a standalone item
      if (absatz.PrinzipErfuellungen.length) {
        groups.push(absatz);
        return groups;
      }
      const lastGroup = groups[groups.length - 1];
      // Start a new group if:
      // 1. There are no previous groups, or
      // 2. The last item had relevant PrinzipErfuellungen (thus is not an array)
      if (!lastGroup || !Array.isArray(lastGroup)) {
        groups.push([absatz]);
        return groups;
      }
      // Add to existing group
      lastGroup.push(absatz);
      return groups;
    },
    [] as (AbsatzWithNumber | AbsatzWithNumber[])[],
  );
}

// Add Absatz number to text by traversing down the content tree to find the first text node and prepending the number
function prependNumberRecursively(node: Node, number: number): Node {
  if (node.type === "text" && node.text) {
    return {
      ...node,
      text: `(${number}) ${node.text}`,
    };
  }

  if (node.children && node.children.length > 0) {
    return {
      ...node,
      children: [
        prependNumberRecursively(node.children[0], number),
        ...node.children.slice(1),
      ],
    };
  }

  return node;
}

export function prependNumberToAbsatz(absatz: AbsatzWithNumber) {
  return [
    prependNumberRecursively(absatz.Text[0], absatz.number),
    ...absatz.Text.slice(1),
  ];
}
