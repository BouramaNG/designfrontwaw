import useDeviceOptimization from './useDeviceOptimization';

/**
 * Hook pour obtenir des valeurs de transition optimisées
 * Réduit les durées et délais sur Safari/iOS pour éviter le flickering
 */
export const useOptimizedTransition = () => {
  const { isSafari, isMobile } = useDeviceOptimization();
  
  const factor = isSafari ? 0.5 : 1;
  
  const optimize = (duration: number, delay: number = 0) => ({
    duration: duration * factor,
    delay: delay * factor,
  });
  
  // Transitions pré-configurées pour cas courants
  const transitions = {
    fast: { duration: isSafari ? 0.15 : 0.3 },
    normal: { duration: isSafari ? 0.35 : 0.6 },
    slow: { duration: isSafari ? 0.4 : 0.8 },
    verySlow: { duration: isSafari ? 0.5 : 1.0 },
    
    // Avec délai
    normalWithDelay: { duration: isSafari ? 0.35 : 0.6, delay: isSafari ? 0.05 : 0.1 },
    slowWithDelay: { duration: isSafari ? 0.4 : 0.8, delay: isSafari ? 0.1 : 0.2 },
  };

  return {
    optimize,
    transitions,
    isSafari,
    isMobile,
  };
};

export default useOptimizedTransition;
