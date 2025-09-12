'use client';

interface Props {
    text: string;
    color?: string;
    hover?: string;
    textColor?: string;
    link: string;
    icon?: React.ReactNode;
    className?: string;
    target?: "_blank" | "_self";
}

export default function CustomButton({
    text,
    color = "bg-black",
    hover = "hover:bg-gray-800",
    textColor = "text-white",
    link,
    icon,
    className,
    target,
}: Props) {
    return (
        <a
            href={link}
            target={target}
            className={`inline-flex items-center px-5 py-2 transition-colors ${color} ${hover} ${textColor} ${className}`}
        >
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </a>
    );
}