'use client';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Section({ children, className }: Props) {
    return (
        <div className={`mx-32 p-4 ${className}`}>
            {children}
        </div>
    );
}