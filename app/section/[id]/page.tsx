import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import { getSectionProducts } from "@/lib/api";
import Link from "next/link";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const section = await getSectionProducts(id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">

  <Link
    href="/shop"
    className="hover:text-primary transition-colors"
  >
    Home
  </Link>

  <span>/</span>

  <span className="text-gray-900 font-medium">
    {section.title}
  </span>

</nav>

          <p className="mt-2 text-gray-500">
            {section.products.length} Products
          </p>
        </div>

        <div className="grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6"
        >
          {section.products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}