import { createImages, uploadImage, reorderImages } from "@/actions/image";
import { updateLinksForProject } from "@/actions/link/updateLinksForProject";
import { updateProject } from "@/actions/project/updateProject";
import { updateTechnologiesOfProject } from "@/actions/technology/updateTechsOfProject";
import { CreateProjectHandlerProps, OnlyTechnology, OnlyImage } from "@/types";
import { UploadApiResponse } from "cloudinary";

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
      const uploadResults = await Promise.all(
        imageFiles.map((file: File) =>
          uploadImage(file, `portfolio/${updatedData.id}`),
        ),
      );

      const urls: string[] = [];
      const failedUploads: string[] = [];

      for (const result of uploadResults) {
        if (result.success) {
          const data = result.data as UploadApiResponse;
          urls.push(data.secure_url);
        } else {
          console.error("Error uploading image:", result.error);
          failedUploads.push(result.error || "Unknown error");
        }
      }

      if (failedUploads.length > 0) {
        throw new Error(
          `Failed to upload ${failedUploads.length} images: ${failedUploads.join(", ")}`,
        );
      }

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
