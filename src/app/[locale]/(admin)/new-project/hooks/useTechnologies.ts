import { useState } from "react";
import { OnlyTechnology } from "@/types/technology";

export const useTechnologies = (initialTechnologies: OnlyTechnology[] = []) => {
  const [projectTechs, setProjectTechs] =
    useState<OnlyTechnology[]>(initialTechnologies);

  const addTechnology = (tech: OnlyTechnology) => {
    setProjectTechs((prev) =>
      prev.some((t) => t.name === tech.name) ? prev : [...prev, tech]
    );
  };

  const removeTechnology = (techName: string) => {
    setProjectTechs((prev) => prev.filter((t) => t.name !== techName));
  };

  return { projectTechs, addTechnology, removeTechnology };
};
