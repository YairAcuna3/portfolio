export const breakpoints = {
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
};

export type Breakpoint = keyof typeof breakpoints | "2xl" | "base";
