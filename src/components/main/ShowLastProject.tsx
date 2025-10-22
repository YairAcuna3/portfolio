'use client';

import { ShowProject } from "@/types/project";
import { truncateText } from "@/utils/truncateText";
import SliderImages from "../SliderImages";
import TechnologiesLabels from "../TechnologiesLabels";
import Button from "../buttons/Button";
import Link from "next/link";

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
        <div className="flex flex-col w-full h-full p-4 sm:p-8 md:p-6 lg:p-8 bg-labels-bg dark:bg-labels-bg-drk rounded-md border-1 dark:border-primary-300">
            <div className="flex flex-col md:flex-row justify-between w-full h-full">
                <div className="flex relative w-full md:w-1/2 items-center aspect-[4/3] text-center overflow-hidden border-2 border-img-border dark:border-img-border-drk rounded-md">
                    {project.images.length > 0 ? (
                        <SliderImages images={project.images} />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full">
                            {/* TODO: Poner algo más bonito uwu*/}
                            Este proyecto aún no tiene imágenes unu
                        </div>
                    )}
                    {/* Imagen como link solo en el celular */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="absolute inset-0 block sm:hidden"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-center md:mb-4 sm:mt-4 md:mt-0 text-labels-title dark:text-labels-title-drk">
                        {truncateText(project.name, 24)}
                    </h2>
                    <p className="text-md sm:text-lg md:text-xl text-justify md:pl-8 text-labels-text dark:text-labels-text-drk">
                        {project.description ? project.description : "No description provided"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mt-4 md:mt-6 justify-between">
                <TechnologiesLabels
                    technologies={project.technologies}
                    className={"flex w-full md:w-3/4 xl:w-3/5 2xl:4/5 overflow-x-auto gap-2 md:gap-4 justify-start pb-5 text-sm md:text-md"}
                />
                <div className="flex w-full md:w-1/4 pt-2 md:pt-0 justify-end">
                    <Button text="Ver detalles" link={`/projects/${project.slug}`} size="reponsive" />
                </div>
            </div>
        </div >
    );
}