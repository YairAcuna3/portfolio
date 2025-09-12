import { Project } from "./project";

export type Image = {
  id: string;
  url: string;
  project: Project;
  projectId: string;
  createdAt: Date;
};

export type OnlyImage = Pick<Image, "url" | "id">;
