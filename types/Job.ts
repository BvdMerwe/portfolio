export interface Job {
  path: string;
  name: string;
  company: string;
  images: string[];
  impact: string[];
  tools: string[];
  challenges: string;
  content: Record<string, any>;
}
