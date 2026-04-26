import { getProduct } from "@/lib/api"; 
import ProductGallery from "@/app/components/product/ProductGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import ProductActions from "@/app/components/product/ProductActions";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-bold">Product # {slug} not found in Database</h1>
        <Link href="/product" className="text-yellow-600 underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] antialiased">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <span className="font-medium text-black">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ProductGallery product={product} />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ProductInfo 
              name={product.name} 
              // Convert strings from Django to Numbers for TypeScript
              price={Number(product.price?.selling_price ?? 0)} 
              originalPrice={Number(product.price?.mrp ?? 0)}
              description={product.description} 
              brand={product.brand?.name}
            />
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}