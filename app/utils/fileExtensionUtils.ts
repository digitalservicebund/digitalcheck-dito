export const getDownloadableExtensionName = (href: string) => {
  const downloadableExtensions = new Map<string, string>();
  downloadableExtensions.set("pdf", "PDF");
  downloadableExtensions.set("docx", "DOCX");
  downloadableExtensions.set("xlsx", "XLSX");
  downloadableExtensions.set("pptx", "PPTX");

  const fileEnding = href.match(/[^/.]+$/);
  const ext = fileEnding && downloadableExtensions.get(fileEnding[0]);

  return ext || undefined;
};
