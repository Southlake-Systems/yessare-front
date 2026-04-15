import { getBrands } from "@/lib/api";
import Image from "next/image";

export default async function BrandsPage() {
    const brands = await getBrands();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Brands</h1>

            {brands.length === 0 ? (
                <p>No brands found</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {brands.map((brand: any) => (
                        <div
                            key={brand.id}
                            className="border rounded-xl p-4 bg-white shadow-sm"
                        >
                            {brand.image ? (
                                <div className="relative h-24 w-full mb-3">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="h-24 w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="h-24 flex items-center justify-center bg-gray-100 mb-3 rounded">
                                    No Image
                                </div>
                            )}

                            <h2 className="font-semibold">{brand.name}</h2>
                            <p className="text-sm text-gray-500">
                                {brand.description || "No description"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}