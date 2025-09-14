'use client';

import { IconMapLinksKeys } from "@/types/icon";
import { OnlyLink } from "@/types/link";
import { iconLinkMap } from "@/utils/iconLinkMap";

interface Props {
    links: OnlyLink[];
    className?: string;
}

export default function LinksButtons({ links, className }: Props) {
    return (
        <div className={`${className}`}>
            {links.map((link) => {
                const iconLink = link.icon as IconMapLinksKeys
                const IconComponent = iconLink && iconLink in iconLinkMap
                    ? iconLinkMap[iconLink]
                    : null;
                return IconComponent ? (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        className={`flex px-4 items-center justify-between rounded-lg border-1 dark:border-0 transition-colors bg-primary-100 hover:bg-primary-200 dark:bg-primary-600 dark:hover:bg-primary-700"`}
                    >
                        <IconComponent size={15} className="dark:text-white" />
                        <span className="text-lg pl-2 py-1 whitespace-nowrap dark:text-white">
                            {link.type}
                        </span>
                    </a>
                ) : (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        className={`flex px-4 items-center justify-between rounded-lg transition-colors bg-primary-100 hover:bg-primary-200 dark:bg-primary-600 dark:hover:bg-primary-700"`}
                    >
                        <span className="text-lg py-1 whitespace-nowrap dark:text-white">
                            {link.type}
                        </span>
                    </a>
                )
            })}
        </div>
    );
}