export const dedent = (strings: TemplateStringsArray, ...values: string[]) => {
  const content = strings.reduce(
    (res, str, i) => res + str + (values[i] || ""), // join string segments and insert interpolations (any ${} values)
    "",
  );
  const leadingIndentation = /^[ \t]*(?=\S)/gm; // matches leading spaces and tabs for each line
  const numberOfWhiteSpaces = (content.match(leadingIndentation) || [""]) // create array of whitespaces leading each line
    .map((el) => el.length); // count whitespaces leading each line
  const numberOfWhitespacesLeadingAllLines = Math.min(...numberOfWhiteSpaces); // find smallest number of whitespaces -> shared indent of all lines
  const leadingWhitespaces = new RegExp( // match leading whitespaces in each line
    `^ {${numberOfWhitespacesLeadingAllLines}}`,
    "gm",
  );
  return content.replace(leadingWhitespaces, "").trim(); // remove leading whitespaces for all lines
};
