"use client";

//TODO: to upload since the client (still unused)
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tu_upload_preset");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Error uploading image on client util");

  const data = await res.json();
  return data.secure_url as string;
}
