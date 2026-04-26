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
      const res = await addOrUpdateProduct(product);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveProduct, loading, error };
}