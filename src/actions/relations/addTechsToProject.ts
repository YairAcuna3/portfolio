"use server";

import { prisma } from "@/lib/prisma";

type Input = {
  projectId: string;
  technologyIds: string[];
};

type Response = {
  success: boolean;
  data?: {
    projectId: string;
    technologyIds: string[];
  };
  error?: string;
};

export async function addTechnologiesToProject(
  input: Input
): Promise<Response> {
  try {
    if (!input.projectId || !input.technologyIds) {
      return {
        success: false,
        error: "projectId and technologyIds are required",
      };
    }

    if (input.technologyIds.length === 0) {
      return {
        success: false,
        error: "At least one technologyId is required",
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
        error: "The project doesn't exist or has been erased",
      };
    }

    const technologies = await prisma.technology.findMany({
      where: {
        id: {
          in: input.technologyIds,
        },
      },
    });

    const foundIds = technologies.map((tech) => tech.id);
    const missingIds = input.technologyIds.filter(
      (id) => !foundIds.includes(id)
    );

    if (missingIds.length > 0) {
      return {
        success: false,
        error: `The following technologies don't exist: ${missingIds.join(
          ", "
        )}`,
      };
    }

    const projectWithExistingTech = await prisma.project.findUnique({
      where: { id: input.projectId },
      include: {
        technologies: {
          where: {
            id: {
              in: input.technologyIds,
            },
          },
          select: { id: true },
        },
      },
    });

    const existingTechIds =
      projectWithExistingTech?.technologies.map((t) => t.id) || [];
    const newTechIds = input.technologyIds.filter(
      (id) => !existingTechIds.includes(id)
    );

    if (newTechIds.length === 0) {
      return {
        success: false,
        error: "All technologies are already associated with this project",
      };
    }

    await prisma.project.update({
      where: { id: input.projectId },
      data: {
        technologies: {
          connect: newTechIds.map((id) => ({ id })),
        },
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: {
        projectId: input.projectId,
        technologyIds: newTechIds,
      },
    };
  } catch (error) {
    console.error("Error adding technologies to project:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error associating technologies",
    };
  }
}
