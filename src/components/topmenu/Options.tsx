'use client';

import { logoutUser } from "@/actions/access/logoutUser";
import { LoginIcon, LogoutIcon, PlusSquareIcon, TrashIcon } from "../icons";
import { useTranslations } from "next-intl";
import Button from "../buttons/Button";

interface Props {
    session: boolean;
    className: string;
}

export default function Options({ session, className }: Props) {
    const t = useTranslations('Layout.TopButtons');
    async function handleLogout() { await logoutUser(); }

    return (
        <div className={className}>
            {session &&
                <div className="order-2 md:order-1 flex flex-col md:flex-row gap-4">
                    <Button text="Register" link="/register" />
                    <LoginIcon
                        size={40}
                        darkColor="white"
                        lightColor="var(--color-primary-100)"
                        href="/login"
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
                    <LogoutIcon
                        size={40}
                        darkColor="white"
                        lightColor="var(--color-primary-100)"
                        onClick={handleLogout}
                    />
                </div>
            }
            <div className="order-1 md:order-2 flex flex-col md:flex-row mb-4 md:mb-0 gap-4">
                <Button text={t('Projects')} link="/projects" />
                <Button text={t('Contact')} link="/contact" />
            </div>
        </div>
    );
}

{/* <ButtonTopMenu text={t('About me')} link="/aboutme" />
<ButtonTopMenu text={t('Skills')} link="/skills" /> */}