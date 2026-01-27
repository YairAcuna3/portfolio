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

interface Props {
    project?: Project;
}

export default function ProjectComponent({ project }: Props) {
    const router = useRouter();
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

    const handleCloseAlert = () => {
        setIsGreatAlert(false);
        router.push('/projects');
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
            <div className="flex flex-col justify-between items-start gap-7 py-20 px-40">
                <div className='flex gap-7 w-full'>
                    <div
                        className="flex flex-col bg-gray-800 shadow-lg border border-primary-200 w-1/5 h-[80vh] p-8 items-center justify-between rounded-lg"
                    >
                        <TechnologiesPanel
                            projectTech={projectTechs}
                            onRemoveTechnology={removeTechnology}
                            setIsModalTech={setIsModalTech}
                        />
                    </div>

                    <div
                        className="flex flex-col w-2/5 h-[80vh] justify-between p-6 bg-gray-800 rounded-lg shadow-lg border border-primary-200"
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

                    <div
                        className="flex flex-col bg-gray-800 shadow-lg border border-primary-200 w-2/5 h-[80vh] p-8 items-center justify-between rounded-lg"
                    >
                        <ImagesPanel
                            imageFiles={imageFiles}
                            imageUrls={imageUrls}
                            onAddImage={addImage}
                            removeImageFile={removeImageFile}
                            removeImageUrl={removeImageUrl}
                            reorderImageFiles={reorderImageFiles}
                            reorderImageUrls={reorderImageUrls}
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col bg-gray-800 shadow-lg border border-primary-200 w-full h-auto p-8 items-center justify-between rounded-lg"
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
        </ >
    );
}