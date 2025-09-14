'use client';

interface Props {
    className?: string;
}

export default function SeparatorLine({ className }: Props) {
    return (
        <div className={`flex items-center p-4 ${className}`}>
            <div className="w-4 h-4 bg-primary-950 dark:bg-white rounded-full"></div>
            <div className="flex-1 border-b-2"></div>
        </div>
    );
}