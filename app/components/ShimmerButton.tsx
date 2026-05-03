import Link from "next/link";
import React from "react";

interface ShimmerButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
  shimmerColor?: string;
}

export function ShimmerButton({
  children,
  href,
  className = "",
  background = "#ffffff",
  shimmerColor = "rgba(74, 107, 72, 0.4)",
}: ShimmerButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ backgroundColor: background }}
    >
      <span 
        className="absolute top-1/2 left-1/2 w-[250%] aspect-square -z-20 origin-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 320deg, ${shimmerColor} 360deg)`,
          animation: 'shimmer-spin 2.5s linear infinite',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <span 
        className="absolute inset-[2px] rounded-[1.4rem] md:rounded-full -z-10 transition-colors" 
        style={{ backgroundColor: background }}
      />
      <span className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </span>
    </Link>
  );
}
