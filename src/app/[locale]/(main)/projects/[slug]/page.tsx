import { getProjectBySlug } from "@/actions/project/getProjectBySlug";
import { notFound, redirect } from "next/navigation";
import { formatDateOnly } from '@/utils/formatDate';
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { getSession } from "@/lib/getSession";
import LinksButtons from "@/components/LinksButtons";
import Link from "next/link";
import { EditIcon } from "@/components/icons";
import ImageGallery from "@/components/project/ImageGallery";
import ScrollingTechnologies from "@/components/project/ScrollingTechnologies";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function SpecificProjectPage({ params }: Props) {
    const { slug } = await params;
    const session = await getSession();
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();
    if (project.deleted && !session) {
        redirect("/");
    }

    return (
        <>
            {/* Mobile Layout */}
            <div className="flex flex-col lg:hidden w-full">
                {/* Image Gallery - Full width at top */}
                <div className="w-full aspect-video overflow-hidden mb-6">
                    <ImageGallery images={project.images} />
                </div>

                {/* Content with padding */}
                <div className="px-6 sm:px-12 md:px-20">
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col items-center w-full">
                                <div className="flex items-center w-full mt-5 mb-4">
                                    <h1 className="text-center text-3xl font-bold text-labels-title dark:text-labels-title-drk mx-auto">
                                        {project.name}
                                    </h1>
                                    {session && (
                                        <Link
                                            href={`/projects/${project.slug}/edit`}
                                            className="mt-2 px-3 py-2 transition-colors bg-primary-100 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-lg"
                                        >
                                            <EditIcon size={20} />
                                        </Link>
                                    )}
                                </div>

                                <p className="text-lg text-justify mb-5">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between text-gray-500 dark:text-primary-400 mb-6">
                                <div>
                                    <span className="text-lg">
                                        {project.madeFor}
                                    </span>
                                    <span className="text-lg text-primary-600 dark:text-gray-300 italic">
                                        {project.type ? ` . ${project.type}` : ""}
                                    </span>
                                </div>
                                <span className="text-lg">
                                    {project.startAt ? formatDateOnly(project.startAt) : ""}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex flex-col items-center w-full">
                            <TechnologiesLabels
                                technologies={project.technologies}
                                className={"flex flex-col gap-3 mb-10 items-center overflow-y-scroll bg-gray-800 rounded-xl p-4 sm:max-h-[550px]"}
                            />
                        </div>
                        <LinksButtons
                            links={project.links}
                            className="flex flex-col gap-3 mb-auto mt-8 items-end"
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex w-full min-h-screen">
                <div className="w-full grid grid-cols-12 gap-8 px-24 pt-16 pb-0">
                    {/* Left Section - Image Gallery */}
                    <div className="col-span-9 flex flex-col">
                        <div className="mb-6">
                            <ImageGallery images={project.images} />
                        </div>

                        <ScrollingTechnologies technologies={project.technologies} />
                    </div>

                    {/* Right Section - Project Info */}
                    <div className="col-span-3 flex flex-col">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold text-labels-title dark:text-labels-title-drk">
                                    {project.name}
                                </h1>
                                {session && (
                                    <Link
                                        href={`/projects/${project.slug}/edit`}
                                        className="px-3 py-2 transition-colors bg-primary-100 dark:bg-primary-600 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-lg"
                                    >
                                        <EditIcon size={20} />
                                    </Link>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-primary-600 dark:text-primary-400 mb-1">
                                        Descripción
                                    </h3>
                                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {project.madeFor && (
                                    <div>
                                        <h3 className="font-medium text-primary-600 dark:text-primary-400 mb-1">
                                            Realizado para
                                        </h3>
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {project.madeFor}
                                        </p>
                                    </div>
                                )}

                                {project.type && (
                                    <div>
                                        <h3 className="font-medium text-primary-600 dark:text-primary-400 mb-1">
                                            Tipo de proyecto
                                        </h3>
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {project.type}
                                        </p>
                                    </div>
                                )}

                                {project.startAt && (
                                    <div>
                                        <h3 className="font-medium text-primary-600 dark:text-primary-400 mb-1">
                                            Fecha de inicio
                                        </h3>
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {formatDateOnly(project.startAt)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Links */}
                        {project.links && project.links.length > 0 && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                <LinksButtons
                                    links={project.links}
                                    className="flex flex-col gap-3"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
