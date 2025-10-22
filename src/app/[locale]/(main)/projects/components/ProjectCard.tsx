'use client';

import { ShowProject } from "@/types/project";
import { toggleProject } from "@/actions/project/toggleProject";
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { EditIcon, RefreshIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/buttons/Button";

interface Props {
    project: ShowProject;
    session: boolean;
    deleted: boolean;
}

export default function ProjectCard({ project, session, deleted }: Props) {
    const handleToggleProject = async (slug: string, isDeleted: boolean) => {
        await toggleProject(slug, isDeleted);
    }

    return (
        <div className="flex max-w-full mx-32 p-5 mb-4 bg-labels-bg dark:bg-labels-bg-drk rounded-md shadow-md">
            {/* tittle and desc */}
            <div className="w-1/4 px-4">
                <div className="font-bold text-lg text-labels-title dark:text-labels-title-drk line-clamp-1">
                    {project.name}
                </div>
                <div className="text-sm text-labels-text dark:text-labels-text-drk line-clamp-3">
                    {project.description ? (
                        project.description
                    ) : (
                        <p className="text-yellow-200">
                            Proyecto sin descripción
                        </p>
                    )}
                </div>
            </div>

            {/* Images */}
            <div className="flex w-2/4 gap-4 pl-6 items-center">
                {project.images.length > 0 ? (
                    project.images.slice(0, 4).map((pro) => (
                        <div
                            key={pro.id}
                            className="w-[160px] h-[90px] rounded-md flex-shrink-0 border-1 border-img-border dark:border-img-border-drk relative"
                        >
                            <Image
                                src={pro.url}
                                alt="Miniatura de proyecto"
                                className="object-cover rounded-md"
                                fill
                                draggable={false}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-yellow-200 h-[90px]">
                        Proyecto sin imágenes
                    </p>
                )}
            </div>

            {/* tech and details */}
            <div className="w-1/4 flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center">
                    {session && (
                        <>
                            <Button link={`projects/${project.slug}/edit`} icon={<EditIcon size={20} />} size="square" />
                            <Button size="square" type="action"
                                icon={!deleted ? <TrashIcon size={20} /> : <RefreshIcon size={20} />}
                                onClick={() => handleToggleProject(project.slug, !deleted)}
                            />
                        </>
                    )}
                    <Button size="sm" text="Ver detalles" link={`/projects/${project.slug}`} />
                </div>

                <TechnologiesLabels
                    technologies={project.technologies}
                    maxVisible={3}
                    className={"flex gap-2 text-xs"}
                />
            </div>
        </div>
    );
}
