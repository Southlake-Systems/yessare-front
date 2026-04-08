// app/product/[slug]/page.tsx
// import ProductGallery from "@/components/product/ProductGallery";
import ProductGallery from "@/app/components/product/ProductGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import ProductActions from "@/app/components/product/ProductActions";
import ProductDetails from "@/app/components/product/ProductDetails";
import RelatedProducts from "@/app/components/product/RelatedProducts";
import { products } from "@/data/product";

export default function Page() {
  const product = products[0];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 
                        grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

          <ProductGallery />

          <div className="flex flex-col justify-center">
            <ProductInfo
              name={product.name}
              price={product.price}
              description={product.description}
            />

            <ProductActions />
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 sm:mt-10">
          <ProductDetails description={product.description} />
        </div>

        {/* Related */}
        <div className="mt-8 sm:mt-10">
          <RelatedProducts items={products.slice(1)} />
        </div>

      </div>
    </div>
  );
}