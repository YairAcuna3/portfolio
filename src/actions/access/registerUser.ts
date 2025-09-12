"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

type Response = {
  success: boolean;
  data?: User;
  error?: string;
};

export async function registerUser(formData: FormData): Promise<Response> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null;

    if (!email || !password) {
      throw new Error("Faltan campos obligatorios");
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ?? undefined,
        createdAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    console.error("Error register user:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error desconocido al crear el proyecto",
    };
  }
}
