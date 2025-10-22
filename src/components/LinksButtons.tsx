'use client';

import { IconMapLinksKeys } from "@/types/icon";
import { OnlyLink } from "@/types/link";
import { iconLinkMap } from "@/utils/iconLinkMap";
import Button from "./buttons/Button";

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
                    <Button
                        key={link.id} type="external"
                        link={link.url} target="_blank"
                        icon={<IconComponent size={17} className="dark:text-white" />}
                        text={link.type}
                    />
                ) : (
                    <Button
                        key={link.id} type="external"
                        link={link.url} target="_blank"
                        text={link.type}
                    />
                )
            })}
        </div>
    );
}