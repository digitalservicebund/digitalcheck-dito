export const isOnZFL = () =>
  globalThis.location?.hostname.startsWith("zfl.bund.de") &&
  globalThis.location?.hostname.startsWith("zentrum-fuer-legistik.bund.de");
