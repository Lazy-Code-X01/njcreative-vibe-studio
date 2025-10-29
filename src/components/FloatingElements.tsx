import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-[#556B2F]/10 to-transparent blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-[#8B9556]/10 to-transparent blur-3xl animate-float-slower" />

      {/* Floating Elements */}
      <div className="absolute top-1/3 right-1/4 w-34 h-4 rounded-full border border-[#556B2F]/20 animate-float opacity-50" />
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full border border-[#8B9556]/20 animate-float-reverse opacity-50" />

      {/* Small Dots */}
      <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-[#6B8E23]/20 animate-pulse" />
      <div className="absolute bottom-1/2 right-1/3 w-3 h-3 rounded-full bg-[#556B2F]/20 animate-pulse-slow" />

      {/* Geometric Shapes */}
      <div className="absolute top-1/4 right-1/3 w-16 h-16 rotate-45 border border-[#8B9556]/10 animate-float-slow opacity-30" />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rotate-12 border border-[#556B2F]/10 animate-float-slower opacity-30" />
      {/* Geometric Shapes */}
      <div className="absolute top-1/4 right-1/3 w-16 h-16 rotate-45 border border-[#8B9556]/10 animate-float-slow opacity-30" />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rotate-12 border border-[#556B2F]/10 animate-float-slower opacity-30" />
    </div>
  );
};

export default FloatingElements;
