export const slugify = (string: string) =>
  string.toLowerCase().replaceAll(/[^a-zA-Z0-9]+/g, "-");

export const formatDate = (date: string | undefined) => {
  return date
    ? new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : undefined;
};

export const gesetzStatusMap = {
  Verkuendetes_Gesetz_aktuelle_Fassung: "Verkündetes Gesetz",
  Regelungsentwurf: "Regelungsentwurf",
  Text_im_Parlament: "Text im Parlament",
};

export const removeTrailingSlash = (url: string) => url.replace(/\/$/, "");

// Ignore / and # for path comparison
export const normalizePathname = (path: string) => {
  return removeTrailingSlash(path).split("#")[0];
};

export const isExternalUrl = (url: string) => url.startsWith("http");

export const idFromText = (text: string, preText?: string) =>
  (preText ? `${preText}-` : "") +
  text.split("").reduce((hash, char) => {
    return hash + (char.codePointAt(0) ?? 0);
  }, 0);
