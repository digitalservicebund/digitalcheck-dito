export const getPlausibleEvent = (plausibleEventName?: string) =>
  plausibleEventName ? `plausible-event-name=${plausibleEventName}` : "";
