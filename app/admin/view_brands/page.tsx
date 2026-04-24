import { getBrands } from "@/lib/api";
import { Edit2, Trash2, Plus, ExternalLink } from "lucide-react"; // Optional: Install lucide-react
import Link from "next/link";
export default async function BrandsPage() {
    const brands = await getBrands();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
                    <p className="text-sm text-gray-500">Manage your product brands and their display logos.</p>
                </div>
                <Link
                    href="/admin/add_brands"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
                >
                    <Plus size={18} />
                    Add Brand
                </Link>
            </div>

            {brands.length === 0 ? (
                <div className="bg-white border-2 border-dashed rounded-2xl p-12 text-center">
                    <p className="text-gray-500">No brands found in the database.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {brands.map((brand: any) => (
                        <div
                            key={brand.id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Logo Preview Area */}
                            <div className="h-32 bg-gray-50 border-b flex items-center justify-center p-6 relative">
                                {brand.image_original ? (
                                    <img
                                        src={brand.image_original}
                                        alt={brand.name}
                                        className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                                    />
                                ) : (
                                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        No Logo Uploaded
                                    </div>
                                )}

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="p-2 bg-white rounded-full shadow-sm hover:text-blue-600 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 bg-white rounded-full shadow-sm hover:text-red-600 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h2 className="font-bold text-gray-900 truncate">{brand.name}</h2>
                                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-mono">
                                        ID: {brand.id}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">
                                    {brand.description || "No description provided."}
                                </p>

                                <div className="flex items-center gap-4 pt-3 border-t border-gray-50 text-xs font-medium">
                                    <span className="text-green-600 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                                    </span>
                                    <button className="ml-auto text-blue-600 hover:underline flex items-center gap-1">
                                        View Products <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}