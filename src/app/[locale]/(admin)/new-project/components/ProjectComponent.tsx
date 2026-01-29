'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GreatAlert from '@/components/GreatAlert';
import LoadingOverlay from '@/components/LoadingOverlay';
import { OnlyTechnology, Project } from '@/types';
import { useImageFiles, useLinks, useProjectDetails, useTechnologies } from '../hooks';
import { FormProject, ImagesPanel, LinksPanel, TechnologiesPanel } from '.';
import ModalTechnologies from '@/components/ModalTechnologies';
import { getTechnologies } from '@/actions/technology/getTechnologies';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import { addImageToProject } from '@/actions/image';

interface Props {
    project?: Project;
}

export default function ProjectComponent({ project }: Props) {
    const router = useRouter();
    const breakpoint = useBreakpoint();
    const [technologies, setTechnologies] = useState<OnlyTechnology[]>([]);
    const { projectTechs, addTechnology, removeTechnology } = useTechnologies(project?.technologies);
    const { imageFiles, imageUrls, addImage, removeImageFile, removeImageUrl, reorderImageFiles, reorderImageUrls } = useImageFiles(project?.images);
    const { links, addLink, removeLink } = useLinks(project?.links);
    const { details, setName, setDescription, setType, setMadeFor, setStartAt } = useProjectDetails({
        name: project?.name ?? "",
        description: project?.description ?? "",
        type: project?.type ?? "",
        madeFor: project?.madeFor || "",
        startAt: project?.startAt || null,
    });
    const [isModalTech, setIsModalTech] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGreatAlert, setIsGreatAlert] = useState(false);
    const isEditing = useMemo(() => Boolean(project?.id), [project?.id]);

    const isMobile = breakpoint === 'sm' || breakpoint === 'md';
    const isTablet = breakpoint === 'lg';

    const handleCloseAlert = () => {
        setIsGreatAlert(false);
        router.push('/projects');
    };

    const handleImageUploaded = async (imageUrl: string) => {
        if (!project?.id) return;

        try {
            const result = await addImageToProject({
                projectId: project.id,
                imageUrl
            });

            if (result.success) {
                // Recargar la página para mostrar la nueva imagen
                // En una implementación más sofisticada, se actualizaría el estado local
                window.location.reload();
            }
        } catch (error) {
            console.error('Error saving image to database:', error);
            alert('Error saving image to database');
        }
    };

    useEffect(() => {
        const fetchTechnologies = async () => {
            const techData = await getTechnologies();
            setTechnologies(techData);
        };
        fetchTechnologies();
    }, []);

    return (
        <>
            <div className={`flex flex-col justify-between items-start gap-4 sm:gap-6 lg:gap-7 py-4 sm:py-8 lg:py-20 px-4 sm:px-8 lg:px-40`}>
                {/* Layout responsive para los paneles principales */}
                <div className={`flex ${isMobile ? 'flex-col' : isTablet ? 'flex-col' : 'flex-row'} gap-4 sm:gap-6 lg:gap-7 w-full`}>
                    {/* Panel de Tecnologías */}
                    <div
                        className={`flex flex-col bg-gray-800 shadow-lg border border-primary-200 ${isMobile
                            ? 'w-full h-auto min-h-[300px]'
                            : isTablet
                                ? 'w-full h-auto min-h-[400px]'
                                : 'w-1/5 h-[80vh]'
                            } p-4 sm:p-6 lg:p-8 items-center justify-between rounded-lg`}
                    >
                        <TechnologiesPanel
                            projectTech={projectTechs}
                            onRemoveTechnology={removeTechnology}
                            setIsModalTech={setIsModalTech}
                        />
                    </div>

                    {/* Panel del Formulario */}
                    <div
                        className={`flex flex-col ${isMobile
                            ? 'w-full h-auto'
                            : isTablet
                                ? 'w-full h-auto'
                                : 'w-2/5 h-[80vh]'
                            } justify-between p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg border border-primary-200`}
                    >
                        <FormProject
                            projectTechs={projectTechs}
                            imageFiles={imageFiles}
                            links={links}

                            setIsLoading={setIsLoading}
                            setIsGreatAlert={setIsGreatAlert}

                            details={details}
                            setName={setName}
                            setDescription={setDescription}
                            setType={setType}
                            setMadeFor={setMadeFor}
                            setStartAt={setStartAt}

                            projectId={project?.id || ""}
                            currentImageUrls={imageUrls}
                        />
                    </div>

                    {/* Panel de Imágenes */}
                    <div
                        className={`flex flex-col bg-gray-800 shadow-lg border border-primary-200 ${isMobile
                            ? 'w-full h-auto min-h-[400px]'
                            : isTablet
                                ? 'w-full h-auto min-h-[500px]'
                                : 'w-2/5 h-[80vh]'
                            } p-4 sm:p-6 lg:p-8 items-center justify-between rounded-lg`}
                    >
                        <ImagesPanel
                            imageFiles={imageFiles}
                            imageUrls={imageUrls}
                            onAddImage={addImage}
                            removeImageFile={removeImageFile}
                            removeImageUrl={removeImageUrl}
                            reorderImageFiles={reorderImageFiles}
                            reorderImageUrls={reorderImageUrls}
                            projectId={project?.id}
                            onImageUploaded={handleImageUploaded}
                        />
                    </div>
                </div>

                {/* Panel de Links - Siempre en la parte inferior */}
                <div
                    className="flex flex-col bg-gray-800 shadow-lg border border-primary-200 w-full h-auto p-4 sm:p-6 lg:p-8 items-center justify-between rounded-lg"
                >
                    <LinksPanel
                        links={links}
                        onAddLink={addLink}
                        onRemoveLink={removeLink}
                    />
                </div>
            </div>

            <ModalTechnologies
                technologies={technologies}
                isOpen={isModalTech}
                onClose={() => setIsModalTech(false)}
                onAddTechnology={addTechnology}
                techsAlreadyAdded={projectTechs}
            />
            <GreatAlert
                isOpen={isGreatAlert}
                onClose={handleCloseAlert}
                title={isEditing ? "¡Congratulations!" : "¡Felicidades!"}
                text={isEditing ? "Se actualizó el proyecto uwu" : "Se creó el proyecto xddd"}
            />
            <LoadingOverlay isLoading={isLoading} />
        </>
    );
}