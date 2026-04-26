import BrandCard from "./BrandCard";

type Brand = {
  id: number;
  name: string;
  image_original: string | null;
  description: string | null;
  favourite: boolean;
};

export default function BrandSection({ brands }: { brands: Brand[] }) {
  // Double the brands to create the infinite loop effect
  const displayBrands = [...brands, ...brands];

  return (
    <section className="px-4 md:px-12 py-8 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Leading Brands
        </h2>
        <div className="h-1 w-12 bg-blue-600 mt-1 rounded-full" />
      </div>

      {/* Scrolling Container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
          {displayBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="mx-6 w-40 flex-shrink-0">
               <BrandCard brand={brand} />
            </div>
          ))}
        </div>

        {/* Optional Gradient Overlays for a "fade" effect on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}