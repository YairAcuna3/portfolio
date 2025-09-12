"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";
import Link from "next/link";

const PlusSquareIcon = ({
    size = 300,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
    href,
    onClick,
}: IconProps) => {
    const isDark = useDarkMode();

    const svg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            fill={isDark ? darkColor : lightColor}
            preserveAspectRatio="xMidYMid meet"
        >
            <g data-name="Layer 2">
                <g data-name="plus-square">
                    <rect width="24" height="24" opacity="0" />
                    <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm-3 10h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2z" />
                </g>
            </g>
        </svg>
    );

    if (href) {
        return <Link href={href}>{svg}</Link>;
    }

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="bg-transparent border-none p-0 cursor-pointer"
                aria-label="icon-button"
            >
                {svg}
            </button>
        );
    }

    return svg;
};

export default PlusSquareIcon;
