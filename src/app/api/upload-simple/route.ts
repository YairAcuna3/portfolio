import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Simple upload endpoint is working",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  console.log("=== SIMPLE UPLOAD API CALLED ===");

  try {
    // Verificar que podemos leer el formData
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Solo devolver información del archivo sin procesarlo
    return NextResponse.json({
      success: true,
      message: "File received successfully (not uploaded)",
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: "https://via.placeholder.com/800x600", // URL de placeholder
      },
    });
  } catch (error) {
    console.error("Simple upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
