'use client';

import { ShowProject } from "@/types/project";
import ProjectsHeader from "./ProjectsHeader";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";
import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { usePagination } from "../hooks/usePagination";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { OnlyTechnology } from "@/types";
import { useTechnologies } from "@/app/[locale]/(admin)/new-project/hooks";

interface Props {
    projects: ShowProject[];
    session: boolean;
    deleted: boolean;
    technologies: OnlyTechnology[];
}

export default function ProjectsList({ projects, session, deleted, technologies }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const { projectTechs, addTechnology, removeTechnology } = useTechnologies();
    const { showProjects } = useProjects(searchTerm, projects, projectTechs);

    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === "sm" || breakpoint === "md";

    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedProjects,
        goToPage,
        totalItems
    } = usePagination(showProjects, 9, isMobile);

    return (
        <>
            <ProjectsHeader
                projects={showProjects}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                technologies={technologies}
                selectedTechs={projectTechs}
                onAddTechnology={addTechnology}
                onRemoveTechnology={removeTechnology}
            />

            {totalItems > 0 ? (
                <>
                    <div className="p-4 px-32 justify-center w-full flex flex-wrap gap-10">
                        {paginatedProjects.map((pro) => (
                            <div key={pro.id} className="w-fit">
                                <ProjectCard
                                    project={pro}
                                    session={session}
                                    deleted={deleted}
                                />
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                </>
            ) : (
                <div className="p-4 px-32 justify-center w-full flex">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        No se encontraron proyectos que coincidan con los filtros aplicados.
                    </p>
                </div>
            )}
        </>
    );
}
