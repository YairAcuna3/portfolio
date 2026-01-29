import { createImages, reorderImages } from "@/actions/image";
import { updateLinksForProject } from "@/actions/link/updateLinksForProject";
import { updateProject } from "@/actions/project/updateProject";
import { updateTechnologiesOfProject } from "@/actions/technology/updateTechsOfProject";
import { CreateProjectHandlerProps, OnlyTechnology, OnlyImage } from "@/types";
import { uploadMultipleFiles } from "@/utils/uploadFile";

type UpdateProjectProps = CreateProjectHandlerProps & {
  id: string;
  currentImageUrls: OnlyImage[];
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
    currentImageUrls,
  }: UpdateProjectProps,
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const name = details.name;
    const description = details.description || "";
    const type = details.type || "";
    const madeFor = details.madeFor || "";
    const startAt = details.startAt || null;

    const projectUpdated = await updateProject({
      id,
      name,
      description,
      type,
      madeFor,
      startAt,
    });
    if (!projectUpdated.data) {
      throw new Error("The data of the project doesn't exist!");
    }
    const updatedData = projectUpdated.data;

    if (projectTechs.length > 0) {
      const technologyIds = projectTechs.map((tech: OnlyTechnology) => tech.id);
      const result = await updateTechnologiesOfProject({
        projectId: updatedData.id,
        technologyIds,
      });
      if (!result.success) {
        throw new Error(result.error || "Error updating technologies in DB");
      }
    }

    // Subir nuevas imágenes si las hay
    if (imageFiles.length > 0) {
      console.log(`Uploading ${imageFiles.length} new images...`);
      try {
        const urls = await uploadMultipleFiles(
          imageFiles,
          `portfolio/${updatedData.id}`,
        );

        if (urls.length > 0) {
          console.log(`Saving ${urls.length} new image URLs to database...`);
          const imagesCreated = await createImages({
            projectId: updatedData.id,
            urls,
            startOrder: currentImageUrls.length,
          });
          if (!imagesCreated.success) {
            throw new Error(imagesCreated.error || "Error saving images in DB");
          }
          console.log(`Successfully saved ${urls.length} new images`);
        }
      } catch (uploadError) {
        console.error("Error uploading images:", uploadError);
        throw new Error(
          `Failed to upload images: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`,
        );
      }
    }

    const linksResult = await updateLinksForProject(updatedData.id, links);
    if (!linksResult.success) {
      throw new Error(linksResult.error || "Error saving links in DB");
    }

    // Reorder existing images based on current order in imageUrls
    if (currentImageUrls.length > 0) {
      const imageIds = currentImageUrls.map((img) => img.id);
      await reorderImages({
        imageIds,
        projectId: updatedData.id,
      });
    }

    setIsLoading(false);
    if (setIsGreatAlert) {
      setIsGreatAlert(true);
    }
  } catch (error) {
    console.error("The project cannot be uploaded :(", error);
    setIsLoading(false);
  }
};
