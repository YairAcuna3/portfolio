"use server";

import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function uploadImage(file: File, path: string) {
  try {
    // Validar tamaño del archivo
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File size too large. Maximum allowed: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      };
    }

    // Validar tipo de archivo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: path,
            resource_type: "image",
            timeout: 60000, // 60 segundos timeout
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error(`Cloudinary error: ${error.message}`));
            } else {
              resolve(result as UploadApiResponse);
            }
          },
        )
        .end(buffer);
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error to upload the image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: `Failed to upload image: ${errorMessage}`,
    };
  }
}
