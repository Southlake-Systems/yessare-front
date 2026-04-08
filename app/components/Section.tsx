import CategoryCard from "./CategoryCard";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  items: any[];
  type: "category" | "product";
};

export default function Section({ title, items, type }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <span className="text-sm text-blue-600 cursor-pointer hover:underline">
          View all →
        </span>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {items.map((item, i) =>
            type === "category" ? (
              <CategoryCard key={i} name={item} />
            ) : (
              <ProductCard key={i} product={item} />
            )
          )}
        </div>
      </div>
    </div>
  );
}