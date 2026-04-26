import { apiClient } from "./apiClient";
export type ProductPayload = {
  id?: number;
  name: string;
  brand: number;
  description: string;
  model_number?: string;
  stock: number;
  category: string;
  warranty?: string;

  price: {
    mrp: number;
    selling_price: number;
    discount_rate: number;
  };

  specifications: { name: string; spec: string }[];
  features: { name: string }[];
};
export async function addOrUpdateProduct(form: ProductPayload) {
  const payload = {
    id: form.id,
    name: form.name,
    brand: Number(form.brand),
    description: form.description,
    model_number: form.model_number,
    stock: Number(form.stock),
    category: form.category,
    warranty: form.warranty,

    price: {
      mrp: Number(form.price?.mrp || 0),
      selling_price: Number(form.price?.selling_price || 0),
      discount_rate: Number(form.price?.discount_rate || 0),
    },

    specifications:
      form.specifications?.filter((s) => s.name && s.spec) || [],

    features:
      form.features?.filter((f) => f.name) || [],
  };

  return apiClient("/product/add/", {
    method: "POST",
    body: JSON.stringify({
      product: payload,
    }),
  });
}