import React, { useState, useEffect } from 'react';

export default function useBreakpoint() {
  const [isMobile, setIsMoblie] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMoblie(screenWidth < 501);
      setIsDesktop(screenWidth >= 501);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  return {isMobile, isDesktop};
}
