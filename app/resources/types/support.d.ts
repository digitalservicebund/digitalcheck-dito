interface Support {
  title: string;
  subtitle: string;
  socialProof: SocialProof;
  supportWhat: SupportWhat;
  supportHow: SupportHow;
  supportOfferings: SupportOfferings;
}

interface SupportOfferings {
  title: string;
  text: string;
  tabs: Tab[];
}

interface Tab {
  title: string;
  offerings: Offering[];
}

interface Offering {
  title: string;
  text: string;
  sellingPoints: string;
  details: Visualisation[];
  examples?: Example[];
  email?: Email;
  button?: Button2;
}

interface Button2 {
  text: string;
}

interface Email {
  subject: string;
  body: string;
}

interface Example {
  image?: Image;
  text: string;
}

interface SupportHow {
  title: string;
  supportTypes: SupportType[];
}

interface SupportType {
  title: string;
  text: string;
  buttons: Button[];
  iframe?: string;
}

interface Button {
  text: string;
  look: string;
  href?: string;
}

interface SupportWhat {
  title: string;
  subtitle: string;
  supportTypes: SupportTypes;
}

interface SupportTypes {
  visualisation: Visualisation;
  quick: Visualisation;
  extensive: Visualisation;
}

interface Visualisation {
  title: string;
  text: string;
}

interface SocialProof {
  text: string;
  image: Image;
  testimonials: Testimonial[];
}

interface Testimonial {
  quote: string;
  position: string;
  ministry: string;
}

interface Image {
  src: string;
  alt: string;
}
