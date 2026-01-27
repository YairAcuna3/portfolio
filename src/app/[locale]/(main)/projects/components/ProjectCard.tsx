'use client';

import { ShowProject } from "@/types/project";
import { toggleProject } from "@/actions/project/toggleProject";
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { EditIcon, RefreshIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoints";
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
    const breakpoint = useBreakpoint();
    const techLimit = breakpoint === "2xl" ? 3 : 2;

    return (
        <div className="flex flex-col items-center w-[350px] xl:w-[480px] py-5 px-4 bg-labels-bg dark:bg-labels-bg-drk rounded-md shadow-md">
            {/* Image */}
            <div className="relative">
                {project.images.length > 0 ? (
                    <div className="flex justify-center mb-2 w-full">
                        <div className="w-[304px] xl:w-[432px] h-[171px] xl:h-[300px] rounded-md flex-shrink-0 border-1 border-img-border dark:border-img-border-drk relative">
                            <Image
                                src={project.images[0].url}
                                alt="Miniatura de proyecto"
                                className="object-cover rounded-sm"
                                fill
                                draggable={false}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="flex my-8 text-yellow-200">
                        Sin imágenes registradas
                    </p>
                )}
                {/* Imagen como link */}
                <Link
                    href={`/projects/${project.slug}`}
                    className="absolute inset-0"
                />
            </div>

            {/* tittle and desc */}
            <div className="w-full px-4">
                <div className="font-bold text-lg text-labels-title dark:text-labels-title-drk line-clamp-1">
                    {project.name}
                </div>
                <div className="flex justify-between">
                    <div>
                        {project.madeFor}
                    </div>
                    <div>
                        {project.startAt && formatDate(project.startAt)}
                    </div>
                </div>
                <div className="flex justify-end">
                    {project.type}
                </div>
                <div className="mt-4 text-sm text-labels-text dark:text-labels-text-drk line-clamp-4">
                    {project.description ? (
                        project.description
                    ) : (
                        <p className="text-yellow-200">
                            Proyecto sin descripción
                        </p>
                    )}
                </div>
            </div>

            {/* tech and details */}
            <div className="w-full flex flex-col justify-between items-end pt-5 px-4">
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
                    maxVisible={techLimit}
                    className={"flex gap-2 text-xs mt-4"}
                />
            </div>
        </div>
    );
}