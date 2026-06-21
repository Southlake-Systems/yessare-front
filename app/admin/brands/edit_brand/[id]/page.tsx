import { getBrand } from "@/lib/api";
import EditBrandForm from "@/app/components/brand/EditBrandForm";
export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const brand = await getBrand(id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Edit Brand
      </h1>

      <EditBrandForm brand={brand} />
    </div>
  );
}