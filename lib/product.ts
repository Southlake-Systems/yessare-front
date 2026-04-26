import { apiClient } from "./apiClient";
export async function addOrUpdateProduct(form: any) {
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
      mrp: Number(form.mrp || 0),
      selling_price: Number(form.selling_price || 0),
      discount_rate: Number(form.discount_rate || 0),
    },

    specifications: form.specs?.filter((s: any) => s.name && s.spec) || [],
    features: form.features?.filter((f: any) => f.name) || [],
  };


  return apiClient("/product/add/", {
    method: "POST",
    body: JSON.stringify({
      product: payload,
    }),
  });
}