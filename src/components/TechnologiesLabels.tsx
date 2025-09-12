'use client';

import { IconMapTechsKeys } from "@/types/icon";
import { OnlyTechnology } from "@/types/technology";
import { iconTechMap } from "@/utils/iconTechMap";
import { useEffect, useState } from "react";
import { TrashIcon } from "./icons";

interface Props {
    className?: string;
    technologies: OnlyTechnology[];
    maxVisible?: number;
    onRemoveTechnology?: (techName: string) => void
}

export default function TechnologiesLabels({ className, technologies, maxVisible, onRemoveTechnology }: Props) {
    const [extraTechnologies, setExtraTechnologies] = useState(0);
    useEffect(() => {
        if (maxVisible) {
            const max = technologies.length > maxVisible
                ? technologies.length - maxVisible
                : 0;
            setExtraTechnologies(max);
        }
    }, [maxVisible, technologies.length])

    return (
        <div className={`${className}`}>
            {technologies.length > 0 ? (
                technologies.slice(0, maxVisible).map((tech) => {
                    const iconTech = tech.icon as IconMapTechsKeys
                    const IconComponent = iconTech && iconTech in iconTechMap
                        ? iconTechMap[iconTech]
                        : null;
                    const labelClass = "flex px-4 items-center justify-between rounded-lg";

                    return IconComponent ? (
                        <div
                            key={tech.id}
                            className={labelClass}
                            style={{ backgroundColor: tech.color || "#005F78" }}
                        >
                            <IconComponent size={15} className="text-white" />
                            <span className="pl-2 py-1 whitespace-nowrap text-white">
                                {tech.name}
                            </span>
                            {onRemoveTechnology && (
                                <TrashIcon
                                    size={20}
                                    darkColor="white"
                                    lightColor="var(--color-primary-200)"
                                    className='cursor-pointer ml-4'
                                    onClick={() => onRemoveTechnology(tech.name)}

                                />
                            )}
                        </div>
                    ) : (
                        <div
                            key={tech.id}
                            className={labelClass}
                            style={{ backgroundColor: tech.color || "#005F78" }}
                        >
                            <span className="py-1 whitespace-nowrap text-white">
                                {tech.name}
                            </span>
                        </div>
                    );
                })
            ) : (
                !onRemoveTechnology && <div className="text-amber-200">Sin tecnologías registradas</div>
            )}

            {extraTechnologies > 0 && (
                <div className="flex px-4 items-center justify-center rounded-lg bg-primary-800 text-primary-200 whitespace-nowrap">
                    +{extraTechnologies}
                </div>
            )}
        </div>
    );
}