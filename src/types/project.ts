import { Dispatch } from "react";
import { OnlyImage } from "./image";
import { OnlyLink } from "./link";
import { OnlyTechnology } from "./technology";

// As on prisma scheme is
export type Project = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type?: string | null;
  madeFor?: string | null;
  images: OnlyImage[];
  technologies: OnlyTechnology[];
  links: OnlyLink[];
  startAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deleted: boolean;
};

export type OnlyProject = Omit<Project, "images" | "technologies" | "links">;

// To show on home and lists
export type ShowProject = Omit<Project, "links">;

export type CreateProjectHandlerProps = {
  projectTechs: OnlyTechnology[];
  imageFiles: File[];
  links: OnlyLink[];
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  setIsGreatAlert?: Dispatch<React.SetStateAction<boolean>>;
  details: ProjectDetails;
};

export type ProjectDetails = Pick<
  Project,
  "name" | "description" | "type" | "madeFor" | "startAt"
>;
