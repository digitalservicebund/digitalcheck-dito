export type Option = {
  value: string;
  label: string;
};

export function keyValueToMap(options: readonly Option[]): Map<string, string> {
  return new Map(options.map(({ value, label }) => [value, label]));
}
