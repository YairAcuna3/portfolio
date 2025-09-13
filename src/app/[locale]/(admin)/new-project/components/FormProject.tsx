'use client';

import { useMemo } from "react";
import { CreateProjectHandlerProps } from "@/types/project";
import { useRouter } from "next/navigation";
import { createProjectHandler, updateProjectHandler } from "../handlers";

type FormProjectProps = CreateProjectHandlerProps & {
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setType: (type: string) => void;
    setMadeFor: (madeFor: string) => void;
    setStartAt: (startAt: Date | null) => void;
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
    setType,
    setMadeFor,
    setStartAt,

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
                        <label htmlFor="description" className="block text-sm font-medium text-primary-200 mb-2">
                            Descripción
                        </label>
                        <textarea
                            value={details.description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                            className="resize-none bg-gray-700 w-full h-[200px] px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            placeholder="Florea adecuadamente..."
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-primary-200 mb-2">
                            Tipo
                        </label>
                        <input
                            type="text"
                            value={details.type || ""}
                            onChange={(e) => setType(e.target.value)}
                            className="bg-gray-700 w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            placeholder="Web atómica"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="madeFor" className="block text-sm font-medium text-primary-200 mb-2">
                            Hecho para
                        </label>
                        <input
                            type="text"
                            value={details.madeFor || ""}
                            onChange={(e) => setMadeFor(e.target.value)}
                            className="bg-gray-700 w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            placeholder="Juventudes hitlerianas"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="startAt"
                            className="block text-sm font-medium text-primary-200 mb-2"
                        >
                            Fecha de inicio
                        </label>
                        <input
                            type="date"
                            value={details.startAt ? details.startAt.toISOString().split("T")[0] : ""}
                            onChange={(e) => { setStartAt(e.target.value ? new Date(e.target.value) : null) }}
                            className="bg-gray-700 w-full px-4 py-2 border border-primary-300 rounded-lg"
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