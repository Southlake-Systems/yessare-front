"use client";

import { useEffect, useState } from "react";
import { Plus, LayoutGrid, Package, Search, CheckCircle2, ListPlus } from "lucide-react";

const BASE_URL = "http://localhost:8000";

export default function OfferSectionPage() {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSections = async () => {
    const res = await fetch(`${BASE_URL}/home/all/`);
    const data = await res.json();
    setSections(data);
  };

  const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/product/all/`);
    const data = await res.json();
    setProducts(data.response || []);
  };

  useEffect(() => {
    fetchSections();
    fetchProducts();
  }, []);

  const createSection = async () => {
    if (!title) return;
    setLoading(true);
    await fetch(`${BASE_URL}/home/sections/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, order }),
    });
    setTitle("");
    setOrder(sections.length + 2);
    await fetchSections();
    setLoading(false);
  };

  const addProducts = async () => {
    if (!selectedSection || selectedProducts.length === 0) return;
    setLoading(true);
    await fetch(`${BASE_URL}/home/add-products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section_id: selectedSection,
        product_ids: selectedProducts,
      }),
    });
    setSelectedProducts([]);
    setLoading(false);
    alert("Products updated successfully!");
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Homepage Offer Sections</h1>
        <p className="text-sm text-gray-500">Create product rows like "New Arrivals" or "Flash Sale" for the main site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Section Management */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" /> Create New Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Section Title</label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. Featured Tools"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Display Order</label>
                <input
                  type="number"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                />
              </div>
              <button 
                onClick={createSection}
                disabled={loading || !title}
                className="w-full bg-[#005bae] text-white font-bold py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Creating..." : "Create Section"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <LayoutGrid size={20} className="text-blue-600" /> Existing Sections
            </h2>
            <div className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSection(sec.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex justify-between items-center ${
                    selectedSection === sec.id 
                    ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200" 
                    : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="font-semibold">{sec.title}</span>
                  {selectedSection === sec.id && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Selection */}
        <div className="lg:col-span-8">
          {selectedSection ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Add Products</h2>
                  <p className="text-sm text-slate-500">Select items to display in the section.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    className="pl-10 pr-4 py-2 border rounded-full text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-6 max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((p) => {
                  const isChecked = selectedProducts.includes(p.id);
                  return (
                    <label 
                      key={p.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50 border-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, p.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter((id) => id !== p.id));
                          }
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{p.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">SKU: {p.id}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  {selectedProducts.length} items selected
                </span>
                <button 
                  onClick={addProducts}
                  disabled={loading || selectedProducts.length === 0}
                  className="flex items-center gap-2 bg-[#005bae] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-200 transition-all"
                >
                  <ListPlus size={18} />
                  Update Section Content
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Package className="text-slate-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Section Selected</h3>
              <p className="text-slate-500 max-w-xs mt-2">
                Choose a homepage section from the left to start adding products to it.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}