import { useEffect, useState } from 'react';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleWindowWidth = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleWindowWidth);
    handleWindowWidth();

    return () => window.removeEventListener('resize', handleWindowWidth);
  }, []);

  return windowWidth;
}

export default useWindowWidth;
