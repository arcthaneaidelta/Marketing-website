import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration: number = 2000, startOnInView: boolean = true, isInView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnInView || (startOnInView && isInView && !hasAnimated)) {
      setHasAnimated(true);
      
      let startTime: number | null = null;
      
      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(ease * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [end, duration, isInView, startOnInView, hasAnimated]);

  return count;
}
