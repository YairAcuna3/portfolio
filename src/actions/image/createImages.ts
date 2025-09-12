"use server";

import { OnlyImage } from "@/types/image";
import { prisma } from "@/lib/prisma";

type Input = {
  urls: string[];
  projectId: string;
};

type Response = {
  success: boolean;
  data?: OnlyImage[];
  error?: string;
};

export async function createImages(input: Input): Promise<Response> {
  try {
    if (!input.urls || !input.projectId) {
      return { success: false, error: "URLs and projectId are required" };
    }

    if (input.urls.length === 0) {
      return { success: false, error: "At least one URL is required" };
    }

    const projectExists = await prisma.project.findUnique({
      where: { id: input.projectId, deleted: false },
    });

    if (!projectExists) {
      return { success: false, error: "That project doesn't exist!" };
    }

    const validUrls: string[] = [];
    input.urls.forEach((url) => {
      try {
        new URL(url);
        validUrls.push(url);
      } catch {
        // Ignore invalid URL
      }
    });

    if (validUrls.length === 0) {
      return { success: false, error: "No valid URLs to create!" };
    }

    const existingImages = await prisma.image.findMany({
      where: { projectId: input.projectId, url: { in: validUrls } },
      select: { url: true },
    });

    const existingUrls = existingImages.map((img) => img.url);
    const uniqueUrls = validUrls.filter((url) => !existingUrls.includes(url));

    if (uniqueUrls.length === 0) {
      return {
        success: false,
        error: "All URLs already exist for this project!",
      };
    }

    await prisma.image.createMany({
      data: uniqueUrls.map((url) => ({
        url,
        projectId: input.projectId,
        createdAt: new Date(),
      })),
      skipDuplicates: true,
    });

    const createdImages = await prisma.image.findMany({
      where: { projectId: input.projectId, url: { in: uniqueUrls } },
    });

    return { success: true, data: createdImages };
  } catch (error) {
    console.error("Error creating images:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error creating images",
    };
  }
}
