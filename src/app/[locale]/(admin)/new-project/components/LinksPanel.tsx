'use client';

import { TrashIcon } from "@/components/icons";
import { LINK_TYPES } from "@/constants/linkTypes";
import { IconMapLinksKeys, OnlyLink } from "@/types";
import { iconLinkMap } from "@/utils/iconLinkMap";

interface Props {
    links: OnlyLink[];
    onAddLink: (link: OnlyLink) => void;
    onRemoveLink: (linkUrl: string) => void;
}

export default function LinksPanel({ links, onAddLink, onRemoveLink }: Props) {
    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-200 text-center mb-4">
                Links del proyecto
            </h2>

            <div className="h-auto w-full flex flex-col border border-gray-300 rounded-lg mx-2 sm:mx-4 my-4 sm:my-6 bg-gray-700">
                <div className="overflow-y-auto h-full text-center max-h-[200px] sm:max-h-[300px]">
                    {links.map((link) => {
                        const iconLink = link.icon as IconMapLinksKeys
                        const IconComponent = iconLink && iconLink in iconLinkMap
                            ? iconLinkMap[iconLink]
                            : null;
                        return IconComponent ? (
                            <div
                                key={link.url}
                                className="flex gap-2 sm:gap-4 items-center justify-between py-2 px-4 sm:px-8 rounded-lg hover:text-white hover:bg-primary-700 transition-colors"
                            >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <IconComponent size={15} className="text-white flex-shrink-0" />
                                    <span className="text-sm sm:text-base truncate">{link.url}</span>
                                </div>
                                <TrashIcon
                                    size={18}
                                    darkColor="white"
                                    lightColor="var(--color-primary-200)"
                                    className='cursor-pointer flex-shrink-0'
                                    onClick={() => onRemoveLink(link.url)}

                                />
                            </div>
                        ) : (
                            "ratata"
                        )
                    })}
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const url = formData.get("url") as string;
                    const type = formData.get("type") as string;
                    const linkType = LINK_TYPES.find((t) => t.label === type);

                    if (!linkType) return;

                    onAddLink({
                        id: "",
                        url,
                        type,
                        icon: linkType.icon,
                    });

                    e.currentTarget.reset();
                }}
                className="w-full"
            >
                <label className="block text-sm font-medium text-primary-200 mb-2">
                    Ingresa nuevo link
                </label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    required
                    className="mb-3 bg-gray-700 w-full px-3 sm:px-4 py-2 border border-primary-300 rounded-lg text-sm sm:text-base"
                    placeholder="www.link.com"
                />
                <label className="block text-sm font-medium text-primary-200">
                    Tipo
                </label>
                <select id="type" name="type" className="w-full my-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                    {LINK_TYPES.map(({ label }) => (
                        <option className={"text-black"} key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="mt-2 cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-sm sm:text-base"
                >
                    Agregarlo
                </button>
            </form>
        </>
    );
}