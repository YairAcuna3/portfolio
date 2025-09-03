'use client';

interface Props {
    text: string;
    color?: string;
    hover?: string;
    textColor?: string;
    link: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function CustomButton({
    text,
    color = "bg-black",
    hover = "hover:bg-gray-800",
    textColor = "text-white",
    link,
    icon,
    className
}: Props) {
    return (
        <a
            href={link}
            className={`inline-flex items-center px-5 py-2 transition-colors ${color} ${hover} ${textColor} ${className}`}
        >
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </a>
    );
}