"use client";

import Image from "next/image";
import Link from "next/link";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { BASE_URL } from "@/lib/api";
type Product = {
  id: string | number;
  name: string;
  price?: number | null;
  originalPrice?: number | null;
  image?: string | null;
  brand?: string;
};

export default function ProductCard({ product }: { product: Product }) {

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the Link from triggering when clicking the button
    e.stopPropagation();
    console.log("Added to cart:", product.id);
  };

  const price = product.price ?? 0;

  // Handle the image path safely
  const imageUrl = product.image 
    ? (product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`)
    : "/placeholder.png";

  const discount =
    product.originalPrice && price > 0
      ? Math.round(((product.originalPrice - price) / product.originalPrice) * 100)
      : null;

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group relative bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 flex flex-col h-full"
    >
      {discount !== null && discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square bg-[#f9fafb] rounded-xl flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={imageUrl}
            alt={product.name}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="text-gray-300 italic text-sm">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1 flex-grow">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 pt-1">
          {price > 0 ? (
            <span className="text-lg md:text-xl font-black text-gray-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Price on request</span>
          )}

          {product.originalPrice && product.originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-bold py-3 rounded-xl
                     md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-md"
      >
        <IconShoppingCartPlus size={16} />
        ADD TO CART
      </button>
    </Link>
  );
}