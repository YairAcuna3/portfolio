import { updateLinksForProject } from "@/actions/link/updateLinksForProject";
import { updateProject } from "@/actions/project/updateProject";
import { CreateProjectHandlerProps } from "@/types";
import { useRouter } from "next/navigation";

type UpdateProjectProps = CreateProjectHandlerProps & {
  id: string;
  router: ReturnType<typeof useRouter>;
};

export const updateProjectHandler = async (
  e: React.FormEvent,
  {
    projectTechs,
    imageFiles,
    links,
    setIsLoading,
    setIsGreatAlert,
    details,
    id,
    router,
  }: UpdateProjectProps
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const name = details.name;
    const description = details.description || "";

    const projectUpdated = await updateProject({ id, name, description });
    if (!projectUpdated.data) {
      throw new Error("The data of the project doesn't exist!");
    }
    const updatedData = projectUpdated.data;

    // Todo: Actualizar las tecnologías
    // if (projectTechs.length > 0) {
    //   const technologyIds = projectTechs.map((tech: OnlyTechnology) => tech.id);
    //   const result = await addTechnologiesToProject({
    //     projectId: createdData.id,
    //     technologyIds,
    //   });
    //   if (!result.success) {
    //     throw new Error(result.error || "Error saving technologies in DB");
    //   }
    // }

    // TODO: Un delete/upload de la imágenes + edit imágenes
    // if (imageFiles.length > 0) {
    //   const uploadResults = await Promise.all(
    //     imageFiles.map((file: File) =>
    //       uploadImage(file, `portfolio/${createdData.name}`)
    //     )
    //   );
    //   const urls: string[] = [];
    //   for (const result of uploadResults) {
    //     if (result.success) {
    //       const data = result.data as UploadApiResponse;
    //       urls.push(data.secure_url);
    //     } else {
    //       console.error("Error uploading image:", result.error);
    //       throw new Error("Error uploading some image to Cloudinary");
    //     }
    //   }

    //   if (urls.length > 0) {
    //     const imagesCreated = await createImages({
    //       projectId: createdData.id,
    //       urls,
    //     });
    //     if (!imagesCreated.success) {
    //       throw new Error(imagesCreated.error || "Error saving images in DB");
    //     }
    //   }
    // }

    const linksResult = await updateLinksForProject(updatedData.id, links);
    if (!linksResult.success) {
      throw new Error(linksResult.error || "Error saving links in DB");
    }

    router.replace(`/projects/${updatedData.slug}/edit`);
    setIsLoading(false);
    //setIsGreatAlert(true);
  } catch (error) {
    console.error("The project cannot be uploaded :(", error);
    setIsLoading(false);
  }
};
