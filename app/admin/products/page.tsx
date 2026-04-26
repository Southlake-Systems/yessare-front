// app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllProducts, getProduct } from "@/lib/api";
import { Plus, Edit3, Package } from "lucide-react";
import Link from "next/link";

import { saveProduct } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // EDIT STATE
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllProducts(page);
      setProducts(data.results || []);
      setCount(data.count || 0);
      setLoading(false);
    };

    fetchData();
  }, [page]);
  const [editData, setEditData] = useState<any>({});

  // When opening the modal, set the initial form state
  const handleEdit = async (id: number) => {
    const product = await getProduct(String(id));
    if (product) {
      setSelectedProduct(product);
      // Initialize editData with existing values
      setEditData({
        id: product.id,
        name: product.name,
        selling_price: product.price?.selling_price,
        mrp: product.price?.mrp,
        description: product.description,
        stock: product.stock
      });
      setEditOpen(true);
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      // editData already contains the 'id'
      await saveProduct(editData);
      setEditOpen(false);

      // Refresh the list
      const data = await getAllProducts(page);
      setProducts(data.results || []);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setLoading(false);
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
                <td colSpan={5} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  {/* PRODUCT */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={
                            product.image.startsWith("http")
                              ? product.image
                              : `http://localhost:8000${product.image}`
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-400">
                        ID: {product.id}
                      </div>
                    </div>
                  </td>

                  {/* BRAND */}
                  <td className="p-4 text-sm">
                    {product.brand?.name || "Power Tools"}
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
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="p-2 hover:text-blue-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
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

          <span>
            Page {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {editOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Product (ID: {editData.id})</h2>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-gray-500">Product Name</label>
              <input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Selling Price</label>
                  <input
                    value={editData.selling_price}
                    onChange={(e) => setEditData({ ...editData, selling_price: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">MRP</label>
                  <input
                    value={editData.mrp}
                    onChange={(e) => setEditData({ ...editData, mrp: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <label className="block text-xs font-medium text-gray-500">Stock</label>
              <input
                value={editData.stock}
                onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <label className="block text-xs font-medium text-gray-500">Description</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full border p-2 rounded h-24"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}