"use server";

import { prisma } from "@/lib/prisma";
import { OnlyLink } from "@/types";

export async function updateLinksForProject(
  projectId: string,
  links: OnlyLink[]
) {
  try {
    if (!projectId) throw new Error("ProjectId is required!");

    const existingLinks = await prisma.link.findMany({ where: { projectId } });
    const linksToCreate = links.filter((link) => !link.id || link.id === "");

    if (linksToCreate.length > 0) {
      await prisma.link.createMany({
        data: linksToCreate.map((link) => ({
          url: link.url,
          type: link.type,
          icon: link.icon,
          projectId,
        })),
        skipDuplicates: true,
      });
    }

    const idsToKeep = links
      .map((link) => link.id)
      .filter((id) => id && id !== "") as string[];

    const idsToDelete = existingLinks
      .map((link) => link.id)
      .filter((id) => !idsToKeep.includes(id));

    if (idsToDelete.length > 0) {
      await prisma.link.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
