'use client';

import { useState, useRef } from "react";
import { OnlyImage } from "@/types/image";
import Image from "next/image";

interface Props {
    images: OnlyImage[];
}

export default function SliderImages({ images }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        const diff = e.clientX - startXRef.current;

        if (diff > 50) {
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (diff < -50) {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }

        isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
        isDraggingRef.current = false;
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden rounded-md cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {images.map((img, index) => (
                <Image
                    key={img.id}
                    src={img.url}
                    alt="Proyecto"
                    draggable={false}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out
            ${index === currentIndex ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full'}`}
                />
            ))}
        </div>
    );
}
