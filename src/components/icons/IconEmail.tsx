"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";
import Link from "next/link";

const EmailIcon = ({
    size = 24,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
    href,
}: IconProps) => {
    const isDark = useDarkMode();

    const svg = (
        <svg
            width={size}
            height={size}
            viewBox="0 0 228 228"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill={isDark ? darkColor : lightColor}
        >
            <g transform="translate(0,228) scale(0.1,-0.1)">
                <path d="M110 1886 c8 -7 231 -201 495 -431 264 -230 492 -429 506 -442 l26 -24 489 427 c269 234 502 439 519 455 l30 29 -1040 0 c-875 0 -1037 -2 -1025 -14z" />
                <path d="M37 1853 c-10 -10 -8 -1453 2 -1453 5 0 145 145 312 322 167 178 336 357 377 399 l73 77 -358 312 c-197 172 -367 321 -379 332 -11 10 -24 15 -27 11z" />
                <path d="M1858 1534 c-205 -180 -374 -330 -376 -333 -3 -8 734 -793 750 -799 4 -2 8 325 8 727 0 402 -2 731 -4 731 -3 0 -172 -147 -378 -326z" />
                <path d="M454 760 c-209 -221 -380 -405 -382 -411 -2 -5 404 -9 1062 -9 670 0 1066 4 1066 10 0 10 -745 803 -759 808 -5 2 -71 -51 -147 -117 -77 -67 -147 -121 -157 -121 -10 0 -79 53 -153 118 -74 64 -138 118 -143 120 -5 2 -179 -178 -387 -398z" />
            </g>
        </svg>
    )
    return href ? (
        <Link href={href} >
            {svg}
        </Link>
    ) : (
        svg
    );
};

export default EmailIcon;
