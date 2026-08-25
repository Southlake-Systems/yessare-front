import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import { getBrand, getProductsByBrand } from "@/lib/api";
import Link from "next/link";

export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ brand_id: string }>;
}) {
  const { brand_id } = await params;

  const [brand, products] = await Promise.all([
    getBrand(brand_id),
    getProductsByBrand(Number(brand_id)),
  ]);

  const brandName = brand?.response?.name ?? brand?.name ?? "Brand";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/shop" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{brandName}</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {brandName}
          </h1>
          <p className="mt-2 text-gray-500">{products.length} Products</p>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found for this brand.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
