'use client';

import Image from "next/image";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    text: string;
}

export default function GreatAlert({ onClose, isOpen, title, text }: Props) {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-primary-200"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-primary-950 rounded-lg shadow-lg w-[90%] max-w-3xl h-64 flex overflow-hidden"
            >
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {title}
                    </h2>
                    <p className="text-primary-200 text-center">
                        {text}
                    </p>
                </div>

                <div className="relative w-1/3 h-64 bg-primary-900 flex items-center justify-center">
                    <Image
                        src="/imgs/famicat.png"
                        alt="Imagen"
                        className="object-contain"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}
