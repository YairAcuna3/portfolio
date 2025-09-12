import { getProjectsToShow } from "@/actions/project/getProjectsToShow";
import ProjectsList from "./components/ProjectsList";
import { getSession } from "@/lib/getSession";

export default async function Projects() {
    const projects = await getProjectsToShow(false);
    const session = await getSession();

    return (
        <div className="p-4 min-w-screen max-w-screen">
            <ProjectsList projects={projects} session={session} deleted={false} />
        </div>
    );
}
