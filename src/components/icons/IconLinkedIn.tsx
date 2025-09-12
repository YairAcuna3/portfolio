"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";

const LinkedInIcon = ({
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
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.266 2.37 4.266 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
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

export default LinkedInIcon;