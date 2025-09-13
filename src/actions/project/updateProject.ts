"use server";

import { prisma } from "@/lib/prisma";
import { OnlyProject } from "@/types/project";
import { generateUniqueSlug } from "@/utils/generateSlug";

type Input = {
  id: string;
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

export async function updateProject(input: Input): Promise<Response> {
  try {
    if (!input.id) throw new Error("ProjectId is required!");

    if (!input.name || input.name.trim().length < 1) {
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
        id: { not: input.id },
        deleted: false,
      },
    });

    if (existingProject) {
      return {
        success: false,
        error: "Choose another name, that already exists!",
      };
    }

    const currentProject = await prisma.project.findUnique({
      where: { id: input.id },
    });

    let slug = currentProject?.slug || "";
    if (input.name !== currentProject?.name) {
      slug = await generateUniqueSlug(input.name);
    }

    const project = await prisma.project.update({
      where: { id: input.id },
      data: {
        name: input.name,
        slug,
        description: desc,
        type: input.type ?? null,
        madeFor: input.madeFor ?? null,
        startAt: input.startAt ?? null,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error updating project:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error updating project",
    };
  }
}
