"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";
import Link from "next/link";

interface ExtendedIconProps extends IconProps {
    onClick?: () => void;
}

const EditIcon = ({
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
                <g data-name="edit-2">
                    <rect width="24" height="24" opacity="0" />
                    <path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z" />
                    <path d="M5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 18zM15.27 4L18 6.73l-2 1.95L13.32 6zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28z" />
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

export default EditIcon;
