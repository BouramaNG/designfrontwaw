import { useEffect, useRef } from 'react';
import useDeviceOptimization from './useDeviceOptimization';
import '../styles/safari-animations.css';

/**
 * Hook to apply Safari-optimized CSS animations instead of Framer Motion
 * Completely disables JS-based animations on Safari and uses CSS @keyframes
 */
export const useSafariOptimizedAnimations = () => {
  const { isSafari } = useDeviceOptimization();
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Apply animation to element
  const animateFadeIn = (element: HTMLElement | null, withScale = false) => {
    if (!element || !isSafari) return;
    element.classList.add(withScale ? 'safari-animate-fade-in-scale' : 'safari-animate-fade-in');
    element.classList.add('safari-gpu-accelerate');
  };

  const animateSlideInLeft = (element: HTMLElement | null) => {
    if (!element || !isSafari) return;
    element.classList.add('safari-animate-slide-in-left');
    element.classList.add('safari-gpu-accelerate');
  };

  const animateSlideInRight = (element: HTMLElement | null) => {
    if (!element || !isSafari) return;
    element.classList.add('safari-animate-slide-in-right');
    element.classList.add('safari-gpu-accelerate');
  };

  const animateImageFade = (element: HTMLElement | null) => {
    if (!element || !isSafari) return;
    element.classList.add('safari-animate-image-fade');
    element.classList.add('safari-will-change-opacity');
  };

  // Remove animation class after completion
  const removeAnimation = (element: HTMLElement | null, className: string) => {
    if (!element) return;
    setTimeout(() => {
      element.classList.remove(className);
      element.classList.remove('safari-gpu-accelerate');
      element.classList.remove('safari-will-change-opacity');
    }, 500);
  };

  return {
    isSafari,
    animateFadeIn,
    animateSlideInLeft,
    animateSlideInRight,
    animateImageFade,
    removeAnimation,
    elementsRef,
  };
};

export default useSafariOptimizedAnimations;
