import type { Job } from "~/types/Job";

export interface Company {
  path: string;
  name: string;
  url: string;
  logo: string;
  position: string;
  start: string;
  end?: string;
  content: Record<string, any>;
  jobs: Job[];
}
