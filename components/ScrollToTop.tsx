import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // If there is a hash (e.g. #details), find the element and scroll to it
      if (hash) {
        // We use a small timeout to ensure the new page content has rendered before trying to find the ID
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      } else {
        // If no hash, just scroll to top instantly (standard navigation)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    handleScroll();
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;