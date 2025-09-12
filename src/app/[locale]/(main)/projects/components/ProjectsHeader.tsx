'use client';

import { GridIcon, MenuIcon } from "@/components/icons";
import ModalTechnologies from "@/components/ModalTechnologies";
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { OnlyTechnology, ShowProject } from "@/types";
import { useState } from "react";

interface Props {
    view: boolean;
    setView: (state: boolean) => void;
    projects: ShowProject[];
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void
    technologies: OnlyTechnology[];
    selectedTechs: OnlyTechnology[];
    onAddTechnology: (tech: OnlyTechnology) => void;
    onRemoveTechnology: (techName: string) => void;
}

export default function ProjectsHeader({ view, setView, searchTerm, setSearchTerm, technologies, selectedTechs, onAddTechnology, onRemoveTechnology }: Props) {
    const [isModal, setIsModal] = useState(false);

    return (
        <div className="flex flex-col justify-center pt-3 px-32">
            <div className="flex relative items-center">
                <h1
                    className="absolute left-1/2 transform -translate-x-1/2 text-6xl font-extrabold"
                >
                    Proyectos
                </h1>
                <div className="flex items-center ml-auto">
                    <p
                        className="mr-2 dark:text-gray-400"
                    >
                        Change the view! →
                    </p>
                    <button
                        onClick={() => setView(!view)}
                        className="flex w-[50px] h-[50px] items-center justify-center bg-btn-drk hover:bg-btn-drk-hover rounded-sm"
                    >
                        {view ? (
                            <GridIcon size={35} darkColor="white" />
                        ) : (
                            <MenuIcon size={35} darkColor="white" />
                        )}
                    </button>
                </div>
            </div>

            <div className="relative flex mt-5">
                <div className={`flex w-full items-center mb-2 ${selectedTechs.length > 0 ? "pt-12" : ""}`}>
                    <button
                        onClick={() => setIsModal(true)}
                        className="inline-flex items-center px-4 py-1 rounded-3xl bg-btn-drk hover:bg-btn-drk-hover"
                    >
                        Añadir filtro
                    </button>
                    {selectedTechs.length == 0 && (
                        <p
                            className="ml-2 dark:text-gray-400"
                        >
                            ← Filter by technology!
                        </p>
                    )}
                    <TechnologiesLabels
                        className="flex ml-6 flex-1 overflow-x-auto gap-4"
                        technologies={selectedTechs}
                        onRemoveTechnology={onRemoveTechnology}
                    />
                </div>

                <div className="absolute right-0 top-4 transform -translate-y-1/2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-2 border-white w-[450px] px-2 py-1 rounded"
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