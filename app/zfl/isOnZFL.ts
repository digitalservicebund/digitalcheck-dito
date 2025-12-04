export const isOnZFL = (url?: URL) => {
  const hostname = url?.hostname || globalThis.location?.hostname;
  return (
    hostname?.includes("zfl.bund.de") ||
    hostname?.includes("zentrum-fuer-legistik.bund.de")
  );
};
