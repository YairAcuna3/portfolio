"use server";

import { prisma } from "@/lib/prisma";

export async function getProjectsToShow(isDeleted: boolean) {
  const projects = await prisma.project.findMany({
    where: {
      deleted: isDeleted,
    },
    orderBy: {
      startAt: "desc",
    },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
      technologies: true,
    },
  });

  return projects;
}
