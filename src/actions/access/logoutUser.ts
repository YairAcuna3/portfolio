"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return { success: true };
}
