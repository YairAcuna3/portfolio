import { ProjectDetails } from "@/types";
import { useState } from "react";

export const useProjectDetails = (initialDetails?: ProjectDetails) => {
  const [details, setDetails] = useState<ProjectDetails>({
    name: initialDetails?.name || "",
    description: initialDetails?.description || "",
  });

  const setName = (name: string) => {
    setDetails((prev) => ({ ...prev, name }));
  };

  const setDescription = (description: string) => {
    setDetails((prev) => ({ ...prev, description }));
  };

  return { details, setName, setDescription };
};
