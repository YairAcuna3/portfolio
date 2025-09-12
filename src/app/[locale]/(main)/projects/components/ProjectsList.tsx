'use client';

import { ShowProject } from "@/types/project";
import ProjectsHeader from "./ProjectsHeader";
import ProjectCard from "./ProjectCard";
import ProjectSquareCard from "./ProjectSquareCards";
import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { OnlyTechnology } from "@/types";
import { useTechnologies } from "@/app/[locale]/(admin)/new-project/hooks";

interface Props {
    projects: ShowProject[];
    session: boolean;
    deleted: boolean;
    technologies: OnlyTechnology[];
}

export default function ProjectsList({ projects, session, deleted, technologies }: Props) {
    const [view, setView] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { projectTechs, addTechnology, removeTechnology } = useTechnologies();
    const { showProjects } = useProjects(searchTerm, projects, projectTechs);

    return (
        <>
            <ProjectsHeader
                view={view}
                setView={setView}
                projects={showProjects}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                technologies={technologies}
                selectedTechs={projectTechs}
                onAddTechnology={addTechnology}
                onRemoveTechnology={removeTechnology}
            />
            <div className={!view ? "p-4 px-32 justify-center w-full flex flex-wrap gap-10" : ""}>
                {showProjects.map((pro) => (
                    <div key={pro.id} className={view ? "" : "w-fit"}>
                        {view ? (
                            <ProjectCard
                                project={pro}
                                session={session}
                                deleted={deleted}
                            />
                        ) : (
                            <ProjectSquareCard
                                project={pro}
                                session={session}
                                deleted={deleted}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
