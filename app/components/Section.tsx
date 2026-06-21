import CategoryCard from "./CategoryCard";
import ProductCard from "./ProductCard";
import Link from "next/link";
type SectionProps = {
  sectionId: number;
  title: string;
  items: any[];
  type: "product";
};
export default function Section({ sectionId, title, items, type }: SectionProps) {
  return (
    <section className="w-full mx-auto px-4 md:px-12 py-10">


      <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <div className="h-1 w-12 bg-primary mt-2 rounded-full" />
        </div>

        <Link
          href={`/section/${sectionId}`}
          className="group flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-all"
        >
          VIEW ALL
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {items.map((item) => (
          <div
            key={item.id || item.name}
            className="h-full"
          >
            <ProductCard product={item} />

          </div>
        ))}
      </div>

    </section>
  );
}