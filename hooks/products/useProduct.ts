// hooks/useProduct.ts
import { useState } from "react";
import { addOrUpdateProduct, ProductPayload } from "@/lib/product";

export function useProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProduct = async (product: ProductPayload) => {
    try {
      setLoading(true);
      setError(null);
      console.log("📤 Sending product:", product);
      const res = await addOrUpdateProduct(product);
      console.log("✅ Product saved:", res);
      return res;
    } catch (err: any) {
      const errorMsg = err.message || "Failed to save product";
      console.error("❌ Error saving product:", err);
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveProduct, loading, error };
}