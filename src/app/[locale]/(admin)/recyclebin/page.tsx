import { getProjectsToShow } from "@/actions/project/getProjectsToShow";
import ProjectsList from "../../(main)/projects/components/ProjectsList";
import { getSession } from "@/lib/getSession";

export default async function Projects() {
    const projects = await getProjectsToShow(true);
    const session = await getSession();

    return (
        <div className="p-4 min-w-screen max-w-screen">
            <ProjectsList projects={projects} session={session} deleted={true} />
        </div>
    );
}
