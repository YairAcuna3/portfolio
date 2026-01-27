'use client';

import Button from "@/components/buttons/Button";
import ModalTechnologies from "@/components/ModalTechnologies";
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { OnlyTechnology, ShowProject } from "@/types";
import { useState } from "react";

interface Props {
    projects: ShowProject[];
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void
    technologies: OnlyTechnology[];
    selectedTechs: OnlyTechnology[];
    onAddTechnology: (tech: OnlyTechnology) => void;
    onRemoveTechnology: (techName: string) => void;
}

export default function ProjectsHeader({ searchTerm, setSearchTerm, technologies, selectedTechs, onAddTechnology, onRemoveTechnology }: Props) {
    const [isModal, setIsModal] = useState(false);

    return (
        <div className="flex flex-col justify-center pt-3 px-6 xl:px-32">
            <div className="flex relative items-center md:mt-6 xl:mt-8">
                <h1
                    className="absolute left-1/2 transform -translate-x-1/2 text-6xl font-extrabold"
                >
                    Proyectos
                </h1>
            </div>

            <div className="flex flex-col relative mt-5">
                <div className={`order-2 xl:order-1 flex w-full items-center mb-2 pt-4 xl:pt-0 ${selectedTechs.length > 0 ? "pt-4 xl:pt-12" : ""}`}>
                    <Button variant="oval" type="action" onClick={() => setIsModal(true)} text="Añadir filtro" />
                    {selectedTechs.length == 0 && (
                        <p
                            className="ml-2 dark:text-gray-400"
                        >
                            ← Filter by technology!
                        </p>
                    )}
                    <TechnologiesLabels
                        className="flex ml-6 flex-1 overflow-x-auto gap-4 py-4 xl:py-0"
                        technologies={selectedTechs}
                        onRemoveTechnology={onRemoveTechnology}
                    />
                </div>

                <div className="order-1 xl:order-2 flex xl:absolute xl:right-0 xl:top-4 xl:transform xl:-translate-y-1/2 pt-8 xl:pt-0">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-2 dark:border-white w-full xl:w-[450px] px-2 py-1 rounded"
                    />
                </div>
            </div>

            <div className="flex items-center p-4">
                <div className="w-4 h-4 bg-primary-950 dark:bg-white rounded-full"></div>
                <div className="flex-1 border-b-2"></div>
            </div>

            <ModalTechnologies
                technologies={technologies}
                isOpen={isModal}
                onClose={() => setIsModal(!isModal)}
                onAddTechnology={onAddTechnology}
                techsAlreadyAdded={selectedTechs}
            />
        </div >
    );
}