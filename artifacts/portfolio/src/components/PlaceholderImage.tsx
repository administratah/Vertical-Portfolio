import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
}

export function PlaceholderImage({ 
  label = "IMAGE PLACEHOLDER", 
  className,
  aspectRatio = "video" 
}: PlaceholderImageProps) {
  
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]"
  };

  return (
    <div 
      className={cn(
        "bg-[#111111] border border-white/5 flex items-center justify-center overflow-hidden relative group",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Subtle grain/noise effect overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/20 font-medium z-10 group-hover:text-white/40 transition-colors duration-500">
        {label}
      </span>
    </div>
  );
}
