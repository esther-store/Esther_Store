
import React, { useEffect, useState } from "react";


export default function useWindowSize(minOrMax,value) {
  const isSSR = typeof window !== "undefined";
  const [matches, setMatches] = useState(
    isSSR ? false : window.matchMedia(`(${minOrMax}-width: ${value}px)`).matches
  );

  function handleMediaQueryChange(event) {
    setMatches(event.matches);
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(${minOrMax}-width: ${value}px)`);

    handleMediaQueryChange(mediaQueryList);

    const mediaQueryListener = (event) => handleMediaQueryChange(event);
    mediaQueryList.addEventListener("change", mediaQueryListener);

    return () => {
      mediaQueryList.removeEventListener("change", mediaQueryListener);
    };
  }, [minOrMax, value]);

  return matches;
}
