export const isOnZFL = (url?: URL) => {
  const hostname = url?.hostname || globalThis.location?.hostname;
  return (
    hostname?.startsWith("zfl.bund.de") ||
    hostname?.startsWith("zentrum-fuer-legistik.bund.de")
  );
};
