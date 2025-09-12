'use client';

import YairAcunaIcon from "@/components/icons/IconYairAcuna";
import SeparatorLine from "@/components/SeparatorLine";

interface Props {
    view: boolean;
    setView: (state: boolean) => void;
}

export default function ProjectsHeader({ view, setView }: Props) {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex">
                <h1 className="text-center mx-auto">
                    Aquí irá la cabecera con filtros para buscar
                </h1>
                <button
                    onClick={() => setView(!view)}
                >
                    <YairAcunaIcon size={40} className="mr-40" />
                </button>
            </div>
            <SeparatorLine />
        </div>
    );
}