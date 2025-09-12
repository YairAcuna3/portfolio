"use server";

import { prisma } from "@/lib/prisma";

export async function getTechnologies() {
  return await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
