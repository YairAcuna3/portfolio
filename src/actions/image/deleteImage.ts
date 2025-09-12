"use server";

import cloudinary from "@/lib/cloudinary";

export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return { success: true };
    } else {
      return {
        success: false,
        error: "The image weren't find",
      };
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: "Error deleting image" };
  }
}
