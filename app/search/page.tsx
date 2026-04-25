import { searchProducts } from "@/lib/api";
import ProductCard from "@/app/components/ProductCard"; 

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  const data = await searchProducts(query);
  const products = data.results || [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">
        Search Results for "{query}"
      </h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found matching your search.</p>
        </div>
      )}
    </main>
  );
}