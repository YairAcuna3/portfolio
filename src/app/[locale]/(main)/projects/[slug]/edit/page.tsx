import { getProjectBySlug } from "@/actions/project/getProjectBySlug";
import { ProjectComponent } from "@/app/[locale]/(admin)/new-project/components";
import { getSession } from "@/lib/getSession";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: { slug: string };
}

export default async function EditProject({ params }: Props) {
    const { slug } = params;
    const session = await getSession();
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();
    if (!session) redirect("/")

    return (
        <div className="w-full">
            <ProjectComponent project={project} />
        </div>
    );
}