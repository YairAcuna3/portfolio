"use server";

import { prisma } from "@/lib/prisma";

export async function toggleProject(slug: string, isDeleted: boolean) {
  return await prisma.project.update({
    where: {
      slug: slug,
    },
    data: {
      deleted: isDeleted,
    },
  });
}
