import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  distance?: string;
  duration?: string;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    delay = 0,
    distance = "50px",
    duration = "0.8s",
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state - visible but with animation ready
    element.style.opacity = "0";
    element.style.transform = `translateY(${distance})`;
    element.style.transition = `opacity ${duration} ease-out ${delay}s, transform ${duration} ease-out ${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            // Once visible, we can stop observing
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, delay, distance, duration]);

  return { ref: elementRef, isVisible };
};
