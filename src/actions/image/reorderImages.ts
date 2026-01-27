"use server";

import { prisma } from "@/lib/prisma";

type Input = {
  imageIds: string[];
  projectId: string;
};

type Response = {
  success: boolean;
  error?: string;
};

export async function reorderImages(input: Input): Promise<Response> {
  try {
    if (!input.imageIds || !input.projectId) {
      return { success: false, error: "Image IDs and project ID are required" };
    }

    // Verify all images belong to the project
    const images = await prisma.image.findMany({
      where: {
        id: { in: input.imageIds },
        projectId: input.projectId,
      },
    });

    if (images.length !== input.imageIds.length) {
      return {
        success: false,
        error: "Some images don't belong to this project",
      };
    }

    // Update the order of each image
    const updatePromises = input.imageIds.map((imageId, index) =>
      prisma.image.update({
        where: { id: imageId },
        data: { order: index },
      }),
    );

    await Promise.all(updatePromises);

    return { success: true };
  } catch (error) {
    console.error("Error reordering images:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error reordering images",
    };
  }
}
