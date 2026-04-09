import { IconHammer } from "@tabler/icons-react"; 
type CategoryCardProps = {
  name: string;
  image?: string; 
  count?: number; 
};

export default function CategoryCard({ name, image, count = 120 }: CategoryCardProps) {
  return (
    <div className="group relative border border-gray-100 rounded-2xl p-4 bg-white hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 cursor-pointer overflow-hidden">
      
      {/* Image Container with Hover Zoom */}
      <div className="relative w-full h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <IconHammer className="w-12 h-12 text-gray-300 group-hover:text-primary/40 transition-colors" />
        )}
        
        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Text Content */}
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-primary transition-colors tracking-tight">
          {name}
        </h3>
        
        {/* Secondary Info (Optional but adds "pro" feel) */}
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          {count}+ Products
        </p>
      </div>

      {/* Decorative Accent (appears on hover) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}