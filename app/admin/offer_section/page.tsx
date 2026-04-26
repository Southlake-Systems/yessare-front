"use client";

import { useEffect, useState } from "react";
import { Plus, LayoutGrid, Package, Search, CheckCircle2, ListPlus, Loader2 } from "lucide-react";

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
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    if (selectedSection) {
      const section = sections.find(s => s.id === selectedSection);
      if (section && section.products) {
        // Pre-fill the checkboxes with existing product IDs
        setSelectedProducts(section.products.map((p: any) => p.id));
      }
    }
  }, [selectedSection, sections]);

  const updateSectionContent = async () => {
    if (!selectedSection) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/home/sections/update/${selectedSection}/`, {
        method: "PUT", // Use PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_ids: selectedProducts,
        }),
      });

      if (res.ok) {
        alert("Section updated successfully!");
        await fetchSections(); // Refresh the list to get new product states
      } else {
        const text = await res.text(); // Get raw text if JSON fails
        console.error("Server error:", text);
      }
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };
  // --- FETCHERS ---
  const fetchSections = async () => {
    try {
      const res = await fetch(`${BASE_URL}/home/all/`);
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/home/all/`);
      const data = await res.json();
      setProducts(data.response || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // --- LIVE SEARCH ---
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchProducts();
      return;
    }
    if (searchTerm.length < 2) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${BASE_URL}/product/search/live/?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchSections();
  }, []);

  // --- ACTIONS ---

  const createSection = async () => {
    if (!title) return;
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/home/sections/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, order }),
      });
      setTitle("");
      setOrder(sections.length + 2);
      await fetchSections();
    } catch (err) {
      console.error("Error creating section:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const addProducts = async () => {
    if (!selectedSection || selectedProducts.length === 0) {
      alert("Please select a section and at least one product.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/home/sections/add-products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section_id: selectedSection,
          product_ids: selectedProducts, // Sending array of IDs
        }),
      });

      if (res.ok) {
        setSelectedProducts([]);
        alert("Products successfully added to section!");
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message || "Failed to add products"}`);
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Network error while updating section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Homepage Offer Sections</h1>
        <p className="text-sm text-gray-500">Manage rows for the Yessare storefront.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" /> New Section
            </h2>
            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Title (e.g., Best Sellers)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
              <button
                onClick={createSection}
                disabled={loading || !title}
                className="w-full bg-[#005bae] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
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
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex justify-between items-center ${selectedSection === sec.id ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200" : "bg-white border-slate-100 hover:border-slate-300"
                    }`}
                >
                  <span className="font-semibold">{sec.title}</span>
                  {selectedSection === sec.id && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8">
          {selectedSection ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Add Products</h2>
                  <p className="text-sm text-slate-500">Search Yessare inventory for this section.</p>
                </div>
                <div className="relative">
                  {isSearching ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 animate-spin" size={18} />
                  ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  )}
                  <input
                    className="pl-10 pr-4 py-2 border rounded-full text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Live search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-6 max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.length > 0 ? products.map((p) => {
                  const isChecked = selectedProducts.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isChecked ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50 border-slate-100"
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded"
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
                        <span className="text-[10px] text-slate-400 font-mono tracking-tighter">SKU: {p.id}</span>
                      </div>
                    </label>
                  );
                }) : (
                  <div className="col-span-full py-10 text-center text-slate-400 italic">
                    No products found.
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  {selectedProducts.length} items selected
                </span>
                <button
                  onClick={addProducts}
                  disabled={loading || selectedProducts.length === 0}
                  className="flex items-center gap-2 bg-[#005bae] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95"
                >
                  <ListPlus size={18} />
                  {loading ? "Updating..." : "Update Section Content"}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-12">
              <Package className="text-slate-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-900">No Section Selected</h3>
              <p className="text-slate-500 mt-2 max-w-xs">Select a storefront section from the left sidebar to add products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}