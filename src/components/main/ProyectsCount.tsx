'use client';

import { getProjectsCount } from "@/actions/project/getProjectsCount";
import { useEffect, useState } from "react";
import { Text } from "@/components/typography/Text";
import { ExternalLinkIcon } from "../icons";
import Button from "../buttons/Button";

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
        <div className="flex flex-col lg:flex-row lg:gap-10 items-center justify-center font-extrabold py-3 lg:mb-0 bg-labels-bg dark:bg-labels-bg-drk rounded-lg border-1 dark:border-primary-300">
            <h1 className="text-9xl lg:text-8xl 2xl:text-9xl">
                {totalProjects}
            </h1>
            <Text
                segments={[
                    { text: "Proyectos personales y", color: "text-primary-900 dark:text-primary-200", breakAfter: true },
                    { text: "colaborativos registrados", color: "text-primary-900 dark:text-primary-200" },
                ]}
                fontSize="text-xl sm:text-2xl 2xl:text-4xl"
                className="font-extrabold"
            />
            <Button
                size="square" className="my-4" link="/projects"
                icon={<ExternalLinkIcon size={30} lightColor="var(--color-primary-700)" darkColor="white" />}
            />
        </div>
    );
}