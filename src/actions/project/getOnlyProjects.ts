"use server";

import { prisma } from "@/lib/prisma";

export async function getOnlyProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
