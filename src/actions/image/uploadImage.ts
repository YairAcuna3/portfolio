"use server";

import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadImage(file: File, path: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: path }, (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        })
        .end(buffer);
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error to upload the image:", error);
    return { success: false, error: "The image cannot be uploaded" };
  }
}
