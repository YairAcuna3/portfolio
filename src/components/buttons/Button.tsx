'use client';

import Link from "next/link";

interface Props {
    className?: string;
    variant?: "primary" | "oval" | "danger";
    size?: "sm" | "md" | "lg" | "xl" | "reponsive" | "square";
    type?: "internal" | "external" | "action";
    icon?: React.ReactNode;
    text?: string;
    link?: string;
    target?: "_blank" | "_self";
    onClick?: () => void;
}

export default function Button({
    className,
    variant = "primary",
    size = "md",
    type = "internal",
    icon,
    text,
    link,
    target = "_self",
    onClick,
}: Props) {
    const variantClasses: Record<string, string> = {
        primary: [
            "bg-primary-100", "dark:bg-primary-600",
            "hover:bg-primary-200", "dark:hover:bg-primary-700",
            "rounded-lg",
            "text-primary-900", "dark:text-white",
            "hover:text-primary-950", "dark:hover:text-primary-100",
        ].join(" "),
        oval: [
            "bg-primary-100", "dark:bg-primary-600",
            "hover:bg-primary-200", "dark:hover:bg-primary-700",
            "rounded-3xl",
            "text-primary-900", "dark:text-white",
            "hover:text-primary-950", "dark:hover:text-primary-100",
        ].join(" "),
        danger: "bg-red-100 dark:bg-red-600 text-red-900 dark:text-white rounded-lg",
    };

    const sizeClasses: Record<string, string> = {
        sm: "px-3 py-2 text-sm gap-2",
        md: "px-5 py-2 text-base gap-2",
        lg: "px-6 py-3 text-lg gap-2",
        xl: "px-8 py-4 text-xl gap-2",
        reponsive: "text-sm sm:text-md md:text-sm xl:text-lg px-4 py-2 gap-2",
        square: "py-2 px-2",
    };

    const classes = `transition-colors inline-flex items-center cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (link) {
        if (type === "internal") {
            return (
                <Link href={link} target={target} className={classes}>
                    {icon && <span>{icon}</span>}
                    <span>{text}</span>
                </Link>
            );
        } else {
            return (
                <a href={link} target={target} rel="noopener noreferrer" className={classes}>
                    {icon && <span>{icon}</span>}
                    <span>{text}</span>
                </a>
            );
        }
    }

    return (
        <button onClick={onClick} className={classes}>
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </button>
    );
}