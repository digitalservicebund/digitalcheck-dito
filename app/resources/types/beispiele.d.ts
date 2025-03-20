interface Beispiele {
  subtitle: string[];
  infoLabels: string[];
  infoTitle: string;
  infoText: string;
  visualisations: Visualisations;
  principles: Principles;
  nkr: Nkr;
  yourRegulation: YourRegulation;
}

interface YourRegulation {
  title: string;
  text: string;
}

interface Nkr {
  title: string;
  subtitle: string;
  linkText: string;
}

interface Principles {
  title: string;
  subtitle: string;
}

interface Visualisations {
  title: string;
  subtitle: string;
  button: string;
  imageInfo: ImageInfo;
}

interface ImageInfo {
  type: string;
  tool: string;
  legalArea: string;
  publishedOn: string;
  law: string;
  digitalCheck: string;
  department: string;
}
