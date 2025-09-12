"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";
import Link from "next/link";

interface ExtendedIconProps extends IconProps {
    onClick?: () => void;
}

const TrashIcon = ({
    size = 300,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
    href,
    onClick,
}: ExtendedIconProps) => {
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
                <g data-name="trash-2">
                    <rect width="24" height="24" opacity="0" />
                    <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0zm0-11.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM16 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0z" />
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

export default TrashIcon;
