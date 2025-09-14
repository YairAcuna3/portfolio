import { Breakpoint, breakpoints } from "@/types/breakpoint";
import { useEffect, useState } from "react";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, query]) => ({
      key: key as Breakpoint,
      mql: window.matchMedia(query),
    }));

    function updateBreakpoint() {
      for (const { key, mql } of mediaQueries) {
        if (mql.matches) {
          setBreakpoint(key);
          return;
        }
      }
      setBreakpoint("2xl");
    }

    updateBreakpoint();

    mediaQueries.forEach(({ mql }) =>
      mql.addEventListener("change", updateBreakpoint)
    );

    return () => {
      mediaQueries.forEach(({ mql }) =>
        mql.removeEventListener("change", updateBreakpoint)
      );
    };
  }, []);

  return breakpoint;
}
