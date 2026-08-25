// app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/lib/api";
import { Plus, Edit3, Package, Trash2 } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price?: {
    selling_price: number;
    mrp: number;
    discount_rate?: string;
  };
  stock?: number;
  brand?: { name: string } | string | number;
  image?: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const fetchProducts = async (p: number) => {
    setLoading(true);
    const data = await getAllProducts(p);
    setProducts(data.results || []);
    setCount(data.count || 0);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(page); }, [page]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const result = await deleteProduct(id);
    setDeletingId(null);
    if (result.ok) {
      fetchProducts(page);
    } else {
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">Manage {count} items</p>
        </div>
        <Link
          href="/admin/upload"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-xs">Product</th>
              <th className="p-4 text-left text-xs">Category</th>
              <th className="p-4 text-left text-xs">Price</th>
              <th className="p-4 text-left text-xs">Status</th>
              <th className="p-4 text-right text-xs">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-6">Loading...</td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  {/* PRODUCT */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {(() => {
                        const imgUrl = Array.isArray(product.image)
                          ? (product.image[0]?.url ?? product.image[0]?.original ?? null)
                          : (typeof product.image === "string" ? product.image : null);
                        return imgUrl ? (
                          <img
                            src={imgUrl.startsWith("http") ? imgUrl : `http://localhost:8000${imgUrl}`}
                            className="w-full h-full object-cover"
                            alt={product.name}
                          />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        );
                      })()}
                    </div>
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-400">ID: {product.id}</div>
                    </div>
                  </td>

                  {/* BRAND */}
                  <td className="p-4 text-sm">
                    {product.brand?.name || "—"}
                  </td>

                  {/* PRICE */}
                  <td className="p-4 text-sm font-bold">
                    ₹{product.price?.selling_price}
                    {product.price?.mrp !== product.price?.selling_price && (
                      <span className="ml-2 text-gray-400 line-through text-xs">
                        ₹{product.price?.mrp}
                      </span>
                    )}
                    {product.price?.discount_rate !== "0.00" && (
                      <span className="ml-2 text-red-500 text-xs">
                        {product.price?.discount_rate}% OFF
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      In Stock
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 hover:text-blue-600 inline-flex"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deletingId === product.id}
                        className="p-2 hover:text-red-600 disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} / {totalPages || 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
