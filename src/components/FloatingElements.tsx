import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Large Floating Green Bubbles */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-primary/20 animate-float-slow" />
      <div className="absolute top-[60%] right-[8%] w-40 h-40 rounded-full bg-secondary/20 animate-float-slower" />
      <div className="absolute bottom-[20%] left-[15%] w-36 h-36 rounded-full bg-accent-premium/20 animate-float" />

      {/* Medium Bubbles */}
      <div className="absolute top-[30%] right-[20%] w-24 h-24 rounded-full bg-primary/15 animate-float-reverse" />
      <div className="absolute bottom-[40%] left-[25%] w-28 h-28 rounded-full bg-secondary/15 animate-float-slow" />
      <div className="absolute top-[75%] right-[30%] w-20 h-20 rounded-full bg-accent-premium/15 animate-float-slower" />

      {/* Small Bubbles */}
      <div className="absolute top-[45%] left-[35%] w-12 h-12 rounded-full bg-primary/25 animate-pulse" />
      <div className="absolute bottom-[55%] right-[15%] w-16 h-16 rounded-full bg-secondary/25 animate-pulse-slow" />
      <div className="absolute top-[20%] left-[45%] w-10 h-10 rounded-full bg-accent-premium/25 animate-float" />
      <div className="absolute bottom-[30%] right-[40%] w-16 h-16 rounded-full bg-primary/25 animate-float-reverse" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-primary/15 to-transparent blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-l from-secondary/15 to-transparent blur-3xl animate-float-slower" />
    </div>
  );
};

export default FloatingElements;
