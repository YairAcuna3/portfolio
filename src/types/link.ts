import { LINK_TYPES } from "@/constants/linkTypes";
import { Project } from "./project";

export type Link = {
  id: string;
  type: string;
  url: string;
  icon?: string | null;
  Project: Project;
  projectId: string;
  createdAt: Date;
};

export type OnlyLink = Omit<Link, "Project" | "createdAt" | "projectId">;

export type LinkType = (typeof LINK_TYPES)[number]["label"];
export type LinkIcon = (typeof LINK_TYPES)[number]["icon"];
