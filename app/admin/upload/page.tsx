"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Save, Plus, Trash2, Hash, Box, 
  Info, DollarSign, List, Image as ImageIcon 
} from "lucide-react";
import { useProduct } from "@/hooks/products/useProduct";
import BrandSelect from "@/app/components/brand/BrandSelect";

export default function ProductEditor() {
  const { saveProduct, loading, error } = useProduct();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    model_number: "",
    stock: 0,
    category: "",
    warranty: "",
    mrp: "",
    selling_price: "",
    discount_rate: "",
    specs: [{ name: "", spec: "" }],
    features: [{ name: "" }]
  });

  const handleSave = async () => {
    try {
      await saveProduct(form);
      router.push("/admin/products"); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-sm text-slate-700">
      {/* SIMPLE COMPACT HEADER */}
      <header className="bg-white border-b border-slate-300 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="font-bold text-lg border-l pl-4 border-slate-300">Add Product</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#005bae] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={16} /> {loading ? "Saving..." : "Save Product"}
        </button>
      </header>

      <main className="p-6 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: PRIMARY DETAILS */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center gap-2">
              <Info size={14} /> Basic Information
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:border-blue-500 outline-none"
                  placeholder="Enter product title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <BrandSelect value={form.brand} onChange={(id) => setForm({ ...form, brand: id })} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                    placeholder="Category"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center justify-between">
              <span className="flex items-center gap-2"><List size={14} /> Technical Specs</span>
              <button 
                onClick={() => setForm({...form, specs: [...form.specs, { name: "", spec: "" }]})}
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                + Add Row
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-slate-200">Label</th>
                  <th className="px-4 py-2 text-left border-b border-slate-200">Value</th>
                  <th className="px-4 py-2 w-10 border-b border-slate-200"></th>
                </tr>
              </thead>
              <tbody>
                {form.specs.map((s, i) => (
                  <tr key={i}>
                    <td className="p-2 border-b border-slate-100">
                      <input 
                        className="w-full p-1 border border-transparent hover:border-slate-200 focus:border-blue-500" 
                        value={s.name}
                        onChange={(e) => {
                          const n = [...form.specs]; n[i].name = e.target.value; setForm({...form, specs: n});
                        }}
                      />
                    </td>
                    <td className="p-2 border-b border-slate-100">
                      <input 
                        className="w-full p-1 border border-transparent hover:border-slate-200 focus:border-blue-500" 
                        value={s.spec}
                        onChange={(e) => {
                          const n = [...form.specs]; n[i].spec = e.target.value; setForm({...form, specs: n});
                        }}
                      />
                    </td>
                    <td className="p-2 border-b border-slate-100">
                      <button onClick={() => setForm({...form, specs: form.specs.filter((_, idx) => idx !== i)})} className="text-slate-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: PRICING & INVENTORY */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center gap-2">
              <DollarSign size={14} /> Pricing & Stock
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block font-semibold mb-1">MRP (₹)</label>
                <input type="number" className="w-full p-2 border border-slate-300 rounded" value={form.mrp} onChange={(e) => setForm({...form, mrp: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">Selling Price</label>
                  <input type="number" className="w-full p-2 border border-slate-300 rounded" value={form.selling_price} onChange={(e) => setForm({...form, selling_price: e.target.value})} />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">Discount %</label>
                  <input type="number" className="w-full p-2 border border-slate-300 rounded" value={form.discount_rate} onChange={(e) => setForm({...form, discount_rate: e.target.value})} />
                </div>
              </div>
              <hr className="border-slate-100" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs text-orange-600">Stock Qty</label>
                  <input type="number" className="w-full p-2 border border-slate-300 rounded" value={form.stock} onChange={(e) => setForm({...form, stock: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">Warranty</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded" value={form.warranty} onChange={(e) => setForm({...form, warranty: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-xs">Model No.</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded" value={form.model_number} onChange={(e) => setForm({...form, model_number: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-300 shadow-sm p-4">
            <div className="font-bold mb-3 flex items-center gap-2"><ImageIcon size={14}/> Image Upload</div>
            <label className="border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition">
              <span className="text-blue-600 font-bold">Choose File</span>
              <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 text-red-600 text-xs rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}