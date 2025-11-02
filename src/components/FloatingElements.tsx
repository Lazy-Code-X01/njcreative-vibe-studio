import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large Floating Green Bubbles */}
      <div className="absolute top-[15%] left-[10%] w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm animate-float-slow" />
      <div className="absolute top-[60%] right-[8%] w-32 h-32 rounded-full bg-secondary/15 backdrop-blur-sm animate-float-slower" />
      <div className="absolute bottom-[20%] left-[15%] w-28 h-28 rounded-full bg-accent-premium/20 backdrop-blur-sm animate-float" />
      
      {/* Medium Bubbles */}
      <div className="absolute top-[30%] right-[20%] w-16 h-16 rounded-full bg-primary/15 backdrop-blur-sm animate-float-reverse" />
      <div className="absolute bottom-[40%] left-[25%] w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm animate-float-slow" />
      <div className="absolute top-[75%] right-[30%] w-14 h-14 rounded-full bg-accent-premium/15 backdrop-blur-sm animate-float-slower" />
      
      {/* Small Bubbles */}
      <div className="absolute top-[45%] left-[35%] w-8 h-8 rounded-full bg-primary/25 backdrop-blur-sm animate-pulse" />
      <div className="absolute bottom-[55%] right-[15%] w-10 h-10 rounded-full bg-secondary/25 backdrop-blur-sm animate-pulse-slow" />
      <div className="absolute top-[20%] left-[45%] w-6 h-6 rounded-full bg-accent-premium/30 backdrop-blur-sm animate-float" />
      <div className="absolute bottom-[30%] right-[40%] w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm animate-float-reverse" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-secondary/10 to-transparent blur-3xl animate-float-slower" />
    </div>
  );
};

export default FloatingElements;
