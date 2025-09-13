import { createImages, uploadImage } from "@/actions/image";
import { createLinksForProject } from "@/actions/link/createLinksForProject";
import { createProject } from "@/actions/project";
import { addTechnologiesToProject } from "@/actions/technology/addTechsToProject";
import { CreateProjectHandlerProps, OnlyTechnology } from "@/types";
import { UploadApiResponse } from "cloudinary";

export const createProjectHandler = async (
  e: React.FormEvent,
  {
    projectTechs,
    imageFiles,
    links,
    setIsLoading,
    setIsGreatAlert,
    details,
  }: CreateProjectHandlerProps
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const name = details.name;
    const description = details.description || "";
    const type = details.type || "";
    const madeFor = details.madeFor || "";
    const startAt = details.startAt || null;

    const projectCreated = await createProject({
      name,
      description,
      type,
      madeFor,
      startAt,
    });
    if (!projectCreated.data) {
      throw new Error("The data of the project doesn't exist!");
    }
    const createdData = projectCreated.data;

    if (projectTechs.length > 0) {
      const technologyIds = projectTechs.map((tech: OnlyTechnology) => tech.id);
      const result = await addTechnologiesToProject({
        projectId: createdData.id,
        technologyIds,
      });
      if (!result.success) {
        throw new Error(result.error || "Error saving technologies in DB");
      }
    }

    if (imageFiles.length > 0) {
      const uploadResults = await Promise.all(
        imageFiles.map((file: File) =>
          uploadImage(file, `portfolio/${createdData.id}`)
        )
      );
      const urls: string[] = [];
      for (const result of uploadResults) {
        if (result.success) {
          const data = result.data as UploadApiResponse;
          urls.push(data.secure_url);
        } else {
          console.error("Error uploading image:", result.error);
          throw new Error("Error uploading some image to Cloudinary");
        }
      }

      if (urls.length > 0) {
        const imagesCreated = await createImages({
          projectId: createdData.id,
          urls,
        });
        if (!imagesCreated.success) {
          throw new Error(imagesCreated.error || "Error saving images in DB");
        }
      }
    }

    if (links.length > 0) {
      const linksResult = await createLinksForProject(createdData.id, links);
      if (!linksResult.success) {
        throw new Error(linksResult.error || "Error saving links in DB");
      }
    }

    setIsLoading(false);
    {
      setIsGreatAlert && setIsGreatAlert(true);
    }
  } catch (error) {
    console.error("The project cannot be created :(", error);
    setIsLoading(false);
  }
};
