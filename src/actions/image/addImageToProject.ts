"use server";

import { prisma } from "@/lib/prisma";

interface AddImageToProjectProps {
  projectId: string;
  imageUrl: string;
}

export async function addImageToProject({
  projectId,
  imageUrl,
}: AddImageToProjectProps) {
  try {
    // Obtener el último orden de las imágenes del proyecto
    const lastImage = await prisma.image.findFirst({
      where: { projectId },
      orderBy: { order: "desc" },
    });

    const nextOrder = lastImage ? lastImage.order + 1 : 0;

    // Crear la nueva imagen
    const newImage = await prisma.image.create({
      data: {
        url: imageUrl,
        projectId,
        order: nextOrder,
      },
    });

    return {
      success: true,
      data: newImage,
    };
  } catch (error) {
    console.error("Error adding image to project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
