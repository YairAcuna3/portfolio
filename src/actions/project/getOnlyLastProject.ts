"use server";

import { prisma } from "@/lib/prisma";

export async function getOnlyLastProject() {
  return await prisma.project.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
}
