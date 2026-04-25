"use client"; // Required if using useState in Next.js App Router
import { useState } from "react";

type Props = {
  product: {
    name: string;
    image: string | null;
    // Add other fields if needed for the gallery
  };
};

export default function ProductGallery({ product }: Props) {
  // Use the API image as the default
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Fallback if no image is provided by API
  const placeholder = "https://via.placeholder.com/600x600?text=No+Image+Available";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* Thumbnails - Currently showing API image + placeholders */}
      <div className="flex md:flex-col gap-3">
        {product.image ? (
          <button
            onClick={() => setSelectedImage(product.image)}
            className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
              selectedImage === product.image ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <img 
              src={product.image} 
              alt="Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </button>
        ) : (
          <div className="text-gray-400 text-[10px] text-center w-16">No Thumbs</div>
        )}
      </div>

      {/* Main Image Viewport */}
      <div className="flex-1 relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden group">
        <img
          src={selectedImage || placeholder}
          alt={product.name}
          className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quality Badge (Optional) */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 shadow-sm">
          Premium Quality
        </div>
      </div>
    </div>
  );
}