export interface ToolContent {
  intro: string;
  howTo: {
    title?: string;
    steps: string[];
  };
  faq: {
    title?: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  features?: {
    title?: string;
    items: string[];
  };
  tips?: {
    title?: string;
    items: string[];
  };
}

export interface ToolContentMap {
  [slug: string]: ToolContent;
}