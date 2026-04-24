

import { apiClient } from "../lib/apiClient";


const BASE_URL = "http://localhost:8000";

// lib/api.ts
export async function getBrands() {
  try {
    const res = await fetch(`${BASE_URL}/brand/all/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return [];
    }

    const data = await res.json();
    console.log(data)
    return data.response || [];
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return [];
  }
}


export async function getProductsByBrand(brandId: number) {
  try {
    const res = await fetch(
      `${BASE_URL}/brand/${brandId}/product/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return [];
    }

    const data = await res.json();
    return data.response || [];
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return [];
  }
}



export async function createBrand(data: {
  name: string;
  description?: string;
  image?: File;
}) {
  const formData = new FormData();

  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image_original", data.image);

  const res = await fetch(`${BASE_URL}/brand/new/`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}


export async function getHomeSections() {
  const res = await fetch(`${BASE_URL}/home/all/?count=5`, {
    cache: "no-store",
  });

  const data = await res.json();
 

  return data.map((section: any) => ({
    id: section.id,
    title: section.title,
    products: section.products.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price ?? 0,
      image: p.image
        ? p.image.startsWith("http")
          ? p.image
          : `${BASE_URL}${p.image}`
        : "/1.png",
      brand: p.brand?.name ?? "",
    })
    ),

  }));
}

export async function getProductById(productId: number) {
  try {
    const res = await fetch(`http://localhost:8000/product/${productId}/`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch product");

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}