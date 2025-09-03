"use client";

import { useEffect, useState } from "react";
import MoonIcon from "../icons/IconMoon";
import SunIcon from "../icons/IconSun";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;

        if (stored) {
            setTheme(stored);
            document.documentElement.classList.toggle("dark", stored === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <MoonIcon size={30} darkColor="white" className="ml-3" />
            ) : (
                <SunIcon size={30} lightColor="var(--color-primary-100)" className="ml-3" />
            )}
        </button>
    );
}
