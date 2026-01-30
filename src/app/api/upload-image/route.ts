import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import sharp from "sharp";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function POST(request: NextRequest) {
  try {
    console.log("Starting image upload process...");

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio";

    console.log(
      "File received:",
      file?.name,
      "Size:",
      file?.size,
      "Type:",
      file?.type,
    );

    if (!file) {
      console.error("No file provided");
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validar tamaño del archivo
    if (file.size > MAX_FILE_SIZE) {
      console.error("File too large:", file.size);
      return NextResponse.json(
        {
          success: false,
          error: `File size too large. Maximum allowed: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 400 },
      );
    }

    // Validar tipo de archivo
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log("Converting file to buffer...");
    // Convertir archivo a buffer
    const arrayBuffer = await file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);
    let processedBuffer: Buffer = originalBuffer;

    // Optimizar y convertir a WebP usando Sharp
    try {
      console.log("Optimizing image with Sharp...");
      const sharpInstance = sharp(originalBuffer);
      const optimizedBuffer = await sharpInstance
        .webp({
          quality: 85, // Calidad del 85%
          effort: 6, // Máximo esfuerzo de compresión
        })
        .resize(1920, 1080, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .toBuffer();

      processedBuffer = optimizedBuffer;
      console.log("Image optimized successfully");
    } catch (sharpError) {
      console.error("Error optimizing image with Sharp:", sharpError);
      // Si falla la optimización, usar el buffer original
      processedBuffer = originalBuffer;
    }

    console.log("Uploading to Cloudinary...");
    // Subir a Cloudinary con timeout y retry
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Upload timeout: Request took too long"));
      }, 120000); // 2 minutos timeout

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          format: "webp", // Forzar formato WebP
          quality: "auto:good",
          fetch_format: "auto",
          transformation: [
            { width: 1920, height: 1080, crop: "limit" },
            { quality: "auto:good" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          clearTimeout(timeout);

          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(
              new Error(
                `Cloudinary error: ${error.message || "Unknown cloudinary error"}`,
              ),
            );
          } else if (!result) {
            console.error("Cloudinary upload failed: No result returned");
            reject(new Error("Cloudinary upload failed: No result returned"));
          } else {
            console.log("Cloudinary upload successful:", result.public_id);
            resolve(result as UploadApiResponse);
          }
        },
      );

      // Escribir el buffer al stream
      try {
        uploadStream.end(processedBuffer);
      } catch (streamError) {
        clearTimeout(timeout);
        console.error("Error writing to upload stream:", streamError);
        reject(
          new Error(
            `Stream error: ${streamError instanceof Error ? streamError.message : "Unknown stream error"}`,
          ),
        );
      }
    });

    const responseData = {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    };

    console.log("Upload completed successfully:", responseData.data.publicId);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error uploading image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Asegurar que siempre devolvemos un JSON válido
    const errorResponse = {
      success: false,
      error: `Failed to upload image: ${errorMessage}`,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
