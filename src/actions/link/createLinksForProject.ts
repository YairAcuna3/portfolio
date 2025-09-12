"use server";

import { prisma } from "@/lib/prisma";
import { OnlyLink } from "@/types";

export async function createLinksForProject(
  projectId: string,
  links: OnlyLink[]
) {
  try {
    if (!projectId) throw new Error("El projectId es requerido");
    if (!links || links.length === 0) throw new Error("No se recibieron links");

    const created = await prisma.link.createMany({
      data: links.map((link) => ({
        url: link.url,
        type: link.type,
        icon: link.icon,
        projectId,
      })),
      skipDuplicates: true,
    });

    return { success: true, count: created.count };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
