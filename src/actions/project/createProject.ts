"use server";

import { prisma } from "@/lib/prisma";
import { OnlyProject } from "@/types/project";
import { generateUniqueSlug } from "@/utils/generateSlug";

type Input = {
  name: string;
  description?: string;
  type?: string;
  madeFor?: string;
  startAt?: Date | null;
};

type Response = {
  success: boolean;
  data?: OnlyProject;
  error?: string;
};

export async function createProject(input: Input): Promise<Response> {
  try {
    if (!input.name) {
      return {
        success: false,
        error: "Name is required",
      };
    }

    if (input.name.length < 1) {
      return {
        success: false,
        error: "The name must have at least 1 character",
      };
    }

    const desc =
      input.description && input.description.trim() !== ""
        ? input.description
        : null;

    const existingProject = await prisma.project.findFirst({
      where: {
        name: input.name,
        deleted: false,
      },
    });

    if (existingProject) {
      return {
        success: false,
        error: "Choose another name, that already exist man!",
      };
    }

    const slug = await generateUniqueSlug(input.name);

    const project = await prisma.project.create({
      data: {
        name: input.name,
        slug: slug,
        description: desc,
        deleted: false,
        type: input.type ?? null,
        madeFor: input.madeFor ?? null,
        startAt: input.startAt ?? null,
      },
    });

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown error create project",
    };
  }
}
