'use client';

import { TrashIcon } from "@/components/icons";
import { OnlyTechnology } from "@/types/technology";
import { Dispatch } from "react";

interface Props {
    projectTech: OnlyTechnology[];
    onRemoveTechnology: (techName: string) => void;
    setIsModalTech: Dispatch<React.SetStateAction<boolean>>;
}

export default function TechnologiesPanel({ projectTech, onRemoveTechnology, setIsModalTech }: Props) {
    return (
        <>
            <h2 className="text-2xl font-bold text-primary-200 text-center">
                Tecnologías utilizadas
            </h2>
            <div className="h-[60vh] w-full flex flex-col border border-gray-300 rounded-lg mx-4 bg-gray-700">
                <div className="overflow-y-auto h-full text-center">
                    {projectTech.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex gap-4 items-center justify-between py-2 px-8 rounded-lg hover:text-white hover:bg-primary-700 transition-colors"
                        >
                            <div>
                                {tech.name}
                            </div>
                            <TrashIcon
                                size={20}
                                darkColor="white"
                                lightColor="var(--color-primary-200)"
                                className='cursor-pointer'
                                onClick={() => onRemoveTechnology(tech.name)}

                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => setIsModalTech(true)}
                className="cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                Agregar otra...
            </button>
        </>
    );
}