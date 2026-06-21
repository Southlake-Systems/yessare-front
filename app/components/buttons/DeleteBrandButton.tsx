"use client";

import { Trash2 } from "lucide-react";

export default function DeleteBrandButton({
  id,
}: {
  id: number;
}) {
  const handleDelete = async () => {
    if (!confirm("Delete this brand?")) return;

    await fetch(
      `http://localhost:8000/brand/${id}/delete/`,
      {
        method: "DELETE",
      }
    );

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