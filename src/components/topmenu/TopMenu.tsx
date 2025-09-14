'use client';

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggleButton";
import { MenuIcon, YairAcunaIcon } from "../icons";
import Options from "./Options";
import { useState } from "react";

interface Props {
    session: boolean;
}

export default function TopMenu({ session }: Props) {
    const [isSideBar, setIsSideBar] = useState(false);

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between max-w-screen xl:mx-32 py-2 md:pt-4 px-4 lg:px-8 bg-cyan-700 dark:bg-gray-800 border-b rounded-bl-3xl rounded-br-3xl border-primary-300">
                <div className="hidden md:block">
                    <YairAcunaIcon
                        size={40}
                        darkColor="white"
                        lightColor="var(--color-primary-100)"
                        href="/"
                    />
                </div>

                <div className="block md:hidden">
                    <MenuIcon
                        size={35}
                        darkColor="white"
                        lightColor="var(--color-primary-100)"
                        onClick={() => setIsSideBar(true)}
                        className="z-50"
                    />
                    {
                        isSideBar &&
                        <div
                            onClick={() => setIsSideBar(false)}
                            className="max-w-screen fixed inset-0 bg-black/65 backdrop-blur-sm"
                        >
                            <div className="bg-primary-800 dark:bg-gray-900 w-[200px] h-full p-6">
                                <YairAcunaIcon
                                    size={50}
                                    darkColor="white"
                                    lightColor="var(--color-primary-100)"
                                    href="/"
                                    className="mb-4 mx-auto"
                                />
                                <Options
                                    session={session}
                                    className="flex flex-col max-w-[150px]"
                                />
                            </div>
                        </div>
                    }
                </div>

                <div className="flex gap-6 mb-2">
                    <Options
                        session={session}
                        className="hidden md:flex items-center gap-4"
                    />
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </header>
        </div>
    );
}