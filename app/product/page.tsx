import { products } from "@/data/product";
import ProductCard from "@/app/components/ProductCard";


export default function ShopPage() {
  return (
    <div className="p-8 md:p-12">
      <h1 className="text-3xl font-black mb-8">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}