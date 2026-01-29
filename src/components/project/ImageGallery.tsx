'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageGalleryProps {
    images: Array<{
        id: string;
        url: string;
        alt?: string;
    }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dragDirection, setDragDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center w-full aspect-video bg-gray-100 dark:bg-gray-800 lg:rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                    Este proyecto aún no tiene imágenes
                </p>
            </div>
        );
    }

    const nextImage = () => {
        setDragDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setDragDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index: number) => {
        setDragDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            prevImage();
        } else if (info.offset.x < -threshold) {
            nextImage();
        }
    };

    return (
        <div className="flex gap-4">
            {/* Thumbnails - Solo en desktop */}
            {images.length > 1 && (
                <div className="hidden lg:flex flex-col w-24">
                    <div ref={containerRef} className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-2" style={{ height: 'fit-content', maxHeight: '400px' }}>
                        <motion.div
                            ref={contentRef}
                            className="flex flex-col gap-3"
                            animate={shouldScroll ? {
                                y: [0, -(images.length - 4) * 92],
                            } : {}}
                            transition={shouldScroll ? {
                                duration: images.length * 2,
                                repeat: Infinity,
                                ease: "linear",
                            } : {}}
                        >
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => goToImage(index)}
                                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${index === currentIndex
                                        ? 'border-primary-500 scale-105 shadow-lg'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                                        }`}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.alt || `Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Main Image */}
            <div
                className="relative flex-1 aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 lg:rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence mode="wait" custom={dragDirection}>
                    <motion.div
                        key={currentIndex}
                        custom={dragDirection}
                        initial={{
                            x: isMobile ? (dragDirection > 0 ? '100%' : '-100%') : 0,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 1
                        }}
                        exit={{
                            x: isMobile ? (dragDirection > 0 ? '-100%' : '100%') : 0,
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 lg:relative lg:w-full lg:h-full"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        style={{
                            cursor: isMobile ? 'grab' : 'default'
                        }}
                    >
                        <Image
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt || `Imagen ${currentIndex + 1}`}
                            fill
                            className="object-cover pointer-events-none"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Solo en desktop */}
                {images.length > 1 && (
                    <>
                        <AnimatePresence>
                            {isHovered && (
                                <>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.7 }}
                                        exit={{ opacity: 0 }}
                                        onClick={prevImage}
                                        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-10"
                                    >
                                        <ChevronLeftIcon className="w-6 h-6 text-white" />
                                    </motion.button>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.7 }}
                                        exit={{ opacity: 0 }}
                                        onClick={nextImage}
                                        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-10"
                                    >
                                        <ChevronRightIcon className="w-6 h-6 text-white" />
                                    </motion.button>
                                </>
                            )}
                        </AnimatePresence>
                    </>
                )}

                {/* Dots indicator - Solo en mobile */}
                {images.length > 1 && (
                    <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToImage(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex
                                    ? 'bg-white'
                                    : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}