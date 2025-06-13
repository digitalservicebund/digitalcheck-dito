export const getPlausibleEventClassName = (plausibleEventName?: string) =>
  plausibleEventName ? `plausible-event-name=${plausibleEventName}` : "";
