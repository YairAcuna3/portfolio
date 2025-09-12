"use server";

import { prisma } from "@/lib/prisma";

type Input = {
  projectId: string;
  technologyId: string;
};

type Response = {
  success: boolean;
  data?: {
    projectId: string;
    technologyId: string;
  };
  error?: string;
};

export async function addTechnologyToProject(input: Input): Promise<Response> {
  try {
    if (!input.projectId || !input.technologyId) {
      return {
        success: false,
        error: "projectId and technologyId are required",
      };
    }

    const projectExists = await prisma.project.findUnique({
      where: {
        id: input.projectId,
        deleted: false,
      },
    });

    if (!projectExists) {
      return {
        success: false,
        error: "the project doesn't exist or had be erased",
      };
    }

    const technologyExists = await prisma.technology.findUnique({
      where: { id: input.technologyId },
    });

    if (!technologyExists) {
      return {
        success: false,
        error: "that technology doesn't exist",
      };
    }

    const existingRelation = await prisma.project.findFirst({
      where: {
        id: input.projectId,
        technologies: {
          some: {
            id: input.technologyId,
          },
        },
      },
    });

    if (existingRelation) {
      return {
        success: false,
        error: "that technology alreary exist in that project",
      };
    }

    await prisma.project.update({
      where: { id: input.projectId },
      data: {
        technologies: {
          connect: { id: input.technologyId },
        },
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: {
        projectId: input.projectId,
        technologyId: input.technologyId,
      },
    };
  } catch (error) {
    console.error("Error adding technology to project:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unkown error associate that technology",
    };
  }
}
