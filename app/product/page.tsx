import { getAllProducts } from "@/lib/api";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

// 1. Updated type to reflect that searchParams is a Promise
export default async function ShopPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  // 2. Await the searchParams before using them
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  
  const data = await getAllProducts(currentPage);
  
  const products = data.results || [];
  const hasNext = !!data.next;
  const hasPrev = !!data.previous;

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black mb-8">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </div>

    
      <div className="mt-16 flex items-center justify-center gap-4">
        <Link
          href={`/product?page=${Math.max(1, currentPage - 1)}`}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            !hasPrev 
              ? "bg-gray-100 text-gray-400 pointer-events-none" 
              : "bg-white border border-gray-200 text-black hover:bg-gray-50 shadow-sm"
          }`}
        >
          Previous
        </Link>

        <span className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
          Page {currentPage}
        </span>

        <Link
          href={`/product?page=${currentPage + 1}`}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            !hasNext 
              ? "bg-gray-100 text-gray-400 pointer-events-none" 
              : "bg-yellow-400 text-black hover:bg-yellow-500 shadow-md"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}