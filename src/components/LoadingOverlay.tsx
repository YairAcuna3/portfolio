'use client';

interface Props {
    isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: Props) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-primary-500 border-b-primary-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
    );
}
