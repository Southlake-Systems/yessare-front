// app/components/brand/EditBrandForm.tsx

"use client";

import { useState } from "react";
import { authFetch } from "@/lib/http";
import { BASE_URL } from "@/lib/auth";

export default function EditBrandForm({
  brand,
}: {
  brand: any;
}) {
  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(
    brand.description || ""
  );

  const [image, setImage] = useState<File | null>(
    null
  );

  const [showOnShop, setShowOnShop] = useState<boolean>(
    brand.show_on_shop ?? true
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append(
      "description",
      description
    );

    if (image) {
      formData.append(
        "image_original",
        image
      );
    }

    formData.append(
      "show_on_shop",
      showOnShop ? "true" : "false"
    );

    const response = await authFetch(
      `${BASE_URL}/brand/${brand.id}/update/`,
      {
        method: "PUT",
        body: formData,
      }
    );

    setLoading(false);

    if (response.ok) {
      alert("Brand updated");
    } else {
      alert("Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold mb-6">
        Edit Brand
      </h2>

      <div className="mb-4">
        <label className="block mb-2">
          Brand Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border rounded p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border rounded p-3"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnShop}
            onChange={(e) =>
              setShowOnShop(e.target.checked)
            }
          />
          Show on shop
        </label>
      </div>

      <div className="mb-6">
        <img
          src={brand.image_original}
          className="h-24 object-contain mb-3"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
        />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        {loading
          ? "Updating..."
          : "Update Brand"}
      </button>
    </form>
  );
}