import { useState } from "react";
import { OnlyLink } from "@/types/link";

export const useLinks = (projectLinks: OnlyLink[] = []) => {
  const [links, setLinks] = useState<OnlyLink[]>(projectLinks);

  const addLink = (link: OnlyLink) => {
    setLinks((prev) =>
      prev.some((t) => t.url === link.url) ? prev : [...prev, link]
    );
  };

  const removeLink = (linkUrl: string) => {
    setLinks((prev) => prev.filter((t) => t.url !== linkUrl));
  };

  return { links, addLink, removeLink };
};
