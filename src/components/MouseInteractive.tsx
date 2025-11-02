import { useEffect, useState, useRef } from "react";

const MouseInteractive = () => {
  const [bubbles, setBubbles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize bubbles
    const initialBubbles = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      delay: i * 0.5,
    }));
    setBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      mousePosition.current = { x, y };

      // Update bubbles to follow mouse with parallax effect
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble, i) => {
          const speed = 0.05 + (i % 3) * 0.02;
          const dx = x - bubble.x;
          const dy = y - bubble.y;
          
          return {
            ...bubble,
            x: bubble.x + dx * speed,
            y: bubble.y + dy * speed,
          };
        })
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full backdrop-blur-sm transition-all duration-1000 ease-out"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: `hsl(var(--primary) / ${0.15 + (index % 3) * 0.05})`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default MouseInteractive;