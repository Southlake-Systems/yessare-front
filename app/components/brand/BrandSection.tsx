import BrandCard from "./BrandCard";

type Brand = {
  id: number;
  name: string;
  image_thumbnial: string | null;
  description: string | null;
  favourite: boolean;
};

export default function BrandSection({ brands }: { brands: Brand[] }) {
  
  return (
    <section className="px-4 md:px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Leading Brands
          </h2>
          <div className="h-1 w-12 bg-blue-600 mt-1 rounded-full" />
        </div>
        
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-all">
          View All 
          <span className="text-lg">→</span>
        </button>
      </div>

<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-6 items-center justify-center">        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  );
}