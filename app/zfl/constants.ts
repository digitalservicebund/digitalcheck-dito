export const ZFL_ROUTE_PREFIX = "zfl";

export const ZFL_TITLE = "Zentrum für Legistik";

export const ZFL_PHONE = {
  display: "0151/40 76 78 39",
  url: "tel:015140767839",
  get markdown() {
    return `[${this.display}](${this.url})`;
  },
};

export const ZFL_EMAIL = {
  display: "zfl@digitalservice.bund.de",
  url: "mailto:zfl@digitalservice.bund.de",
  get markdown() {
    return `[${this.display}](${this.url})`;
  },
};
