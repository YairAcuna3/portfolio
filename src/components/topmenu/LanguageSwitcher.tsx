"use client"

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const locales = ['en', 'de', 'es'];

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const changeLanguage = (newLocale: string) => {
        router.push(pathname, { locale: newLocale });
    };

    return (
        <select className={"text-primary-100 dark:text-white bg-primary-700 dark:bg-gray-800"} value={locale} onChange={(e) => changeLanguage(e.target.value)}>
            {locales.map((loc) => (
                <option key={loc} value={loc}>
                    {loc.toUpperCase()}
                </option>
            ))}
        </select>
    );
}