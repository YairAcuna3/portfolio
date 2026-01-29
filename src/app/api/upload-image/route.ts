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
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validar tamaño del archivo
    if (file.size > MAX_FILE_SIZE) {
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
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Convertir archivo a buffer
    const arrayBuffer = await file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);
    let processedBuffer: Buffer = originalBuffer;

    // Optimizar y convertir a WebP usando Sharp
    try {
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
    } catch (sharpError) {
      console.error("Error optimizing image with Sharp:", sharpError);
      // Si falla la optimización, usar el buffer original
      processedBuffer = originalBuffer;
    }

    // Subir a Cloudinary
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: "image",
            format: "webp", // Forzar formato WebP
            quality: "auto:good",
            fetch_format: "auto",
            timeout: 60000,
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
        .end(processedBuffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        error: `Failed to upload image: ${errorMessage}`,
      },
      { status: 500 },
    );
  }
}
