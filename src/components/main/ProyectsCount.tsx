'use client';

import { getProjectsCount } from "@/actions/project/getProjectsCount";
import { useEffect, useState } from "react";
import { Text } from "@/components/typography/Text";

export default function ProyectsCount() {
    const [totalProjects, setTotalProjects] = useState(0);

    useEffect(() => {
        const fetchTotalProjects = async () => {
            const res = await getProjectsCount();
            setTotalProjects(res);
        }
        fetchTotalProjects();
    }, [])

    return (
        <div className="flex flex-col lg:flex-row lg:gap-10 items-center font-extrabold lg:mt-5 mb-10 lg:mb-0">
            <h1 className="text-9xl">
                {totalProjects}
            </h1>
            <Text segments={[
                { text: "Proyectos personales y", color: "text-primary-700 dark:text-primary-200", breakAfter: true },
                { text: "colaborativos registrados", color: "text-primary-700 dark:text-primary-200" },
            ]} fontSize="text-xl sm:text-2xl lg:text-3xl xl:text-4xl" className="font-extrabold" />
        </div>
    );
}