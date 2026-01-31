"use client";

export async function uploadFile(file: File, folder?: string): Promise<string> {
  try {
    console.log("Starting file upload:", file.name, "Size:", file.size);

    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    console.log("Upload response status:", res.status);

    // Leer la respuesta una sola vez
    const responseText = await res.text();
    console.log("Raw response:", responseText);

    // Verificar si la respuesta es válida
    if (!res.ok) {
      let errorMessage = `HTTP error! status: ${res.status}`;

      // Manejo específico para error 405
      if (res.status === 405) {
        errorMessage =
          "Method Not Allowed - The upload endpoint may not be properly configured";
        console.error("405 Error Details:", {
          url: res.url,
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries()),
        });
      }

      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        errorMessage = responseText || errorMessage;
      }

      throw new Error(`Error uploading ${file.name}: ${errorMessage}`);
    }

    // Intentar parsear la respuesta exitosa
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Failed to parse success response as JSON:", jsonError);
      throw new Error(
        `Error uploading ${file.name}: Invalid response format. Response: ${responseText}`,
      );
    }

    if (!data.success) {
      throw new Error(
        `Error uploading ${file.name}: ${data.error || "Unknown error"}`,
      );
    }

    console.log("File uploaded successfully:", data.data.url);
    return data.data.url as string;
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(errorMessage);
  }
}

export async function uploadMultipleFiles(
  files: File[],
  folder?: string,
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  return Promise.all(uploadPromises);
}
