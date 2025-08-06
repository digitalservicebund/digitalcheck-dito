import { UIMatch } from "react-router";

export type MatchWithHandle = UIMatch & {
  handle: {
    hasProgressBar?: boolean;
  };
};

export const matchHasHandle = (match: UIMatch): match is MatchWithHandle =>
  Boolean(match.handle && typeof match.handle === "object");
