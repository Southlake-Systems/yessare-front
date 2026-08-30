"use client";

import { Trash2 } from "lucide-react";
import { authFetch } from "@/lib/http";
import { BASE_URL } from "@/lib/auth";

export default function DeleteBrandButton({
  id,
}: {
  id: number;
}) {
  const handleDelete = async () => {
    if (!confirm("Delete this brand?")) return;

    const res = await authFetch(
      `${BASE_URL}/brand/${id}/delete/`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 bg-white rounded-full shadow-sm hover:text-red-600"
    >
      <Trash2 size={16} />
    </button>
  );
}