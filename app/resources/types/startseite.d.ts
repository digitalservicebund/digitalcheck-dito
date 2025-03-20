interface Startseite {
  title: string;
  subtitle: string;
  list: List;
  dataNotice: DataNotice;
  trainings: Trainings;
  interoperability: Trainings;
  summary: Summary;
  principles: Principles;
}

interface Principles {
  title: string;
  content: string[];
  link: Link2;
}

interface Link2 {
  text: string;
  href: string;
}

interface Summary {
  title: string;
  items: Item2[];
}

interface Item2 {
  headline: Headline;
  content: string;
}

interface Trainings {
  title: string;
  text: string;
  link: Link;
}

interface Link {
  text: string;
  href: string;
  look: string;
}

interface DataNotice {
  headline: string;
  content: string;
}

interface List {
  title: string;
  items: Item[];
}

interface Item {
  headline: Headline;
  content: string;
  buttons?: Button[];
  finished?: Finished;
  spacer?: Headline;
}

interface Finished {
  headline: Headline;
  isDisabled: boolean;
}

interface Button {
  text: string;
  href: string;
  look?: string;
}

interface Headline {
  text: string;
}
