import { getProjectBySlug } from "@/actions/project/getProjectBySlug";
import SliderImages from "@/components/SliderImages";
import { notFound, redirect } from "next/navigation";
import { formatDateOnly } from '@/utils/formatDate';
import TechnologiesLabels from "@/components/TechnologiesLabels";
import { getSession } from "@/lib/getSession";
import LinksButtons from "@/components/LinksButtons";
import Link from "next/link";
import { EditIcon } from "@/components/icons";

interface Props {
    params: { slug: string };
}

export default async function SpecificProjectPage({ params }: Props) {
    const { slug } = params;
    const session = await getSession();
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();
    if (project.deleted && !session) {
        redirect("/");
    }

    return (
        <main className="flex p-4 justify-center min-w-screen max-w-screen">
            <div className="flex flex-col justify-between w-3/5 items-center">
                <div className="flex flex-col px-[11%] w-full">
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center w-full mt-5 mb-4">
                            <h1 className="text-4xl font-bold text-labels-title dark:text-labels-title-drk mx-auto">
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

                        <p className="text-xl text-justify mb-5">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex justify-between text-gray-500 dark:text-primary-400 mb-6">
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
                <div className="flex w-7/9 justify-center items-center aspect-[16/9] text-center overflow-hidden border-2 border-gray-700 rounded-md mb-8">
                    {project.images.length > 0 ? (
                        <SliderImages images={project.images} />
                    ) : (
                        <div className="flex items-center justify-center h-full w-full">
                            {/* TODO: Poner algo más bonito uwu*/}
                            Este proyecto aún no tiene imágenes unu
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col w-1/5 items-center justify-between">
                <div className="flex flex-col items-center">
                    <h1 className="my-6 text-2xl font-bold text-labels-title dark:text-labels-title-drk">
                        Tecnologías utilizadas
                    </h1>
                    <TechnologiesLabels
                        technologies={project.technologies}
                        className={"flex flex-col gap-3 mb-10 items-center overflow-y-scroll bg-gray-800 rounded-xl p-4 max-h-[550px]"}
                    />
                </div>
                <LinksButtons
                    links={project.links}
                    className="flex flex-col gap-3 mb-8 items-end"
                />
            </div>
        </main>
    );
}
