export const getDownloadableExtensionName = (href: string) => {
  const downloadableExtensions = new Map<string, string>();
  downloadableExtensions.set("pdf", "PDF");
  downloadableExtensions.set("docx", "DOCX");
  downloadableExtensions.set("xlsx", "XLSX");
  downloadableExtensions.set("pptx", "PPTX");

  const fileEnding = getFileExtension(href);
  const ext = fileEnding && downloadableExtensions.get(fileEnding);

  return ext || undefined;
};

export const getFileExtension = (href: string) => {
  const lastSlash = href.lastIndexOf("/");
  const lastDot = href.lastIndexOf(".");

  // Extension only if the dot is after the last slash (i.e., part of the filename)
  if (lastDot > lastSlash) {
    return href.substring(lastDot + 1);
  }
  return null;
};
