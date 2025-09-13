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

export async function updateTechnologiesOfProject(
  input: Input
): Promise<Response> {
  try {
    if (!input.projectId || !input.technologyIds) {
      return {
        success: false,
        error: "projectId and technologyIds are required",
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

    // Validar que las tecnologías existan
    const technologies = await prisma.technology.findMany({
      where: {
        id: { in: input.technologyIds },
      },
    });

    const foundIds = technologies.map((t) => t.id);
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

    // ✅ Aquí reemplazamos todas las relaciones
    await prisma.project.update({
      where: { id: input.projectId },
      data: {
        technologies: {
          set: input.technologyIds.map((id) => ({ id })),
        },
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: {
        projectId: input.projectId,
        technologyIds: input.technologyIds,
      },
    };
  } catch (error) {
    console.error("Error updating technologies of project:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error updating technologies",
    };
  }
}
