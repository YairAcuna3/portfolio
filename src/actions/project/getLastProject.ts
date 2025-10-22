"use server";

import { prisma } from "@/lib/prisma";

export async function getLastProject() {
  const lastProject = await prisma.project.findFirst({
    where: {
      deleted: false,
    },
    orderBy: {
      startAt: "desc",
    },
    include: {
      images: true,
      technologies: true,
    },
  });

  return lastProject;
}
