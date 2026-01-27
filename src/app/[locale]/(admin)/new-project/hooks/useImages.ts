import { OnlyImage } from "@/types";
import { useState, ChangeEvent } from "react";

export const useImageFiles = (initialUrls: OnlyImage[] = []) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<OnlyImage[]>(
    initialUrls.sort((a, b) => a.order - b.order),
  );

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

  const reorderImageFiles = (startIndex: number, endIndex: number) => {
    setImageFiles((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const reorderImageUrls = (startIndex: number, endIndex: number) => {
    setImageUrls((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return {
    imageFiles,
    imageUrls,
    addImage,
    removeImageFile,
    removeImageUrl,
    reorderImageFiles,
    reorderImageUrls,
  };
};
