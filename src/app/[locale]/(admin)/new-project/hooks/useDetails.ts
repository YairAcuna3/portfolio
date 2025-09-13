import { ProjectDetails } from "@/types";
import { useState } from "react";

export const useProjectDetails = (initialDetails?: ProjectDetails) => {
  const [details, setDetails] = useState<ProjectDetails>({
    name: initialDetails?.name || "",
    description: initialDetails?.description || "",
    type: initialDetails?.type || "",
    madeFor: initialDetails?.madeFor || "",
    startAt: initialDetails?.startAt || null,
  });

  const setName = (name: string) => {
    setDetails((prev) => ({ ...prev, name }));
  };

  const setDescription = (description: string) => {
    setDetails((prev) => ({ ...prev, description }));
  };

  const setType = (type: string) => {
    setDetails((prev) => ({ ...prev, type }));
  };

  const setMadeFor = (madeFor: string) => {
    setDetails((prev) => ({ ...prev, madeFor }));
  };

  const setStartAt = (startAt: Date | null) => {
    setDetails((prev) => ({ ...prev, startAt }));
  };

  return {
    details,
    setName,
    setDescription,
    setType,
    setMadeFor,
    setStartAt,
  };
};
