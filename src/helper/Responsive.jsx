import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Log the initial value
    console.log("isMobile:", mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // useEffect(() => {
  //   console.log("isMobile state changed:", isMobile);
  // }, [isMobile]);

  return isMobile;
};

export default useResponsive;
