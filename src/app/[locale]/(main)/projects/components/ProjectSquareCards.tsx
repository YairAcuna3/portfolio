'use client';

import { ShowProject } from "@/types/project";
import { toggleProject } from "@/actions/project/toggleProject";
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { EditIcon, RefreshIcon, TrashIcon } from "@/components/icons";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

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
        <div className="flex flex-col items-center w-[480px] py-5 px-4 bg-labels-bg dark:bg-labels-bg-drk rounded-md shadow-md">
            {/* Image */}
            {project.images.length > 0 ? (
                <div className="flex justify-center mb-2 w-full">
                    <div className="w-[432px] h-[300px] rounded-md flex-shrink-0 border-1 border-img-border dark:border-img-border-drk">
                        <Image
                            src={project.images[0].url}
                            alt="Miniatura de proyecto"
                            className="w-full h-full object-cover rounded-sm"
                            draggable={false}
                        />
                    </div>
                </div>
            ) : (
                <p className="flex my-8 text-yellow-200">
                    Sin imágenes registradas
                </p>
            )}

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
                            <Link
                                href={`projects/${project.slug}/edit`}
                                className={`items-center px-3 py-2 transition-colors bg-primary-100 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-lg`}
                            >
                                <EditIcon size={20} />
                            </Link>
                            <div
                                className={`items-center px-3 pt-2 pb-1 transition-colors bg-primary-100 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-lg`}
                            >
                                {!deleted ?
                                    <TrashIcon size={20} onClick={() => handleToggleProject(project.slug, !deleted)} />
                                    :
                                    <RefreshIcon size={20} onClick={() => handleToggleProject(project.slug, !deleted)} />
                                }
                            </div>
                        </>
                    )}
                    <a
                        href={`/projects/${project.slug}`}
                        className={`items-center px-3 py-2 transition-colors bg-primary-100 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-lg`}
                    >
                        <span className="text-sm text-center text-primary-950 dark:text-white">
                            Ver detalles
                        </span>
                    </a>
                </div>

                <TechnologiesLabels
                    technologies={project.technologies}
                    maxVisible={3}
                    className={"flex gap-2 text-xs mt-4"}
                />
            </div>
        </div>
    );
}
