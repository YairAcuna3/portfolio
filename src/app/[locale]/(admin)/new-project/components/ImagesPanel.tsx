'use client';

import { TrashIcon } from "@/components/icons";
import { OnlyImage } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { uploadFile } from "@/utils/uploadFile";

interface Props {
    imageFiles: File[];
    imageUrls?: OnlyImage[];
    onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImageFile: (index: number) => void;
    removeImageUrl: (id: string) => void;
    reorderImageFiles: (startIndex: number, endIndex: number) => void;
    reorderImageUrls: (startIndex: number, endIndex: number) => void;
    projectId?: string;
    onImageUploaded?: (url: string) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export default function ImagesPanel({
    imageFiles,
    imageUrls = [],
    onAddImage,
    removeImageFile,
    removeImageUrl,
    reorderImageFiles,
    reorderImageUrls,
    projectId,
    onImageUploaded
}: Props) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
    const [uploadProgress, setUploadProgress] = useState<Map<string, number>>(new Map());

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const validFiles: File[] = [];
        const errors: string[] = [];

        files.forEach(file => {
            // Validar tamaño
            if (file.size > MAX_FILE_SIZE) {
                errors.push(`${file.name}: File too large (max 10MB)`);
                return;
            }

            // Validar tipo
            if (!ALLOWED_TYPES.includes(file.type)) {
                errors.push(`${file.name}: Invalid file type`);
                return;
            }

            validFiles.push(file);
        });

        if (errors.length > 0) {
            alert(`Some files were rejected:\n${errors.join('\n')}`);
        }

        if (validFiles.length > 0) {
            // Si tenemos projectId, subir directamente
            if (projectId && onImageUploaded) {
                await handleDirectUpload(validFiles);
            } else {
                // Agregar a la lista temporal para crear proyecto
                const fileList = Object.assign(validFiles, {
                    item: (index: number) => validFiles[index] || null,
                }) as unknown as FileList;

                const syntheticEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        files: fileList
                    }
                };
                onAddImage(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
            }
        }

        // Limpiar el input
        e.target.value = '';
    };

    const handleDirectUpload = async (files: File[]) => {
        for (const file of files) {
            const fileId = `${file.name}-${Date.now()}`;
            setUploadingFiles(prev => new Set(prev).add(fileId));
            setUploadProgress(prev => new Map(prev).set(fileId, 0));

            try {
                // Simular progreso (ya que fetch no tiene progreso real)
                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => {
                        const newMap = new Map(prev);
                        const current = newMap.get(fileId) || 0;
                        if (current < 90) {
                            newMap.set(fileId, current + 10);
                        }
                        return newMap;
                    });
                }, 200);

                const folder = `portfolio/${projectId}`;
                const imageUrl = await uploadFile(file, folder);

                clearInterval(progressInterval);
                setUploadProgress(prev => new Map(prev).set(fileId, 100));

                // Llamar callback con la URL
                if (onImageUploaded) {
                    onImageUploaded(imageUrl);
                }

                // Limpiar estado de subida
                setTimeout(() => {
                    setUploadingFiles(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(fileId);
                        return newSet;
                    });
                    setUploadProgress(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(fileId);
                        return newMap;
                    });
                }, 1000);

            } catch (error) {
                console.error('Error uploading file:', error);
                alert(`Error uploading ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);

                setUploadingFiles(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(fileId);
                    return newSet;
                });
                setUploadProgress(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(fileId);
                    return newMap;
                });
            }
        }
    };

    const combinedImages = [
        ...imageUrls.map((img, index) => ({ type: "url" as const, value: img, originalIndex: index })),
        ...imageFiles.map((file, index) => ({ type: "file" as const, value: file, originalIndex: index })),
    ];

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const draggedItem = combinedImages[draggedIndex];
        const dropItem = combinedImages[dropIndex];

        // If both items are of the same type, reorder within that type
        if (draggedItem.type === dropItem.type) {
            if (draggedItem.type === 'url') {
                reorderImageUrls(draggedItem.originalIndex, dropItem.originalIndex);
            } else {
                reorderImageFiles(draggedItem.originalIndex, dropItem.originalIndex);
            }
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-200 text-center mb-4">
                Imágenes
            </h2>
            <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full flex flex-col border border-gray-300 rounded-lg mx-2 sm:mx-4 bg-gray-700">
                <div className="overflow-y-auto h-full text-center">
                    {combinedImages.map((img, i) => (
                        <div
                            key={img.type === "url" ? img.value.id : `file-${i}`}
                            className={`flex gap-2 sm:gap-4 items-center justify-between py-2 px-4 sm:px-8 rounded-lg hover:text-white hover:bg-primary-700 transition-colors relative h-[200px] sm:h-[280px] lg:h-[320px] cursor-move ${dragOverIndex === i ? 'bg-primary-600' : ''
                                } ${draggedIndex === i ? 'opacity-50' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, i)}
                            onDragOver={(e) => handleDragOver(e, i)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, i)}
                        >
                            <div className="relative w-[85%] sm:w-[91%] h-full rounded-md shadow">
                                <Image
                                    src={img.type === "url" ? img.value.url : URL.createObjectURL(img.value)}
                                    alt={img.type === "url" ? `image-${img.value.id}` : img.value.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="rounded-md"
                                    draggable={false}
                                />
                            </div>
                            <TrashIcon
                                size={18}
                                darkColor="white"
                                lightColor="var(--color-primary-200)"
                                className="cursor-pointer flex-shrink-0"
                                onClick={() =>
                                    img.type === "url"
                                        ? removeImageUrl(img.value.id)
                                        : removeImageFile(img.originalIndex)
                                }
                            />
                        </div>
                    ))}

                    {/* Mostrar archivos en proceso de subida */}
                    {Array.from(uploadingFiles).map((fileId) => (
                        <div key={fileId} className="flex gap-2 sm:gap-4 items-center justify-between py-2 px-4 sm:px-8 rounded-lg bg-primary-600 relative h-[200px] sm:h-[280px] lg:h-[320px]">
                            <div className="relative w-[85%] sm:w-[91%] h-full rounded-md shadow bg-gray-600 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="mb-2">Subiendo...</div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress.get(fileId) || 0}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-sm mt-1">{uploadProgress.get(fileId) || 0}%</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <label className="cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-center block text-sm sm:text-base mt-4">
                {projectId ? "Subir y optimizar imagen..." : "Seleccionar imagen..."}
                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />
            </label>
        </>
    );
}