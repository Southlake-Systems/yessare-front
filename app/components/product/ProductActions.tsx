// components/product/ProductActions.tsx
type Props = {
  product: any;
};

export default function ProductActions({ product }: Props) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button className="bg-black text-white px-5 py-2 rounded">
        Buy now
      </button>

      <button className="bg-gray-900 text-white px-5 py-2 rounded">
        Add to cart
      </button>

      <button className="text-xl">♡</button>
    </div>
  );
}