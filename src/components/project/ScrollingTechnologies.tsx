'use client';

import { motion } from 'framer-motion';
import { iconTechMap } from '@/utils/iconTechMap';
import { useEffect, useState, useRef } from 'react';

interface Technology {
    id: string;
    name: string;
    color?: string | null;
}

interface ScrollingTechnologiesProps {
    technologies: Technology[];
}

export default function ScrollingTechnologies({ technologies }: ScrollingTechnologiesProps) {
    const [shouldScroll, setShouldScroll] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && contentRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = contentRef.current.scrollWidth;
                setShouldScroll(contentWidth > containerWidth);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [technologies]);

    if (!technologies || technologies.length === 0) {
        return null;
    }

    // Duplicar las tecnologías solo si necesitamos scroll
    const displayTechs = shouldScroll ? [...technologies, ...technologies] : technologies;

    // Función para normalizar nombres de tecnologías
    const normalizeIconKey = (name: string): string => {
        const normalized = name.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/\.js$/, 'js')
            .replace(/\.net$/, 'dotnet')
            .replace(/c\+\+/, 'cplusplus')
            .replace(/c#/, 'csharp')
            .replace(/node\.js/, 'nodejs')
            .replace(/next\.js/, 'nextjs')
            .replace(/vue\.js/, 'vuejs')
            .replace(/express\.js/, 'expressjs')
            .replace(/postgresql/, 'postgres')
            .replace(/mysql/, 'mysql')
            .replace(/mongodb/, 'mongodb');

        return normalized;
    };

    return (
        <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div ref={containerRef} className="relative">
                <motion.div
                    ref={contentRef}
                    className={`flex gap-3 ${shouldScroll ? '' : 'justify-center flex-wrap'}`}
                    animate={shouldScroll ? {
                        x: [0, -50 * technologies.length],
                    } : {}}
                    transition={shouldScroll ? {
                        duration: technologies.length * 3,
                        repeat: Infinity,
                        ease: "linear",
                    } : {}}
                >
                    {displayTechs.map((tech, index) => {
                        const normalizedKey = normalizeIconKey(tech.name);
                        const IconComponent = iconTechMap[normalizedKey as keyof typeof iconTechMap];

                        // Debug: log para ver qué iconos no se encuentran
                        if (!IconComponent) {
                            console.log(`Icon not found for: "${tech.name}" -> normalized: "${normalizedKey}"`);
                        }

                        return (
                            <div
                                key={`${tech.id}-${index}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-110 cursor-pointer"
                                style={{
                                    backgroundColor: tech.color || '#6B7280',
                                    '--glow-color': tech.color || '#6B7280'
                                } as React.CSSProperties & { '--glow-color': string }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 20px ${tech.color || '#6B7280'}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {IconComponent && <IconComponent size={16} />}
                                <span>{tech.name}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}