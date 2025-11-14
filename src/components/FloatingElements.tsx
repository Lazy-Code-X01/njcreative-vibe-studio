import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Large floating orbs - reduced size & smoother movement */}
      <div className="absolute top-[12%] left-[8%] w-20 h-20 rounded-full bg-primary/30 mix-blend-lighten blur-sm transform-gpu animate-float-slower" />
      <div className="absolute top-[60%] right-[6%] w-28 h-28 rounded-full bg-secondary/30 mix-blend-lighten blur-sm transform-gpu animate-float-slower" />
      <div className="absolute bottom-[18%] left-[14%] w-24 h-24 rounded-full bg-accent-premium/28 mix-blend-lighten blur-sm transform-gpu animate-float-slower" />

      {/* Medium bubbles - subtle */}
      <div className="absolute top-[32%] right-[18%] w-16 h-16 rounded-full bg-primary/22 mix-blend-lighten transform-gpu animate-float-reverse" />
      <div className="absolute bottom-[42%] left-[22%] w-20 h-20 rounded-full bg-secondary/22 mix-blend-lighten transform-gpu animate-float-slower" />
      <div className="absolute top-[74%] right-[28%] w-14 h-14 rounded-full bg-accent-premium/20 mix-blend-lighten transform-gpu animate-float-slower" />

      {/* Small sparkles */}
      <div className="absolute top-[44%] left-[34%] w-8 h-8 rounded-full bg-primary/40 mix-blend-screen transform-gpu animate-pulse" />
      <div className="absolute bottom-[54%] right-[14%] w-12 h-12 rounded-full bg-secondary/38 mix-blend-screen transform-gpu animate-pulse-slow" />
      <div className="absolute top-[18%] left-[46%] w-6 h-6 rounded-full bg-accent-premium/40 mix-blend-screen transform-gpu animate-float-slower" />

      {/* Gradient background orbs - smaller and softer */}
      <div className="absolute top-1/4 -left-24 w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-primary/25 to-transparent blur-3xl mix-blend-lighten animate-float-slower" />
      <div className="absolute bottom-1/4 -right-24 w-[20rem] h-[20rem] rounded-full bg-gradient-to-l from-secondary/25 to-transparent blur-3xl mix-blend-lighten animate-float-slower" />
    </div>
  );
};

export default FloatingElements;
