"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  ChevronLeft, Save, Trash2, Info, DollarSign, List, ImageIcon, Upload, X,
} from "lucide-react";
import { getProductDetails, updateProduct, uploadProductImage, deleteProductImage, getBrands } from "@/lib/api";
import BrandSelect from "@/app/components/brand/BrandSelect";
import ImageCropperModal from "@/app/components/admin/ImageCropperModal";

type Spec = { name: string; spec: string };
type Feature = { name: string };
type ProductImage = { id: number; url: string };

type FormState = {
  name: string;
  brand: string;
  description: string;
  model_number: string;
  stock: number;
  category: string;
  warranty: string;
  mrp: string;
  selling_price: string;
  discount_rate: string;
  specs: Spec[];
  features: Feature[];
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAdmin, ready } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [images, setImages] = useState<ProductImage[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropQueue, setCropQueue] = useState<{ src: string; name: string }[]>([]);
  const [currentCrop, setCurrentCrop] = useState<{ src: string; name: string } | null>(null);
  const [form, setForm] = useState<FormState>({
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
    features: [{ name: "" }],
  });

  useEffect(() => {
    if (!id) return;
    Promise.all([getProductDetails(id), getBrands()]).then(([product, brands]) => {
      if (!product) { setLoading(false); return; }

      let brandId = "";
      if (typeof product.brand === "object" && product.brand !== null) {
        const match = brands.find(
          (b: any) => b.name.toLowerCase() === product.brand.name?.toLowerCase()
        );
        brandId = match ? String(match.id) : "";
      } else {
        brandId = String(product.brand ?? "");
      }

      setForm({
        name: product.name ?? "",
        brand: brandId,
        description: product.description ?? "",
        model_number: product.model_number ?? "",
        stock: product.stock ?? 0,
        category: product.category ?? "",
        warranty: product.warranty ?? "",
        mrp: String(product.price?.mrp ?? ""),
        selling_price: String(product.price?.selling_price ?? ""),
        discount_rate: String(product.price?.discount_rate ?? ""),
        specs: (product.specification ?? product.specifications ?? []).length
          ? (product.specification ?? product.specifications).map((s: any) => ({ name: s.name, spec: s.spec }))
          : [{ name: "", spec: "" }],
        features: product.features?.length
          ? product.features.map((f: any) => ({ name: f.name }))
          : [{ name: "" }],
      });
      if (Array.isArray(product.image)) {
        setImages(
          product.image.map((img: any) => ({
            id: img.id,
            url: img.url ?? img.original ?? "",
          }))
        );
      }
      setLoading(false);
    });
  }, [id]);

  const handleSelectFiles = (files: FileList) => {
    if (!files.length) return;
    const items = Array.from(files).map((f) => ({
      src: URL.createObjectURL(f),
      name: f.name,
    }));
    setCurrentCrop(items[0]);
    setCropQueue(items.slice(1));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropConfirm = (file: File) => {
    setPendingFiles((prev) => [...prev, file]);
    if (cropQueue.length > 0) {
      setCurrentCrop(cropQueue[0]);
      setCropQueue((q) => q.slice(1));
    } else {
      setCurrentCrop(null);
    }
  };

  const handleCropCancel = () => {
    if (cropQueue.length > 0) {
      setCurrentCrop(cropQueue[0]);
      setCropQueue((q) => q.slice(1));
    } else {
      setCurrentCrop(null);
    }
  };

  const handleRemovePending = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMarkDelete = (imageId: number) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSave = async () => {
    if (!form.name.trim()) { alert("Product name is required"); return; }
    if (!form.brand) { alert("Brand is required"); return; }

    setSaving(true);
    setErrors({});

    // Flush image deletes
    await Promise.all(deletedImageIds.map((imgId) => deleteProductImage(imgId)));
    setDeletedImageIds([]);

    // Flush pending uploads
    for (const file of pendingFiles) {
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append("images", file);
      const result = await uploadProductImage(formData);
      if (result.id) {
        setImages((prev) => [
          ...prev,
          { id: result.id, url: result.original ?? result.url ?? URL.createObjectURL(file) },
        ]);
      }
    }
    setPendingFiles([]);

    const payload = {
      name: form.name,
      brand: Number(form.brand),
      description: form.description,
      model_number: form.model_number,
      stock: Number(form.stock),
      category: form.category,
      warranty: form.warranty,
      price: {
        mrp: Number(form.mrp || 0),
        selling_price: Number(form.selling_price || 0),
        discount_rate: Number(form.discount_rate || 0),
      },
      specifications: form.specs.filter((s) => s.name && s.spec),
      features: form.features.filter((f) => f.name),
    };

    const result = await updateProduct(Number(id), payload);
    setSaving(false);

    if (!result.ok) {
      if (result.errors) setErrors(result.errors);
      else alert("Failed to update product. Please try again.");
      return;
    }

    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center text-slate-500">
        Loading product...
      </div>
    );
  }

  if (ready && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] p-8">
        <div className="max-w-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3">
          You have read-only (Viewer) access. Editing products is disabled.
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#f4f6f8] text-sm text-slate-700">
      <header className="bg-white border-b border-slate-300 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="font-bold text-lg border-l pl-4 border-slate-300">Edit Product</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#005bae] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <main className="p-6 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Basic Information */}
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
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <BrandSelect
                    value={form.brand}
                    onChange={(id) => setForm({ ...form, brand: id })}
                  />
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

          {/* Technical Specs */}
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <List size={14} /> Technical Specs
              </span>
              <button
                onClick={() => setForm({ ...form, specs: [...form.specs, { name: "", spec: "" }] })}
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
                  <tr key={`spec-${i}`}>
                    <td className="p-2 border-b border-slate-100">
                      <input
                        className="w-full p-1 border border-transparent hover:border-slate-200 focus:border-blue-500 outline-none"
                        value={s.name}
                        onChange={(e) => {
                          const n = [...form.specs];
                          n[i].name = e.target.value;
                          setForm({ ...form, specs: n });
                        }}
                      />
                    </td>
                    <td className="p-2 border-b border-slate-100">
                      <input
                        className="w-full p-1 border border-transparent hover:border-slate-200 focus:border-blue-500 outline-none"
                        value={s.spec}
                        onChange={(e) => {
                          const n = [...form.specs];
                          n[i].spec = e.target.value;
                          setForm({ ...form, specs: n });
                        }}
                      />
                    </td>
                    <td className="p-2 border-b border-slate-100">
                      <button
                        onClick={() =>
                          setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) })
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Features */}
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center justify-between">
              <span>Features</span>
              <button
                onClick={() => setForm({ ...form, features: [...form.features, { name: "" }] })}
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                + Add Feature
              </button>
            </div>
            <div className="p-4 space-y-2">
              {form.features.map((f, i) => (
                <div key={`feat-${i}`} className="flex gap-2 items-center">
                  <input
                    className="flex-1 p-2 border border-slate-300 rounded outline-none focus:border-blue-500"
                    placeholder="Feature name"
                    value={f.name}
                    onChange={(e) => {
                      const n = [...form.features];
                      n[i].name = e.target.value;
                      setForm({ ...form, features: n });
                    }}
                  />
                  <button
                    onClick={() =>
                      setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })
                    }
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center gap-2">
              <DollarSign size={14} /> Pricing & Stock
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block font-semibold mb-1">MRP (₹)</label>
                <input
                  type="number"
                  className="w-full p-2 border border-slate-300 rounded outline-none"
                  value={form.mrp}
                  onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">Selling Price</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                    value={form.selling_price}
                    onChange={(e) => setForm({ ...form, selling_price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">Discount %</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                    value={form.discount_rate}
                    onChange={(e) => setForm({ ...form, discount_rate: e.target.value })}
                  />
                </div>
              </div>
              <hr className="border-slate-100" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs text-orange-600">Stock Qty</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">Warranty</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                    value={form.warranty}
                    onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-xs">Model No.</label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-300 rounded outline-none"
                  value={form.model_number}
                  onChange={(e) => setForm({ ...form, model_number: e.target.value })}
                />
              </div>
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 text-red-600 text-xs rounded">
              <strong>Errors:</strong>
              <ul className="mt-1 list-disc list-inside">
                {Object.entries(errors).map(([field, msgs]) =>
                  msgs.map((msg, i) => <li key={`${field}-${i}`}>{field}: {msg}</li>)
                )}
              </ul>
            </div>
          )}

          {/* Product Images */}
          <div className="bg-white border border-slate-300 shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 font-bold flex items-center gap-2">
              <ImageIcon size={14} /> Product Images
            </div>
            <div className="p-4 space-y-3">
              {(images.length > 0 || pendingFiles.length > 0) ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="product"
                          className="w-full aspect-square object-cover rounded border border-slate-200"
                        />
                        <button
                          onClick={() => handleMarkDelete(img.id)}
                          className="absolute top-1 right-1 bg-white border border-slate-300 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-400"
                          title="Remove image"
                        >
                          <X size={12} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    {pendingFiles.map((file, i) => (
                      <div key={`pending-${i}`} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="pending upload"
                          className="w-full aspect-square object-cover rounded border-2 border-dashed border-blue-300 opacity-75"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-blue-500/70 text-white text-[10px] text-center py-0.5">
                          pending
                        </div>
                        <button
                          onClick={() => handleRemovePending(i)}
                          className="absolute top-1 right-1 bg-white border border-slate-300 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-400"
                          title="Cancel"
                        >
                          <X size={12} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 border border-dashed border-slate-300 rounded text-xs text-slate-500 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center gap-1"
                  >
                    <Upload size={12} /> Add more images
                  </button>
                </>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-slate-300 rounded flex flex-col items-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                >
                  <Upload size={24} />
                  <span className="text-xs font-medium">Click to upload images</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleSelectFiles(e.target.files)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>

      {currentCrop && (
        <ImageCropperModal
          src={currentCrop.src}
          fileName={currentCrop.name}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}
