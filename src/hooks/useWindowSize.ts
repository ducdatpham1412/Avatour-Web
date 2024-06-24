import { useEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', e => {
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
