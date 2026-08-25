

import { apiClient } from "../lib/apiClient";


export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

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
    const products = data.response || [];

    // Transform products to have proper price fields
    return products.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price?.selling_price ?? p.price ?? 0,
      originalPrice: p.price?.mrp ?? 0,
      image: p.image
        ? p.image.startsWith("http")
          ? p.image
          : `${BASE_URL}${p.image}`
        : "/1.png",
      brand: p.brand?.name ?? "",
    }));
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

  if (!res.ok) {
    console.error("Failed to fetch sections:", res.status);
    return [];
  }

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data.map((section: any) => ({
    id: section.id,
    title: section.title,
    products: section.products.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price?.selling_price ?? p.price ?? 0,
      originalPrice: p.price?.mrp ?? 0,
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

export async function liveSearch(q: string) {
  if (q.length < 2) return [];

  const res = await fetch(`${BASE_URL}/product/search/live/?q=${q}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export async function searchProducts(q: string) {
  const res = await fetch(`${BASE_URL}/product/search/?q=${q}`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}

export async function getAllProducts(page: number = 1) {
  try {
    const res = await fetch(`${BASE_URL}/product/?page=${page}`, {
      cache: "no-store",
    });

    if (!res.ok) return { results: [], count: 0, next: null, previous: null };

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return { results: [], count: 0, next: null, previous: null };
  }
}

export async function getProduct(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/product/${id}/`, { cache: 'no-store' });
    if (!res.ok) return null;

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getProductDetails(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/product/${id}/details/`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function updateProduct(id: number, payload: any) {
  try {
    const res = await fetch(`${BASE_URL}/product/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: payload }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("UPDATE ERROR:", res.status, data);
      return { ok: false, errors: data.errors };
    }
    return { ok: true, data };
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return { ok: false, errors: null };
  }
}

export async function deleteProduct(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/product/${id}/`, { method: "DELETE" });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return { ok: false, data: null };
  }
}

export async function saveProduct(payload: any) {
  try {
    const res = await fetch(`${BASE_URL}/product/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json(); 

    if (!res.ok) {
      console.error("SAVE ERROR:", res.status, data);
      return null;
    }

    return data;
  } catch (err) {
    console.error("SAVE ERROR:", err);
    return null;
  }
}


export async function deleteBrand(id: number) {
  const res = await fetch(
    `${BASE_URL}/brand/${id}/delete/`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

export async function updateBrand(
  id: number,
  data: {
    name?: string;
    description?: string;
    image?: File;
  }
) {
  const formData = new FormData();

  if (data.name)
    formData.append("name", data.name);

  if (data.description)
    formData.append("description", data.description);

  if (data.image)
    formData.append("image_original", data.image);

  const res = await fetch(
    `${BASE_URL}/brand/${id}/update/`,
    {
      method: "PUT",
      body: formData,
    }
  );

  return res.json();
}

export async function getBrand(id: string) {
  return apiClient(`/brand/${id}/`);
}

export async function getSectionProducts(
  sectionId: string
) {
  const res = await fetch(
    `${BASE_URL}/home/sections/${sectionId}/products/`,
    {
      cache: "no-store",
    }
  );

  console.log(res.url);
  console.log(res.status);

  return res.json();
}

export async function uploadProductImage(
  formData: FormData
) {
  const res = await fetch(
    `${BASE_URL}/product/image/upload/`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await res.json();
}

export async function deleteProductImage(imageId: number) {
  const res = await fetch(`${BASE_URL}/product-images/${imageId}/`, {
    method: "DELETE",
  });
  return { ok: res.ok, status: res.status };
}

export async function downloadBulkTemplate(): Promise<Blob> {
  const res = await fetch(`${BASE_URL}/product/bulk-upload/template/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to download template: ${res.status}`);
  return res.blob();
}

export async function uploadBulkFile(file: File, dryRun = false) {
  const formData = new FormData();
  formData.append("file", file);
  if (dryRun) formData.append("dry_run", "true");

  const res = await fetch(`${BASE_URL}/product/bulk-upload/v2/`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || `Upload failed: ${res.status}`);
  return data as { job_id: number; status: string; [key: string]: any };
}

export async function getImportJobs() {
  const res = await fetch(`${BASE_URL}/product/import-jobs/`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json() as Promise<ImportJob[]>;
}

export async function getImportJob(id: number) {
  const res = await fetch(`${BASE_URL}/product/import-jobs/${id}/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch job ${id}`);
  return res.json() as Promise<ImportJob>;
}

export type ImportJob = {
  id: number;
  status: "pending" | "processing" | "done" | "failed";
  dry_run: boolean;
  total_rows: number;
  rows_processed: number;
  created_count: number;
  updated_count: number;
  failed_count: number;
  created_at: string;
  results?: any[];
  errors?: { row: number; error: string }[];
};