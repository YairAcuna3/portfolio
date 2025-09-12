import { Project } from "./project";

export type Technology = {
  id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
  projects: Project[];
};

export type OnlyTechnology = Omit<Technology, "projects">;
