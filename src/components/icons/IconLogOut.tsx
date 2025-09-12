"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";

const LogoutIcon = ({
    size = 300,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
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
                <g data-name="log-out">
                    <rect
                        width="24"
                        height="24"
                        transform="rotate(90 12 12)"
                        opacity="0"
                    />
                    <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6z" />
                    <path d="M20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z" />
                </g>
            </g>
        </svg>
    );

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

export default LogoutIcon;
