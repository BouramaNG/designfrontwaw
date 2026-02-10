// hooks/useDeviceOptimization.ts
// Hook universal pour détecter le device et optimiser les animations

import { useState, useEffect } from 'react';

export const useDeviceOptimization = () => {
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    
    // Détection Safari desktop (macOS)
    const isSafariMac = /safari/i.test(ua) && !/chrome|crios|fxios|edge|opr/i.test(ua) && /macintosh|macintel|macos/i.test(ua);
    // Détection Safari/WebKit sur iOS
    const isIosSafari = /iphone|ipad|ipod/i.test(ua) && /webkit/i.test(ua);
    // Détection mobile général
    const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    
    setIsSafari(isSafariMac || isIosSafari);
    setIsMobile(isMobileDevice);
  }, []);

  // Configuration optimisée des animations
  const transitionConfig = {
    main: isSafari || isMobile
      ? { duration: 0.25 }
      : { duration: 0.3 },
    element: isSafari || isMobile
      ? { duration: 0.2 }
      : { duration: 0.3 },
    fast: isSafari || isMobile
      ? { duration: 0.15 }
      : { duration: 0.2 },
    slow: isSafari || isMobile
      ? { duration: 0.4 }
      : { duration: 0.5 },
    delay: {
      xs: (isSafari || isMobile) ? 0 : 0.05,
      sm: (isSafari || isMobile) ? 0.02 : 0.1,
      md: (isSafari || isMobile) ? 0.05 : 0.15,
      lg: (isSafari || isMobile) ? 0.08 : 0.2,
    }
  };

  return {
    isSafari,
    isMobile,
    shouldDisableComplexAnimations: isSafari || isMobile,
    transitionConfig,
  };
};

export default useDeviceOptimization;
