"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { createBrand } from "@/lib/api";

export default function CreateBrandPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || loading) return;

    setLoading(true);
    try {
      await createBrand({
        name,
        description,
        image: file || undefined,
      });

      // SUCCESS
      setNotification({ message: "Brand successfully created!", type: "success" });
      
      // Reset Form
      setName("");
      setDescription("");
      removeImage();
    } catch (error) {
      // FAILURE
      setNotification({ 
        message: "Failed to create brand. Please try again.", 
        type: "error" 
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50/50 py-12 px-4 overflow-hidden">
      
      {/* --- NOTIFICATION TOAST --- */}
      {notification && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border transition-all duration-500 animate-in fade-in slide-in-from-top-4 
          ${notification.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-red-50 border-red-100 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm font-bold tracking-tight">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Create Brand
          </h1>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            Define a new brand identity for your power tool catalog.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-8"
        >
          {/* Brand Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
              placeholder="e.g. DeWalt, Bosch"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all outline-none resize-none"
              placeholder="Briefly describe the brand's specialty..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Brand Logo
            </label>

            {!preview ? (
              <label className="group relative mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-10 cursor-pointer hover:bg-blue-50/30 hover:border-blue-400 transition-all">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Click to upload</span>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">PNG, JPG or SVG</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative mt-2 group">
                <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-600 shadow-xl transition-all hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !name}
            className="w-full relative flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95 shadow-xl shadow-gray-200 disabled:shadow-none"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Create Brand"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}