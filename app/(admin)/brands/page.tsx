"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { createBrand } from "@/lib/api";

export default function CreateBrandPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await createBrand({
      name,
      description,
      image: file || undefined,
    });

    setLoading(false);

    // reset
    setName("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="p-10 max-w-3xl">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800">
          Create Brand
        </h1>
        <p className="text-sm text-slate-400">
          Add a new brand to your catalog
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">

        {/* Brand Name */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">
            Brand Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-bold outline-none focus:border-[#005bae]"
            placeholder="e.g. Bosch"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-2 w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-[#005bae]"
            placeholder="Brand description..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">
            Brand Image
          </label>

          <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 cursor-pointer hover:bg-slate-50 transition">
            <Upload className="text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-500">
              Click to upload
            </span>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <p className="text-xs mt-2 text-slate-500">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#005bae] text-white py-3 rounded-xl font-bold hover:bg-[#004a91] transition active:scale-95"
        >
          {loading ? "Creating..." : "Create Brand"}
        </button>
      </div>
    </div>
  );
}