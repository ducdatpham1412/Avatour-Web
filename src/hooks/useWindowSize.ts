import { useEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    // We have to set global?.window to avoid build prod error, when building, window is undefined
    width: (global as any)?.window ? window.innerWidth : 0,
    height: (global as any)?.window ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowSize]);

  return windowSize;
};

export default useWindowSize;
