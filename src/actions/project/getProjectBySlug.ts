"use server";

import { prisma } from "@/lib/prisma";

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: {
      slug: slug,
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      technologies: true,
      links: true,
    },
  });
}
