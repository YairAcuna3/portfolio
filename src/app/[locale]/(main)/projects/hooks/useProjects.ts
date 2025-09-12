import { ShowProject, OnlyTechnology } from "@/types";
import { useMemo } from "react";

export const useProjects = (
  term: string,
  projects: ShowProject[],
  selectedTechs: OnlyTechnology[] = []
) => {
  const showProjects = useMemo(() => {
    let filtered = projects;

    if (term) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(term.toLowerCase()) ||
          project.description?.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (selectedTechs.length > 0) {
      filtered = filtered
        .map((project) => {
          const projectTechIds = new Set(project.technologies.map((t) => t.id));
          const matchCount = selectedTechs.filter((st) =>
            projectTechIds.has(st.id)
          ).length;
          return { project, matchCount };
        })
        .filter(({ matchCount }) => matchCount > 0)
        .sort((a, b) => {
          if (
            a.matchCount === selectedTechs.length &&
            b.matchCount !== selectedTechs.length
          )
            return -1;
          if (
            b.matchCount === selectedTechs.length &&
            a.matchCount !== selectedTechs.length
          )
            return 1;
          return b.matchCount - a.matchCount;
        })
        .map(({ project }) => project);
    }

    return filtered;
  }, [term, projects, selectedTechs]);

  return { showProjects };
};
