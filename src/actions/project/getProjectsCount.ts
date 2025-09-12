"use server";

import { prisma } from "@/lib/prisma";

export async function getProjectsCount() {
  const count = await prisma.project.count({
    where: { deleted: false },
  });
  return count;
}
