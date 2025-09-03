'use client';

import Link from "next/link";
import Section from "../Section";
import ButtonTopMenu from "./ButtonTopMenu";
import YairAcunaIcon from "../icons/IconYairAcuna";
import ThemeToggle from "./ThemeToggleButton";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";


export default function Name() {
    const t = useTranslations('Layout.TopButtons');

    return (
        <div>
            <Section
                className="mb-4 flex justify-between items-center bg-cyan-700 dark:bg-cyan-950 rounded-bl-3xl rounded-br-3xl"
                content={
                    <>
                        <Link href={"/"}>
                            <YairAcunaIcon size={40} darkColor="white" lightColor="var(--color-primary-100)" className="ml-10" />
                        </Link>
                        <div className="flex items-center gap-4 mr-10">
                            <ButtonTopMenu
                                text={t('About me')}
                                link="/aboutme"
                            />
                            <ButtonTopMenu
                                text={t('Skills')}
                                link="/skills"
                            />
                            <ButtonTopMenu
                                text={t('Projects')}
                                link="/projects"
                            />
                            <ButtonTopMenu
                                text={t('Contact')}
                                link="/contact"
                            />
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>
                    </>
                } />
        </div>
    );
}