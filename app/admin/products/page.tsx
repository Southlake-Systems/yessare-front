// app/admin/products/page.tsx

import { products } from "@/data/product";
import { Plus, Search, Filter, Edit3, Trash2, MoreVertical, Package } from "lucide-react";
import Link from "next/link";
export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      
     
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Products
          </h1>
          <p className="text-gray-500 mt-1">
            Manage {products.length} items in your power tool catalog
          </p>
        </div>
        
        <Link 
          href="/admin/upload"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>


      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by name, product id or brand..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* --- Table Container --- */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden shrink-0">
                    
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                        {product.id.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category Tag */}
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide">
                      Power Tools
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>

                  {/* Stock Status Badge */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Placeholder --- */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{products.length}</span> products
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 text-xs font-bold border border-gray-200 rounded-md bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}