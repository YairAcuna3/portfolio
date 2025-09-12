"use client"

import { useDarkMode } from "@/hooks/useDarkMode";
import { IconProps } from "@/types/icon";
import Link from "next/link";

const YairAcunaIcon = ({
    size = 300,
    lightColor = "#000000",
    darkColor = "#ffffff",
    className,
    href,
}: IconProps) => {
    const isDark = useDarkMode();

    const svg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 300 300"
            className={className}
            fill={isDark ? darkColor : lightColor}
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0,300) scale(0.1,-0.1)"
                fill={isDark ? darkColor : lightColor}
                stroke="none"
            >
                <path d="M1298 2955 c-416 -59 -790 -295 -1022 -642 -158 -239 -232 -469 -243 -758 -7 -201 11 -340 68 -510 153 -459 485 -791 944 -944 170 -57 309 -75 510 -68 222 8 369 43 564 134 291 134 563 402 701 686 52 109 105 270 127 387 26 142 23 401 -6 540 -126 598 -568 1040 -1161 1160 -136 28 -350 34 -482 15z m239 -544 c91 -42 161 -229 193 -517 7 -60 15 -117 19 -127 4 -13 40 65 115 250 60 147 118 285 128 306 l18 37 125 0 c69 0 125 -2 125 -4 0 -2 -31 -62 -68 -133 -38 -70 -102 -191 -142 -268 -116 -223 -170 -325 -211 -402 l-39 -71 0 -201 c0 -179 -2 -206 -21 -257 -35 -94 -126 -167 -223 -180 -55 -8 -123 22 -149 65 -22 38 -22 134 -1 209 27 93 106 248 196 384 l85 127 -13 118 c-23 206 -84 398 -142 443 -35 28 -110 27 -146 -1 -15 -11 -47 -56 -72 -99 -67 -116 -78 -121 -115 -48 -68 134 42 324 221 379 41 12 73 10 117 -10z m-613 -1191 c146 -113 264 -209 262 -215 -1 -5 -123 -104 -269 -218 l-267 -208 -55 43 c-30 23 -55 45 -55 48 1 3 62 52 137 110 75 58 171 132 214 166 l77 60 -203 158 c-112 87 -209 164 -215 171 -8 9 3 22 42 53 29 22 56 40 60 39 3 -1 126 -94 272 -207z m1006 -575 l0 -75 -327 0 -328 0 2 77 c1 43 2 78 3 78 0 0 146 -1 325 -3 l325 -3 0 -74z" />
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

export default YairAcunaIcon;
