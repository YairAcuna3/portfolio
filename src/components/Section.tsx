'use client';

interface Props {
    content: React.ReactNode;
    className?: string;
}

export default function Section({ content, className }: Props) {
    return (
        <div className={`mx-32 p-4 ${className}`}>
            {content}
        </div>
    );
}