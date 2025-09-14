import { getProjectsToShow } from "@/actions/project/getProjectsToShow";
import ProjectsList from "../../(main)/projects/components/ProjectsList";
import { getSession } from "@/lib/getSession";
import { getTechnologies } from "@/actions/technology/getTechnologies";

export default async function Projects() {
    const projects = await getProjectsToShow(true);
    const technologies = await getTechnologies();
    const session = await getSession();

    return (
        <div className="p-4 pt-22 min-w-screen max-w-screen">
            <ProjectsList
                projects={projects}
                session={session}
                deleted={true}
                technologies={technologies}
            />
        </div>
    );
}
