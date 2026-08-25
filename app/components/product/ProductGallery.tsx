"use client"; // Required if using useState in Next.js App Router
import { useState } from "react";
import { BASE_URL } from "@/lib/api";

type Props = {
  product: {
    name: string;
    // The API returns either a single image path (string), an array of
    // image objects ({ id, url|original }), or nothing.
    image: string | { id?: number; url?: string; original?: string }[] | null;
  };
};

function resolveUrl(url: string) {
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

function getImageUrls(image: Props["product"]["image"]): string[] {
  if (!image) return [];
  if (typeof image === "string") return [resolveUrl(image)];
  return image
    .map((img) => img.url ?? img.original ?? "")
    .filter(Boolean)
    .map(resolveUrl);
}

export default function ProductGallery({ product }: Props) {
  const images = getImageUrls(product.image);

  // Use the first API image as the default
  const [selectedImage, setSelectedImage] = useState<string | null>(images[0] ?? null);

  // Fallback if no image is provided by API
  const placeholder = "https://via.placeholder.com/600x600?text=No+Image+Available";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3">
        {images.length > 0 ? (
          images.map((url) => (
            <button
              key={url}
              onClick={() => setSelectedImage(url)}
              className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === url ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img
                src={url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))
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