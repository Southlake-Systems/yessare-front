import { getProduct } from "@/lib/api";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <div className="space-y-4">
        {/* Name */}
        <input
          defaultValue={product.name}
          className="w-full border p-2 rounded"
        />

        {/* Price */}
        <input
          defaultValue={product.price?.selling_price}
          className="w-full border p-2 rounded"
        />

        {/* Brand */}
        <input
          defaultValue={product.brand?.name}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          defaultValue={product.description}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
}