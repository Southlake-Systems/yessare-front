type Brand = {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  favourite: boolean;
};

export default function BrandCard({ brand }: { brand: Brand }) {
  console.log(brand.image);
  return (
    <div className="group cursor-pointer">
      {/* Logo Container */}
      <div className="relative aspect-3/2 overflow-hidden rounded-xl border border-gray-100 bg-white  transition-all duration-300 ease-in-out group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/10">
        <div className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {brand.image ? (
            <img
              src={brand.image}
              alt={brand.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 uppercase tracking-widest text-gray-300 text-[10px] font-bold">
              {brand.name.substring(0, 2)}
            </div>
          )}
        </div>
      </div>

      {/* Brand Info */}
      <div className="mt-3 px-1 text-center">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {brand.name}
        </h3>
      </div>
    </div>
  );
}