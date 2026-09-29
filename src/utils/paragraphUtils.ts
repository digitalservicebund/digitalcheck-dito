export type Node = {
  type: string;
  text?: string;
  children?: Node[];
  format?: string;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
  url?: string;
};
