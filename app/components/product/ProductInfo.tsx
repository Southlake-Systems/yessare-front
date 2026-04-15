// components/product/ProductInfo.tsx
type Props = {
  name: string;
  price: number;
  description: string;
};

export default function ProductInfo({ name, price, description }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
        {name}
      </h1>

      <div className="text-yellow-500 text-sm sm:text-lg">★★★★☆</div>

      <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
        ₹{price}
      </p>

      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}