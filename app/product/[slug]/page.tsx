import ProductGallery from "@/app/components/product/ProductGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import ProductActions from "@/app/components/product/ProductActions";
import ProductDetails from "@/app/components/product/ProductDetails";
import RelatedProducts from "@/app/components/product/RelatedProducts";
import { products } from "@/data/product";
import Link from "next/link";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Product not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
  
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="font-medium text-black truncate">{product.name}</span>
        </nav>

  
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <ProductGallery product={product} />
            </div>
          </div>

  
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
            <div className="flex flex-col">
              <ProductInfo
                name={product.name}
                price={product.price}
                description={product.description}
              />
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <ProductActions product={product} />
              </div>
              
       
              <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-medium uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  In Stock
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                  Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              Product Details
            </h2>
            <ProductDetails description={product.description} />
          </div>
        </div>

   
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also viewed
            </h2>
            <Link href="/" className="hidden sm:block text-sm font-semibold text-blue-600 hover:text-blue-500">
              View all <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          <RelatedProducts items={products.filter(p => p.id !== product.id)} />
        </div>

      </div>
    </main>
  );
}