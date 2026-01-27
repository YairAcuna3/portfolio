"use server";

import { prisma } from "@/lib/prisma";

export async function getProjects(isDeleted: boolean) {
  const projects = await prisma.project.findMany({
    where: {
      deleted: isDeleted,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      technologies: true,
      links: true,
    },
  });

  return projects;
}
