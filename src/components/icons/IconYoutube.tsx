"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";

const YouTubeIcon = ({
    size = 24,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
    href,
    target,
}: IconProps) => {
    const isDark = useDarkMode();

    const svg = (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={isDark ? darkColor : lightColor}
        >
            <path d="M23.498 6.186a2.966 2.966 0 0 0-2.093-2.093C19.108 3.5 12 3.5 12 3.5s-7.108 0-9.405.593a2.966 2.966 0 0 0-2.093 2.093C0 8.482 0 12 0 12s0 3.518.502 5.814a2.966 2.966 0 0 0 2.093 2.093C4.892 20.5 12 20.5 12 20.5s7.108 0 9.405-.593a2.966 2.966 0 0 0 2.093-2.093C24 15.518 24 12 24 12s0-3.518-.502-5.814ZM9.545 15.568V8.432l6.545 3.568-6.545 3.568Z" />
        </svg>
    );

    return href ? (
        <a href={href} target={target} rel="noopener noreferrer">
            {svg}
        </a>
    ) : (
        svg
    );
};

export default YouTubeIcon;
