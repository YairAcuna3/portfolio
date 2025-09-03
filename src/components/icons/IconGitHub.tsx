"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";

const GitHubIcon = ({
    size = 24,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
}: IconProps) => {
    const isDark = useDarkMode();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={isDark ? darkColor : lightColor}
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1.8-.7 2.9-1 .2-.8.6-1.3 1-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.2 1.2.9-.2 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.6.5 1.1 1.4 1.1 2.8v4.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
};

export default GitHubIcon;