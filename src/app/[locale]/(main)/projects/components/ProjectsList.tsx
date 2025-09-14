'use client';

import { ShowProject } from "@/types/project";
import ProjectsHeader from "./ProjectsHeader";
import ProjectCard from "./ProjectCard";
import ProjectSquareCard from "./ProjectSquareCards";
import { useEffect, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { OnlyTechnology } from "@/types";
import { useTechnologies } from "@/app/[locale]/(admin)/new-project/hooks";
import { useBreakpoint } from "@/hooks/useBreakpoints";

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
    const breakpoint = useBreakpoint();

    const isSquare = (() => {
        if (breakpoint === "2xl") {
            return !view;
        } else {
            return true;
        }
    })();

    useEffect(() => {
        setView(breakpoint === "2xl");
    }, [breakpoint]);

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
                        {isSquare ? (
                            <ProjectSquareCard
                                project={pro}
                                session={session}
                                deleted={deleted}
                            />
                        ) : (
                            <ProjectCard
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
