import ProductCard from "../ProductCard";

type Product = {
  id: string | number;
  name: string;
  price?: number | null;
  originalPrice?: number | null;
  image?: string | null;
  brand?: string;
};

export default function RelatedProducts({ items }: { items: Product[] }) {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg">
      <h2 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6">
        Related Product
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}