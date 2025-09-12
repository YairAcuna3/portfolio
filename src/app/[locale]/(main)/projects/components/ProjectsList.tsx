'use client';

import { ShowProject } from "@/types/project";
import ProjectsHeader from "./ProjectsHeader";
import ProjectCard from "./ProjectCard";
import ProjectSquareCard from "./ProjectSquareCards";
import { useState } from "react";

interface Props {
    projects: ShowProject[];
    session: boolean;
    deleted: boolean;
}

export default function ProjectsList({ projects, session, deleted }: Props) {
    const [view, setView] = useState(true);

    return (
        <>
            <ProjectsHeader
                view={view}
                setView={setView}
            />
            <div className={!view ? "p-4 px-32 justify-center w-full flex flex-wrap gap-10" : ""}>
                {projects.map((pro) => (
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
