import { iconLinkMap } from "@/utils/iconLinkMap";
import { iconTechMap } from "@/utils/iconTechMap";

export type IconProps = {
  size?: number;
  lightColor?: string;
  darkColor?: string;
  className?: string;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
};

export type IconMapTechsKeys = keyof typeof iconTechMap;
export type IconMapLinksKeys = keyof typeof iconLinkMap;
