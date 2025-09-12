'use client';

import { logoutUser } from "@/actions/access/logoutUser";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import ButtonTopMenu from "./ButtonTopMenu";
import ThemeToggle from "./ThemeToggleButton";
import PlusSquareIcon from "../icons/IconSquarePlus";
import YairAcunaIcon from "../icons/IconYairAcuna";
import LogoutIcon from "../icons/IconLogOut";
import LoginIcon from "../icons/IconLogIn";
import TrashIcon from "../icons/IconTrash";

interface Props {
    session: boolean;
}

export default function TopMenu({ session }: Props) {
    const t = useTranslations('Layout.TopButtons');

    async function handleLogout() {
        await logoutUser();
    }

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 mx-32 py-4 px-8 flex justify-between items-center bg-cyan-700 dark:bg-gray-800 rounded-bl-3xl rounded-br-3xl border-b border-primary-300 z-50">
                <YairAcunaIcon
                    size={40}
                    darkColor="white"
                    lightColor="var(--color-primary-100)"
                    href="/"
                />

                {session &&
                    <>
                        <LoginIcon
                            size={40}
                            darkColor="white"
                            lightColor="var(--color-primary-100)"
                            href="/login"
                        />
                        <LogoutIcon
                            size={40}
                            darkColor="white"
                            lightColor="var(--color-primary-100)"
                            onClick={handleLogout}
                        />
                        <PlusSquareIcon
                            size={40}
                            darkColor="white"
                            lightColor="var(--color-primary-100)"
                            href="/new-project"
                        />
                        <TrashIcon
                            size={40}
                            darkColor="white"
                            lightColor="var(--color-primary-200)"
                            className='cursor-pointer'
                            href="/recyclebin"

                        />
                        <ButtonTopMenu text="Register" link="/register" />
                    </>
                }

                <div className="flex items-center gap-4">
                    <ButtonTopMenu text={t('About me')} link="/aboutme" />
                    <ButtonTopMenu text={t('Skills')} link="/skills" />
                    <ButtonTopMenu text={t('Projects')} link="/projects" />
                    <ButtonTopMenu text={t('Contact')} link="/contact" />
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </header>
        </div>
    );
}