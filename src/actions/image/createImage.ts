"use server";

import { OnlyImage } from "@/types/image";
import { prisma } from "@/lib/prisma";

type Input = {
  url: string;
  projectId: string;
};

type Response = {
  success: boolean;
  data?: OnlyImage;
  error?: string;
};

export async function createImage(input: Input): Promise<Response> {
  try {
    if (!input.url || !input.projectId) {
      return {
        success: false,
        error: "URL and projectId are required",
      };
    }

    try {
      new URL(input.url);
    } catch {
      return {
        success: false,
        error: "That URL is not ok bro",
      };
    }

    const projectExists = await prisma.project.findUnique({
      where: { id: input.projectId },
    });

    if (!projectExists) {
      return {
        success: false,
        error: "El proyecto no existe",
      };
    }

    const image = await prisma.image.create({
      data: {
        url: input.url,
        projectId: input.projectId,
        createdAt: new Date(),
      },
    });

    return {
      success: true,
      data: image,
    };
  } catch (error) {
    console.error("Error creating image:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unkown error on creating image",
    };
  }
}
