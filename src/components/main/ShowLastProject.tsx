'use client';

import { ShowProject } from "@/types/project";
import { truncateText } from "@/utils/truncateText";
import SliderImages from "../SliderImages";
import TechnologiesLabels from "../TechnologiesLabels";
import CustomButton from "../buttons/CustomButton";

interface Props {
    project?: ShowProject | null;
}

export default function ShowLastProject({ project }: Props) {

    //TODO: Hacer el no hay proyectos
    if (!project) return (
        <div className="text-center h-full">
            No hay ningún proyecto por mostrar
        </div>
    )

    return (
        <div className="flex flex-col bg-labels-bg dark:bg-labels-bg-drk h-full w-full p-8 rounded-md border-1 dark:border-primary-300">
            <div className="flex justify-between w-full h-full">
                <div className="flex w-1/2 items-center aspect-[4/3] text-center overflow-hidden border-2 border-img-border dark:border-img-border-drk rounded-md">
                    {project.images.length > 0 ? (
                        <SliderImages images={project.images} />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full">
                            {/* TODO: Poner algo más bonito uwu*/}
                            Este proyecto aún no tiene imágenes unu
                        </div>
                    )}
                </div>
                <div className="w-1/2">
                    <h2 className="text-3xl text-center mb-4 text-labels-title dark:text-labels-title-drk">
                        {truncateText(project.name, 24)}
                    </h2>
                    <p className="text-xl text-justify pl-8 text-labels-text dark:text-labels-text-drk">
                        {project.description ? project.description : "No description provided"}
                    </p>
                </div>
            </div>

            <div className="flex mt-6">
                <TechnologiesLabels
                    technologies={project.technologies}
                    className={"flex w-3/4 overflow-x-auto gap-4 justify-start pb-5"}
                />
                <div className="flex w-1/4 justify-end">
                    <CustomButton
                        text="Ver detalles"
                        link={`/projects/${project.slug}`}
                        textColor="text-primary-950 dark:text-white"
                        color="bg-primary-100 dark:bg-primary-600"
                        hover="hover:bg-primary-200 dark:hover:bg-primary-700"
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div >
    );
}