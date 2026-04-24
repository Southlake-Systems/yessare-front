import { apiClient } from "../lib/apiClient";

export type ProductPayload = {
  name: string;
  brand: string; // brand id
  description?: string;
  model_number?: string;
  stock?: number;
  category?: string;
  warranty?: string;
  thumbnail?: string; // image id
};

export async function addOrUpdateProduct(product: ProductPayload) {
  return apiClient("/product/add/", {
    method: "POST",
    body: JSON.stringify({
      product,
    }),
  });
}