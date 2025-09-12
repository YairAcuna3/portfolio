'use client';

import LensIcon from "@/components/icons/IconLens";
import { OnlyTechnology } from "@/types/technology";
import { useEffect, useState } from "react";

interface TechModalProps {
    technologies: OnlyTechnology[];
    isOpen: boolean;
    onClose: () => void;
    onAddTechnology: (tech: OnlyTechnology) => void;
    techsAlreadyAdded: OnlyTechnology[];
}

export default function ModalTechnologies({ technologies, isOpen, onClose, onAddTechnology, techsAlreadyAdded }: TechModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<OnlyTechnology[]>([]);
    const [selectedTech, setSelectedTech] = useState<OnlyTechnology | null>(null);

    useEffect(() => {
        let filtered = technologies;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((tech) =>
                tech.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered = filtered.filter(
            (tech) => !techsAlreadyAdded.some((added) => added.name === tech.name)
        );

        setSuggestions(filtered);
    }, [searchTerm, technologies, techsAlreadyAdded]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectSuggestion = (technology: OnlyTechnology) => {
        setSelectedTech(technology);
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 text-primary-200 bg-black/50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-primary-950 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[80vh] flex flex-col"
            >
                <div className="px-6 py-4 border-b border-primary-200">
                    <h2 className="text-2xl font-semibold text-center">Tecnologías existentes</h2>
                </div>

                <div className="px-6 py-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="w-full border border-primary-300 bg-primary-900 rounded-md pr-10 pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <LensIcon size={25} lightColor="var(--color-primary-200)" darkColor="white" />
                        </div>
                    </div>
                </div>

                <div className="h-[50vh] flex flex-col border border-gray-300 rounded-lg mx-4 bg-primary-900">
                    <div className="overflow-y-auto h-auto text-center">
                        {suggestions.map((tech) => (
                            <div
                                key={tech.name}
                                onClick={() => handleSelectSuggestion(tech)}
                                className="flex gap-4 items-center justify-center py-2 cursor-pointer rounded-lg hover:text-white hover:bg-primary-700 transition-colors"
                            >
                                {/* Se le puede poner color distinto e ícono */}
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-4 flex justify-end">
                    <button
                        onClick={() => {
                            if (selectedTech) {
                                onAddTechnology(selectedTech);
                            }
                        }}
                        disabled={!selectedTech}
                        className={`px-4 py-2 text-white rounded-md transition-colors ${selectedTech
                            ? 'bg-primary-600 hover:bg-primary-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {!selectedTech ? "Seleccione una" : `Añadir ${selectedTech.name}`}
                    </button>
                </div>
            </div>
        </div >
    );
}