import { OnlyImage } from "@/types";
import { useState, ChangeEvent } from "react";

export const useImageFiles = (initialUrls: OnlyImage[] = []) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<OnlyImage[]>(initialUrls);

  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImageFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImageUrl = (id: string) => {
    setImageUrls((prev) => prev.filter((img) => img.id !== id));
  };

  return { imageFiles, imageUrls, addImage, removeImageFile, removeImageUrl };
};
