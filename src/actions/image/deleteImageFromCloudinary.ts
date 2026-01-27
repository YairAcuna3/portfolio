"use server";

import cloudinary from "@/lib/cloudinary";

export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        error: `Failed to delete image: ${result.result}`,
      };
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Función helper para extraer el public_id de una URL de Cloudinary
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) return null;

    // El public_id está después de 'upload' y posibles transformaciones
    const pathAfterUpload = urlParts.slice(uploadIndex + 1);

    // Remover transformaciones (empiezan con v seguido de números)
    const versionIndex = pathAfterUpload.findIndex((part) =>
      /^v\d+$/.test(part),
    );
    const pathAfterVersion =
      versionIndex !== -1
        ? pathAfterUpload.slice(versionIndex + 1)
        : pathAfterUpload;

    // Unir el path y remover la extensión
    const publicIdWithExtension = pathAfterVersion.join("/");
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting public_id from URL:", error);
    return null;
  }
}
