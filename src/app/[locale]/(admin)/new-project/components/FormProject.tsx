'use client';

import { useMemo } from "react";
import { createProjectHandler } from "../handlers/createProjectHandler";
import { CreateProjectHandlerProps } from "@/types/project";
import { updateProjectHandler } from "../handlers/updateProjectHandler";
import { useRouter } from "next/navigation";

type FormProjectProps = CreateProjectHandlerProps & {
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    projectId: string;
};

export default function FormProject({
    projectTechs,
    imageFiles,
    links,
    setIsLoading,
    setIsGreatAlert,
    details,
    setName,
    setDescription,
    projectId,
}: FormProjectProps) {
    const router = useRouter();
    const isEditing = useMemo(() => Boolean(projectId), []);

    return (
        <>
            <h2 className="text-2xl font-bold text-primary-200 mb-6 text-center">
                {isEditing ? "Editar proyecto" : "Crear proyecto"}
            </h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    isEditing
                        ?
                        updateProjectHandler(e, {
                            projectTechs,
                            imageFiles,
                            links,
                            setIsLoading,
                            setIsGreatAlert,
                            details,
                            id: projectId,
                            router,
                        })
                        : createProjectHandler(e, {
                            projectTechs,
                            imageFiles,
                            links,
                            setIsLoading,
                            setIsGreatAlert,
                            details,
                        });
                }}
                className="mb-8">
                <div className="flex flex-col gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-primary-200 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={details.name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            placeholder="Proyecto demasiado bueno..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="icon" className="block text-sm font-medium text-primary-200 mb-2">
                            Descripción
                        </label>
                        <textarea
                            value={details.description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            className="resize-none bg-gray-700 w-full h-[464px] px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            placeholder="Florea adecuadamente..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 mt-1 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    {isEditing ? "Guardar cambios" : "Crear proyecto"}
                </button>
            </form>
        </>
    );
}