import { NextRequest, NextResponse } from "next/server";

// Método GET para verificar que el endpoint esté funcionando
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload endpoint is working",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  console.log("=== UPLOAD API CALLED ===");
  console.log("Method:", request.method);
  console.log("URL:", request.url);

  try {
    console.log("Processing upload request...");

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

    // Por ahora, solo devolver una respuesta de éxito sin procesar el archivo
    // Esto nos ayudará a confirmar que el endpoint funciona
    const mockResponse = {
      success: true,
      data: {
        url:
          "https://via.placeholder.com/800x600/0066cc/ffffff?text=Uploaded+" +
          encodeURIComponent(file.name),
        publicId: "mock_" + Date.now(),
        width: 800,
        height: 600,
        format: "jpg",
        bytes: file.size,
      },
    };

    console.log("Returning mock response:", mockResponse);
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Error in upload endpoint:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    const errorResponse = {
      success: false,
      error: `Failed to upload image: ${errorMessage}`,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
