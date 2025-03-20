interface Interoperabel {
  headline: string;
  content: string;
  andDigitalReadiness: AndDigitalReadiness;
  faq: Faq;
  resources: Resources;
  andPolicyMaking: AndPolicyMaking;
  info: Info;
  feedbackForm: FeedbackForm;
}

interface FeedbackForm {
  heading: string;
  trackingEvent: string;
  questions: Question[];
  contact: string;
  button: string;
  success: Success;
}

interface Success {
  heading: string;
  text: string;
}

interface Question {
  id: string;
  trackingEvent: string;
  text: string;
  options: Option[];
}

interface Option {
  label: string;
  value: number;
}

interface Info {
  id: string;
  headline: string;
  items: Item2[];
  image: Image;
}

interface Item2 {
  headline: Headline;
  content: string;
  detailsSummary: DetailsSummary;
}

interface DetailsSummary {
  title: string;
  content: string;
}

interface Headline {
  text: string;
}

interface AndPolicyMaking {
  id: string;
  headline: string;
  content: string;
  image: Image;
  law: Item;
}

interface Resources {
  id: string;
  headline: string;
  subtitle: string;
  groups: Group[];
}

interface Group {
  title: string;
  subtitle: string;
  icon: string;
  content: string;
}

interface Faq {
  id: string;
  headline: string;
  content: string;
  items: Item[];
}

interface Item {
  headline: string;
  content: string;
}

interface AndDigitalReadiness {
  id: string;
  headline: string;
  content: string;
  button: string;
  image: Image;
}

interface Image {
  url: string;
  alternativeText: string;
}
