"use client";

export async function uploadFile(file: File, folder?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) {
    formData.append("folder", folder);
  }

  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error uploading image");
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "Error uploading image");
  }

  return data.data.url as string;
}

export async function uploadMultipleFiles(
  files: File[],
  folder?: string,
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  return Promise.all(uploadPromises);
}
