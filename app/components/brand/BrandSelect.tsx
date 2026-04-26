"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/lib/api";

type Brand = {
  id: string;
  name: string;
};

type Props = {
  value?: string;
  onChange: (brandId: string) => void;
};

export default function BrandSelect({ value, onChange }: Props) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
      setLoading(false);
    };

    fetchBrands();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* <label className="text-sm font-semibold text-gray-600">
        Brand
      </label> */}

      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border-2 border-slate-200 px-4 py-3 rounded-lg focus:bg-white outline-none"
      >
        <option value="">
          {loading ? "Loading brands..." : "Select a brand"}
        </option>

        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
}