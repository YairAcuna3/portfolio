import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary directamente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// Método GET para verificar que el endpoint esté funcionando
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload endpoint is working",
    timestamp: new Date().toISOString(),
    cloudinaryConfig: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
        ? "✓ Configured"
        : "✗ Missing",
      apiKey: process.env.CLOUDINARY_API_KEY ? "✓ Configured" : "✗ Missing",
      apiSecret: process.env.CLOUDINARY_API_SECRET
        ? "✓ Configured"
        : "✗ Missing",
    },
  });
}

export async function POST(request: NextRequest) {
  console.log("=== UPLOAD API CALLED ===");

  try {
    // Verificar variables de entorno
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables");
      return NextResponse.json(
        { success: false, error: "Cloudinary configuration missing" },
        { status: 500 },
      );
    }

    console.log("Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio";

    console.log("File received:", {
      name: file?.name,
      size: file?.size,
      type: file?.type,
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large. Max: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 400 },
      );
    }

    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    console.log("Converting to buffer...");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Uploading to Cloudinary...");

    // Subir a Cloudinary usando Promise
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folder,
            resource_type: "image",
            quality: "auto:good",
            fetch_format: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary error:", error);
              reject(error);
            } else if (!result) {
              reject(new Error("No result from Cloudinary"));
            } else {
              console.log("Upload successful:", result.public_id);
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    // Verificar que result tenga las propiedades necesarias
    if (!result || typeof result !== "object" || !("secure_url" in result)) {
      throw new Error("Invalid result from Cloudinary");
    }

    const cloudinaryResult = result as {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
    };

    return NextResponse.json({
      success: true,
      data: {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: `Upload failed: ${errorMessage}`,
      },
      { status: 500 },
    );
  }
}
