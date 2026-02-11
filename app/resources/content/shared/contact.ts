export const contact = {
  email: "digitalcheck@digitalservice.bund.de",
  interoperabilityEmail: "interoperabel@digitalservice.bund.de",
  nkrEmail: "nkr@bmjv.bund.de",
  mdMailToLink: (email: string, subject?: string) =>
    subject
      ? `[${email}](mailto:${email}?subject=${encodeURIComponent(subject)})`
      : `[${email}](mailto:${email})`,
  phoneDisplay: "0151/40 76 78 39",
  phone: "tel:+4915140767839",
  mdPhoneLink: () => `[${contact.phoneDisplay}](${contact.phone})`,
};
