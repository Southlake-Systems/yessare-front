"use client";

import Image from "next/image";
import Link from "next/link";
import { IconShoppingCartPlus } from "@tabler/icons-react";

type Product = {
  id: string;
  name: string;
  price?: number | null;
  originalPrice?: number | null;
  image?: string | null;
  brand?: string;
};

export default function ProductCard({ product }: { product: Product }) {

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

  };
 
  const price = product.price ?? 0;
  console.log(product.image);
  // ✅ safe discount
  const discount =
    product.originalPrice && price > 0
      ? Math.round(
        ((product.originalPrice - price) / product.originalPrice) * 100
      )
      : null;

  return (

    <div className="relative bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
      
      {/* ✅ FIXED Discount */}
      {discount !== null && discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square bg-[#f9fafb] rounded-xl flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-300 italic text-sm">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        {product.brand && (
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {product.brand}
          </p>
        )}

        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 pt-1">
          {price > 0 ? (
            <span className="text-xs md:text-xl font-black text-gray-900">
              ₹{price.toLocaleString()}
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              Price on request
            </span>
          )}

          {product.originalPrice && price > 0 && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-bold py-3 rounded-xl
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     hover:bg-primary transition-all duration-300"
      >
        <IconShoppingCartPlus size={16} />
        ADD TO CART
      </button>
    </div>
  );
}