'use client';

import { TrashIcon } from "@/components/icons";
import { OnlyImage } from "@/types";
import Image from "next/image";

interface Props {
    imageFiles: File[];
    imageUrls?: OnlyImage[];
    onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImageFile: (index: number) => void;
    removeImageUrl: (id: string) => void;
}

export default function ImagesPanel({ imageFiles, imageUrls = [], onAddImage, removeImageFile, removeImageUrl }: Props) {
    const combinedImages = [
        ...imageUrls.map((img) => ({ type: "url" as const, value: img })),
        ...imageFiles.map((file, index) => ({ type: "file" as const, value: file, index })),
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-primary-200 text-center">
                Imágenes
            </h2>
            <div className="h-[60vh] w-full flex flex-col border border-gray-300 rounded-lg mx-4 bg-gray-700">
                <div className="overflow-y-auto h-full text-center">
                    {combinedImages.map((img, i) => (
                        <div
                            key={img.type === "url" ? img.value.id : `file-${i}`}
                            className="flex gap-4 items-center justify-between py-2 px-8 rounded-lg hover:text-white hover:bg-primary-700 transition-colors relative h-[320px]"
                        >
                            <div className="relative w-[91%] h-full rounded-md shadow">
                                <Image
                                    src={img.type === "url" ? img.value.url : URL.createObjectURL(img.value)}
                                    alt={img.type === "url" ? `image-${img.value.id}` : img.value.name}
                                    fill
                                    style={{ objectFit: "contain" }} // <-- Cambiado a contain
                                    className="rounded-md"
                                    draggable={false}
                                />
                            </div>
                            <TrashIcon
                                size={20}
                                darkColor="white"
                                lightColor="var(--color-primary-200)"
                                className="cursor-pointer"
                                onClick={() =>
                                    img.type === "url"
                                        ? removeImageUrl(img.value.id)
                                        : removeImageFile(img.index!)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>


            <label className="cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-center block">
                Subir otra…
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onAddImage}
                    className="hidden"
                />
            </label>
        </>
    );
}