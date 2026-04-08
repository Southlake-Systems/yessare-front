import Image from "next/image";
import Link from "next/link";


type Props = {
  product: {
    name: string;
    price: string;
  };
};

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/product/${product.id}`}> 
    
        <div className="group bg-white border rounded-xl p-3 hover:shadow-lg transition cursor-pointer">

      {/* Image */}
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
        <span className="text-xs text-gray-400">Image</span>
      </div>

      {/* Name */}
      <h3 className="mt-3 text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#0f4c81]">
        {product.name}
      </h3>

      {/* Price */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-green-600 font-semibold text-base">
          ₹{product.price}
        </span>
        {product.originalPrice && (
          <span className="text-gray-400 line-through text-xs">
            ₹{product.originalPrice}
          </span>
        )}
      </div>

      {/* CTA */}
        <button className="mt-3 w-full border border-[#0f4c81] text-[#0f4c81] text-sm py-1.5 rounded-md 
                          bg-white 
                          opacity-0 group-hover:opacity-100
                          hover:bg-[#0f4c81] hover:text-white 
                          hover:shadow-md hover:scale-[1.02]
                          transition-all duration-200">
          Add to Cart
        </button>
    </div>
    
    
    
    </Link>


  );
}