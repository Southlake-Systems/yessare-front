"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBrandShopVisibility } from "@/lib/api";

export default function BrandShopToggle({
  id,
  initial,
}: {
  id: number;
  initial: boolean;
}) {
  const router = useRouter();
  const [on, setOn] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [, startTransition] = useTransition();

  const toggle = async () => {
    const next = !on;
    setOn(next);
    setSaving(true);
    try {
      await setBrandShopVisibility(id, next);
      startTransition(() => router.refresh());
    } catch (err) {
      console.error(err);
      setOn(!next);
      alert("Failed to update shop visibility");
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className={`flex items-center gap-2 text-xs font-medium disabled:opacity-50 ${
        on ? "text-green-600" : "text-gray-400"
      }`}
    >
      <span
        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
          on ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            on ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </span>
      {on ? "On shop" : "Hidden"}
    </button>
  );
}
