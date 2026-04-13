"use client";

import { useState } from "react";
import { createBrand } from "@/lib/api";

export default function BrandForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    const res = await createBrand({
      name,
      description: desc,
      image: file || undefined,
    });

    console.log(res);
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Brand name"
        className="input"
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="input"
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleSubmit} className="btn-primary">
        Create Brand
      </button>
    </div>
  );
}